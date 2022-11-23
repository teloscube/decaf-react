import React, { useEffect, useState } from 'react';

/**
 * A hook that returns the current online status of the browser.
 * @returns `true` if the browser is online, `false` otherwise.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    function goOnline() {
      setOnline(true);
    }

    function goOffline() {
      setOnline(false);
    }

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
}

const styles = {
  notification_wrapper: {
    position: 'fixed',
    bottom: 20,
    right: 10,
    transition: '0.3s ease-in',
    backgroundColor: '#1e2d3d',
    borderRadius: 6,
    padding: '10px 20px',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.5)',
    transform: 'translatey(10%)',
  },
  notification_wrapper_svg: {
    marginRight: '5px',
    fill: 'white',
  },
  notification_wrapper_span: {
    color: 'white',
    fontWeight: 500,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  iconStyle: {
    fill: 'none',
  },
};

/**
 * component to show notification when user is offline
 * There will be a notification on the bottom right corner of the screen when user is offline
 */
export function OfflineNotifier() {
  const online = useOnlineStatus();

  if (online) {
    return null;
  }

  return (
    <div style={{ ...styles.notification_wrapper, position: 'fixed' }}>
      <svg
        style={styles.notification_wrapper_svg}
        height="32"
        id="icon"
        viewBox="0 0 32 32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24.8008,12.1362a8.8694,8.8694,0,0,0-.9795-2.5434L30,3.4142,28.5872,2,2,28.5872,3.4142,30l5-5H23.5a6.4974,6.4974,0,0,0,1.3008-12.8638ZM23.5,23H10.4141L22.3418,11.0723a6.9049,6.9049,0,0,1,.6006,2.0708l.0986.812.8154.0639A4.4975,4.4975,0,0,1,23.5,23Z" />
        <path d="M4.2964,23.4487l1.4313-1.4311A4.4774,4.4774,0,0,1,8.144,14.019l.8155-.0639.0991-.812a6.9867,6.9867,0,0,1,10.63-5.0865l1.4431-1.4428A8.9859,8.9859,0,0,0,7.2,12.1362,6.4891,6.4891,0,0,0,4.2964,23.4487Z" />
        <rect
          style={styles.iconStyle}
          data-name="&lt;Transparent Rectangle&gt;"
          height="32"
          id="_Transparent_Rectangle_"
          width="32"
        />
      </svg>
      <span style={styles.notification_wrapper_span}>You are offline</span>
    </div>
  );
}
