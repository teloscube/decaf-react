import React, { useEffect, useRef, useState } from 'react';

const DECAF_API_VERSION_PATH = '/api/version/';

export type ConnectionStatus = 'online' | 'slow' | 'offline';

export interface UseConnectionStatusOptions {
  /** Poll interval in ms. Default 10000. */
  interval?: number;
  /** A successful probe slower than this counts as a slow probe. Default 8000. */
  slowThreshold?: number;
  /** Hard abort timeout for a probe. Default 12000. Aborts are treated as slow, not offline. */
  hardTimeout?: number;
  /** Consecutive network-error probes required before flipping to 'offline'. Default 3. */
  offlineAfter?: number;
  /** Consecutive slow probes required before flipping to 'slow'. Default 2. */
  slowAfter?: number;
}

const DEFAULTS: Required<UseConnectionStatusOptions> = {
  interval: 10000,
  slowThreshold: 8000,
  hardTimeout: 12000,
  offlineAfter: 3,
  slowAfter: 2,
};

/**
 * Probes a URL on an interval and reports a three-state connection status.
 *
 * Detection rules:
 *  - A probe that resolves within `slowThreshold` ms → resets all counters, status `online`.
 *  - A probe that resolves but exceeded `slowThreshold`, or aborted at `hardTimeout` → counts as slow.
 *    Status flips to `slow` only after `slowAfter` consecutive slow probes.
 *  - A probe rejected with a real network error (not an abort) → counts as a network failure.
 *    Status flips to `offline` only after `offlineAfter` consecutive network failures.
 *  - `navigator.onLine === false` (or the `offline` window event) is trusted as an immediate
 *    `offline` signal; the `online` event clears it back to `online`.
 *  - Polling pauses while the tab is hidden to avoid accumulating failures from a throttled tab.
 */
export function useConnectionStatus(url: string, options: UseConnectionStatusOptions = {}): ConnectionStatus {
  // Use nullish coalescing per field: `{...DEFAULTS, ...options}` would let an explicit `undefined`
  // (common when callers spread optional props through) overwrite a default and break timers.
  const interval = options.interval ?? DEFAULTS.interval;
  const slowThreshold = options.slowThreshold ?? DEFAULTS.slowThreshold;
  const hardTimeout = options.hardTimeout ?? DEFAULTS.hardTimeout;
  const offlineAfter = options.offlineAfter ?? DEFAULTS.offlineAfter;
  const slowAfter = options.slowAfter ?? DEFAULTS.slowAfter;

  const [status, setStatus] = useState<ConnectionStatus>(() =>
    typeof navigator !== 'undefined' && navigator.onLine === false ? 'offline' : 'online'
  );

  // Counters live in refs so probe outcomes never trigger a re-render unless the status changes.
  const slowCount = useRef(0);
  const errorCount = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let nextTimer: ReturnType<typeof setTimeout> | undefined;

    // Probes are chained (next one scheduled when the previous settles) instead of running
    // on a fixed interval. With a 12s hardTimeout and 10s interval, setInterval would let
    // probes overlap and complete out-of-order, corrupting slowCount/errorCount.
    const runProbe = () => {
      if (cancelled) return;
      if (document.visibilityState === 'hidden') {
        nextTimer = setTimeout(runProbe, interval);
        return;
      }

      const controller = new AbortController();
      const startedAt = Date.now();
      const abortTimer = setTimeout(() => controller.abort(), hardTimeout);

      fetch(`${url}?t=${startedAt}`, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal,
      })
        .then(() => {
          if (cancelled) return;
          const elapsed = Date.now() - startedAt;
          if (elapsed > slowThreshold) {
            // The probe actually resolved, so we know we're reachable — clear offline if set.
            errorCount.current = 0;
            slowCount.current += 1;
            if (slowCount.current >= slowAfter) {
              setStatus('slow');
            }
          } else {
            slowCount.current = 0;
            errorCount.current = 0;
            setStatus('online');
          }
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          const isAbort = err instanceof DOMException && err.name === 'AbortError';
          if (isAbort) {
            // Aborted by our hard timeout: treat as slow, never as offline. We do NOT
            // downgrade an existing offline state here — an abort doesn't prove reachability.
            errorCount.current = 0;
            slowCount.current += 1;
            if (slowCount.current >= slowAfter) {
              setStatus((prev) => (prev === 'offline' ? prev : 'slow'));
            }
          } else {
            // Real network failure (e.g. TypeError "Failed to fetch").
            errorCount.current += 1;
            if (errorCount.current >= offlineAfter) {
              setStatus('offline');
            }
          }
        })
        .finally(() => {
          clearTimeout(abortTimer);
          if (!cancelled) nextTimer = setTimeout(runProbe, interval);
        });
    };

    nextTimer = setTimeout(runProbe, interval);

    return () => {
      cancelled = true;
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [url, interval, slowThreshold, hardTimeout, offlineAfter, slowAfter]);

  // Trust the browser's own offline signal immediately; don't wait for probes.
  useEffect(() => {
    const goOnline = () => {
      slowCount.current = 0;
      errorCount.current = 0;
      setStatus('online');
    };
    const goOffline = () => setStatus('offline');

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return status;
}

/**
 * Backward-compatible boolean hook. `true` means not offline (online or slow).
 * @deprecated Prefer `useConnectionStatus` for finer-grained state.
 */
export function useOnlineStatus(url: string, interval: number = 10000): boolean {
  return useConnectionStatus(url, { interval }) !== 'offline';
}

const styles = {
  offline_pill: {
    position: 'fixed' as const,
    bottom: 40,
    right: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 12,
    backgroundColor: 'rgba(220, 38, 38, 0.12)',
    border: '1px solid rgba(220, 38, 38, 0.5)',
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    zIndex: 9999,
  },
  offline_icon: {
    fill: '#b91c1c',
  },
  slow_dot: {
    position: 'fixed' as const,
    bottom: 44,
    right: 14,
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#f59e0b',
    boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.2)',
    zIndex: 9999,
  },
};

