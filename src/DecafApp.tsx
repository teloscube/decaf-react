import { DecafClient } from '@decafhub/decaf-client';
import React, { ReactNode, useEffect } from 'react';
import { DecafAppController, RedirectReason } from './DecafAppController';
import DecafVersionChecker from './DecafVersionChecker';
import { DecafWebappController } from './DecafWebappController';
import { OfflineNotifier } from './OfflineChecker';
import ZendeskWidget from './ZendeskWidget';
import { DecafContext, Principal, PrivateConfig, PublicConfig } from './context';

export interface DecafAppConfig {
  /** version of the application */
  currentVersion?: string;
  /** callback when a new version is available */
  onNewVersion?: (versionOld: string, versionNew: string) => void;
  /** interval (in seconds) to check for new version */
  versionCheckInterval?: number;
  /** interval (in seconds) to check auth status */
  authCheckInterval?: number;
  /** Base path of host app.
   *
   * This is usually PUBLIC_URL environment variable in React apps.
   *
   * Required to enable version checker. */
  basePath?: string;
}
export interface DecafAppProps {
  children: ReactNode;
  config?: DecafAppConfig;
  controller?: DecafAppController;
}

export default function DecafApp(props: DecafAppProps) {
  const [client, setClient] = React.useState<DecafClient | undefined>(undefined);
  const [me, setMe] = React.useState<Principal | undefined>(undefined);
  const [publicConfig, setPublicConfig] = React.useState<PublicConfig | undefined>(undefined);
  const [privateConfig, setPrivateConfig] = React.useState<PrivateConfig | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [redirectReason, setRedirectReason] = React.useState<RedirectReason>('not-authenticated');
  const authInterval = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const controller = props.controller || DecafWebappController;

  function cleanUp(reason: RedirectReason) {
    setClient(undefined);
    setMe(undefined);
    setPublicConfig(undefined);
    setLoading(false);
    setRedirectReason(reason);
  }

  useEffect(() => {
    controller.onLoadingState(loading);
  }, [controller, loading]);

  useEffect(() => {
    const client = controller.getDecafClient();

    if (client) {
      Promise.all([
        client.barista.get('/me/'),
        client.barista.get('/conf/public/'),
        client.barista.get('/conf/private/'),
      ])
        .then(([meResp, configResp, privateConfig]) => {
          setClient(client);
          setMe(meResp.data);
          setPublicConfig(configResp.data);
          setPrivateConfig(privateConfig.data);
          setLoading(false);
        })
        .catch(() => {
          cleanUp('session-expired');
        });
    } else {
      cleanUp('not-authenticated');
    }
  }, [controller]);

  useEffect(() => {
    // this is recurring auth check.
    // Note, we are not building a new client here.
    // we already know client and me are set.
    // We just need to check if the credentials are still valid.
    if (client) {
      authInterval.current = setInterval(
        () => {
          client.barista.get('/me/').catch(({ response }) => {
            // we are simply ignoring errors other than 401 and 403.
            if (response.status === 401 || response.status === 403) {
              cleanUp('session-expired');
            }
          });
        },
        (props.config?.authCheckInterval || 60) * 1000
      );
    }
    return () => {
      clearInterval(authInterval.current);
    };
  }, [client, props.config?.authCheckInterval]);

  if (loading) {
    return <>{controller.loadingComponent}</>;
  } else if (client === undefined || me === undefined || publicConfig === undefined || privateConfig === undefined) {
    return controller.onInvalidSession(redirectReason);
  } else {
    return (
      <DecafContext.Provider value={{ client, me, publicConfig, privateConfig, controller }}>
        {props.config?.currentVersion && (
          <DecafVersionChecker
            basePath={props.config.basePath}
            currentVersion={props.config.currentVersion}
            onNewVersion={props.config.onNewVersion}
            interval={props.config.versionCheckInterval}
          />
        )}
        {!controller.disableZendeskWidget && publicConfig.zendesk && (
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
        {!controller?.isNodeApp && <OfflineNotifier />}
      </DecafContext.Provider>
    );
  }
}
