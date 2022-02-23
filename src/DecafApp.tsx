import { DecafClient } from '@decafhub/decaf-client';
import React, { useEffect } from 'react';
import { DecafContext, getAuthenticatedDecafClient } from './context';
import DecafSpinner from './DecafSpinner';

export type DecafAppType = {
  children: JSX.Element;
};

export default function DecafApp(props: DecafAppType) {
  const [client, setClient] = React.useState<DecafClient | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const client = getAuthenticatedDecafClient();
    if (client) {
      client.barista
        .get('/healthchecks/')
        .then(() => {
          setClient(client);
          setLoading(false);
        })
        .catch(() => {
          setClient(undefined);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setClient(undefined);
    }
  }, []);

  if (loading) {
    return <DecafSpinner title="Please Wait..." />;
  }

  if (client === undefined) {
    window.location.href = `/webapps/waitress/production?next=${window.location.href}`;
    return null;
  }

  return <DecafContext.Provider value={{ client: client }}>{props.children}</DecafContext.Provider>;
}
