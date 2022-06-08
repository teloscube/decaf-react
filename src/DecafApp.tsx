import { DecafClient } from '@decafhub/decaf-client';
import React, { useEffect } from 'react';
import { Principal, PublicConfig } from 'types';
import ZendeskWidget from 'ZendeskWidget';
import { DecafContext, getAuthenticatedDecafClient } from './context';
import DecafSpinner from './DecafSpinner';

export type DecafAppType = {
  children: JSX.Element;
};

export default function DecafApp(props: DecafAppType) {
  const [client, setClient] = React.useState<DecafClient | undefined>(undefined);
  const [me, setMe] = React.useState<Principal | undefined>(undefined);
  const [publicConfig, setPublicConfig] = React.useState<PublicConfig | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const client = getAuthenticatedDecafClient();
    if (client) {
      Promise.all([client.barista.get('/me/'), client.barista.get('/conf/public/')])
        .then(([meResp, configResp]) => {
          setMe(meResp.data);
          setPublicConfig(configResp.data);
          setLoading(false);
        })
        .catch(() => {
          setClient(undefined);
          setMe(undefined);
          setPublicConfig(undefined);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setClient(undefined);
      setMe(undefined);
      setPublicConfig(undefined);
    }
  }, []);

  if (loading) {
    return <DecafSpinner title="Please Wait..." />;
  }

  if (client === undefined || me === undefined || publicConfig === undefined) {
    window.location.href = `/webapps/waitress/production/?next=${window.location.href}`;
    return null;
  }

  return (
    <DecafContext.Provider value={{ client, me, publicConfig }}>
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
