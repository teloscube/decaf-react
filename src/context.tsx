import { DecafClient } from '@decafhub/decaf-client';
import React, { JSX, useContext } from 'react';
import { DecafAppController } from './DecafAppController';

export const DecafContext = React.createContext<DecafContextType>({
  client: undefined as unknown as DecafClient,
  me: undefined as unknown as Principal,
  publicConfig: undefined as unknown as PublicConfig,
  privateConfig: undefined as unknown as PrivateConfig,
  controller: undefined as unknown as DecafAppController,
});

export function DecafProvider({ children, value }: { children: JSX.Element; value: DecafContextType }) {
  return <DecafContext.Provider value={value}>{children}</DecafContext.Provider>;
}

export const useDecaf = () => useContext(DecafContext);

/// ///////////////////////
// INTERNAL DEFINITIONS //
/// ///////////////////////

export interface DecafContextType {
  client: DecafClient;
  me: Principal;
  publicConfig: PublicConfig;
  privateConfig: PrivateConfig;
  controller: DecafAppController;
}

export interface Role {
  code: string;
  name: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface Principal {
  id: number;
  guid: string;
  username: string;
  fullname: string;
  first_name: string;
  last_name: string;
  email?: string;
  mobile?: string;
  active: boolean;
  roles: Role[];
  teams: Team[];
  internal: boolean;
  external: boolean;
  privileged: boolean;
}

export interface PublicConfig {
  /** company short name */
  shortname: string;
  /** company full name */
  legalname: string;
  /** company web site */
  website: string;
  /** logo url */
  logo: string;
  /** terms and conditions */
  tnc: string;
  /** zendeks code */
  zendesk?: string;
  /** google analytics code */
  googleax?: string;
  /** one-time password feature? */
  otp: null;
  /** password reset feature should be enabled or not */
  pwdreset: true;
}

/**
 * Type encoding for global private deployment configuration.
 *
 * This configuration value is instantiated during runtime from
 * `/api/conf/private/` API endpoint.
 */
export interface PrivateConfig {
  functions: {
    portmngt: boolean;
    fundmngt: boolean;
    ebanking: boolean;
    pretrade: boolean;
  };
  beanbag?: string;
  releasenotes: string;
  documentation: Resource[];
}

/**
 * Type encoding for a single documentation item.
 */
export interface Resource {
  title: string;
  description: string;
  role: 'privileged' | 'internal' | '*';
  authed: boolean;
  document: { type: 'internal' | 'external'; link: string };
}
