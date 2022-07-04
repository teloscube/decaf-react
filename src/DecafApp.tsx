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
  }, []);

  useEffect(() => {
    // this is recurring auth check.
    // Note, we are not building a new client here.
    // we already know client and me are set.
    // We just need to check if the credentials are still valid.
    if (client) {
      authInterval.current = window.setInterval(() => {
        client.barista.get('/me/').catch(({ response }) => {
          // we are simply ignoring errors other than 401 and 403.
          if (response.status === 401 || response.status === 403) {
            cleanUp();
          }
        });
      }, 1000 * 60);
    }
    return () => {
      window.clearInterval(authInterval.current);
    };
  }, [client]);

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