export interface OfflineNotifierProps {
  url?: string;
  /** Show a subtle indicator on sustained slow connections. Default true. */
  showSlowIndicator?: boolean;
  /** Probe interval in ms. Default 10000. */
  interval?: number;
  /** Threshold above which a successful probe is considered slow. Default 8000. */
  slowThreshold?: number;
  /** Hard probe timeout. Default 12000. */
  hardTimeout?: number;
  /** Consecutive network errors before showing the offline pill. Default 3. */
  offlineAfter?: number;
  /** Consecutive slow probes before showing the slow indicator. Default 2. */
  slowAfter?: number;
}

/**
 * Renders a connection status indicator at the bottom-right.
 *  - Online: nothing.
 *  - Slow (rare, by design): a small amber dot with a tooltip.
 *  - Offline: a subtle red pill.
 */
export function OfflineNotifier({
  url = DECAF_API_VERSION_PATH,
  showSlowIndicator = true,
  interval,
  slowThreshold,
  hardTimeout,
  offlineAfter,
  slowAfter,
}: OfflineNotifierProps) {
  const status = useConnectionStatus(url, {
    interval,
    slowThreshold,
    hardTimeout,
    offlineAfter,
    slowAfter,
  });

  if (status === 'online') return null;

  if (status === 'slow') {
    if (!showSlowIndicator) return null;
    return <div style={styles.slow_dot} title="Slow connection" aria-label="Slow connection" />;
  }

  return (
    <div style={styles.offline_pill} role="status" aria-live="polite">
      <svg
        style={styles.offline_icon}
        height="14"
        viewBox="0 0 32 32"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M24.8008,12.1362a8.8694,8.8694,0,0,0-.9795-2.5434L30,3.4142,28.5872,2,2,28.5872,3.4142,30l5-5H23.5a6.4974,6.4974,0,0,0,1.3008-12.8638ZM23.5,23H10.4141L22.3418,11.0723a6.9049,6.9049,0,0,1,.6006,2.0708l.0986.812.8154.0639A4.4975,4.4975,0,0,1,23.5,23Z" />
        <path d="M4.2964,23.4487l1.4313-1.4311A4.4774,4.4774,0,0,1,8.144,14.019l.8155-.0639.0991-.812a6.9867,6.9867,0,0,1,10.63-5.0865l1.4431-1.4428A8.9859,8.9859,0,0,0,7.2,12.1362,6.4891,6.4891,0,0,0,4.2964,23.4487Z" />
      </svg>
      <span>Offline</span>
    </div>
  );
}
