import React, { useEffect, useRef, useState } from 'react';

const style = `
.version-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
}

.version-modal-title {
  text-align: center;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.version-modal-title h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 0;
  margin-left: 10px;
}

.version-modal .version-modal-body {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #333;
  border-radius: 5px;
}

.version-modal .version-modal-content {
  padding: 5px 20px;
}

.version-modal .version-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
.version-modal .reload-btn {
  background-color: #177ddc;
  color: white;
  border: none;
  width: 150px;
  padding: 10px;
  cursor: pointer;
}

.version-modal .reload-btn:hover {
  background-color: #095cb5;
}

.version-modal .cancel-btn {
  background-color: #555;
  color: white;
  border: 1px solid #dfdfdf;
  padding: 10px;
  cursor: pointer;
}

.version-modal .cancel-btn:hover {
  background-color: #444;
}
`;

export interface DecafVersionCheckerProps {
  currentVersion: string;
  onNewVersion?: (versionOld: string, versionNew: string) => void;
  basePath?: string;
  interval?: number;
}

export default function DecafVersionChecker(props: DecafVersionCheckerProps) {
  const [newVersion, setNewVersion] = useState();
  const interval = useRef<number>();

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = window.setInterval(() => {
      fetch((props.basePath ?? '') + '/version.json?t=' + new Date().getTime())
        .then((res) => res.json())
        .then((data) => {
          if (data.version) {
            setNewVersion(data.version);
            if (props.currentVersion !== data.version) {
              props.onNewVersion?.(props.currentVersion, data.version);
            }
          }
        })
        .catch(() => {
          console.error('DECAF Error: Can not fetch version information!');
        });
    }, (props.interval || 60) * 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [props]);

  if (props.onNewVersion || !newVersion) {
    return null;
  }

  return (
    <div>
      {newVersion !== props.currentVersion && (
        <div className="version-modal">
          <style>{style}</style>
          <div className="version-modal-body">
            <div className="version-modal-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill={'#00c12c'}
                className="alert-status-icon"
              >
                {
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" />
                }
              </svg>
              <h2>New Version Available</h2>
            </div>
            <div className="version-modal-content">
              <p>A new version of your app is available. Please reload the page to update to the latest version.</p>
              <span>
                New version: <b style={{ marginRight: 10 }}>{newVersion}</b>
                (Current version: <b>{props.currentVersion}</b>)
              </span>
            </div>
            <div className="version-modal-footer">
              <button className="cancel-btn" onClick={() => setNewVersion(undefined)}>
                Let me finish my work first. I will reload later.
              </button>
              <button
                className="reload-btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
