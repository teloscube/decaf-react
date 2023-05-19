import React, { useEffect, useRef, useState } from 'react';

const DECAF_API_VERSION_PATH = '/api/version/';

/**
 * A hook that returns the current online status of the browser.
 * @returns `true` if the browser is online, `false` otherwise.
 */
export function useOnlineStatus(url: string, interval: number = 10000): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const pollInterval = useRef<number>();
  const fetchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    pollInterval.current = window.setInterval(() => {
      const cacheSafeUrl = `${url}?t=${Date.now()}`;
      const controller = new AbortController();

      clearTimeout(fetchTimeout.current);

      fetchTimeout.current = setTimeout(() => {
        controller.abort();
      }, 2500);

      fetch(cacheSafeUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal,
      })
        .then(() => setOnline(true))
        .catch(() => {
          // The Promise returned from fetch() WON'T REJECT ON HTTP error status even if the response is an HTTP 404 or 500.
          // Instead, it will resolve normally (with ok status set to false),
          // and it will only reject on network failure or if anything prevented the request from completing.
          setOnline(false);
        });
    }, interval);

    return () => {
      clearInterval(pollInterval.current);
      clearTimeout(fetchTimeout.current);
    };
  }, [url, interval]);

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
    bottom: 40,
    right: 10,
    transition: '0.3s ease-in',
    backgroundColor: '#ff4d4f',
    borderRadius: 6,
    padding: 20,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 0 rgba(255,38,5,.06)',
    transform: 'translatey(10%)',
    zIndex: 9999,
  },
  notification_wrapper_svg: {
    marginRight: '5px',
    fill: 'white',
  },
  notification_wrapper_span: {
    color: 'white',
    fontWeight: 500,
  },
  iconStyle: {
    fill: 'none',
  },
};

export interface OfflineNotifierProps {
  url?: string;
}
/**
 * component to show notification when user is offline
 * There will be a notification on the bottom right corner of the screen when user is offline
 */
export function OfflineNotifier({ url = DECAF_API_VERSION_PATH }: OfflineNotifierProps) {
  const online = useOnlineStatus(url);

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
