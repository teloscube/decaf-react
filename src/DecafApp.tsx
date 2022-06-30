import { DecafClient } from '@decafhub/decaf-client';
import DecafVersionChecker from 'DecafVersionChecker';
import React, { useEffect } from 'react';
import ZendeskWidget from 'ZendeskWidget';
import { DecafContext, getAuthenticatedDecafClient, Principal, PublicConfig } from './context';
import DecafSpinner from './DecafSpinner';

export interface DecafAppConfig {
  /** version of the application */
  currentVersion?: string;
  /** callback when a new version is available */
  onNewVersion?: (versionOld: string, versionNew: string) => void;
  /** Base path of host app.
   *
   * This is usually PUBLIC_URL environment variable in React apps.
   *
   * Required to enable version checker. */
  basePath?: string;
}
export interface DecafAppType {
  children: JSX.Element;
  config?: DecafAppConfig;
}

export default function DecafApp(props: DecafAppType) {
  const [client, setClient] = React.useState<DecafClient | undefined>(undefined);
  const [me, setMe] = React.useState<Principal | undefined>(undefined);
  const [publicConfig, setPublicConfig] = React.useState<PublicConfig | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const authInterval = React.useRef<number>();

  function cleanUp() {
    setClient(undefined);
    setMe(undefined);
    setPublicConfig(undefined);
    setLoading(false);
  }

  useEffect(() => {
    function _() {
      const client = getAuthenticatedDecafClient();
      if (client) {
        Promise.all([client.barista.get('/me/'), client.barista.get('/conf/public/')])
          .then(([meResp, configResp]) => {
            setClient(client);
            setMe(meResp.data);
            setPublicConfig(configResp.data);
            setLoading(false);
          })
          .catch(cleanUp);
      } else {
        cleanUp();
      }
    }
    _();
    authInterval.current = window.setInterval(_, 1000 * 60);
    return () => {
      window.clearInterval(authInterval.current);
    };
  }, []);

  if (loading) {
    return <DecafSpinner title="Please Wait..." />;
  }

  if (client === undefined || me === undefined || publicConfig === undefined) {
    window.location.href = `/webapps/waitress/production/?next=${window.location.href}&reason=session-expired`;
    return null;
  }

  return (
    <DecafContext.Provider value={{ client, me, publicConfig }}>
      {props.config?.currentVersion && (
        <DecafVersionChecker
          basePath={props.config.basePath}
          currentVersion={props.config.currentVersion}
          onNewVersion={props.config.onNewVersion}
        />
      )}
      {publicConfig.zendesk && (
        <ZendeskWidget
          zendeskKey={publicConfig.zendesk}
          settings={{
            contactForm: {
              fields: [
                {
                  id: 'name',
                  prefill: { '*': me.fullname },
                },
                {
                  id: 'email',
                  prefill: { '*': me.email },
                },
              ],
            },
          }}
        />
      )}
      {props.children}
    </DecafContext.Provider>
  );
}
