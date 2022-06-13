import { buildDecafClient, DecafClient } from '@decafhub/decaf-client';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';

export const DecafContext = React.createContext<DecafContextType>({
  client: undefined as unknown as DecafClient,
  me: undefined as unknown as Principal,
  publicConfig: undefined as unknown as PublicConfig,
});

export function DecafProvider({ children, value }: { children: JSX.Element; value: DecafContextType }) {
  return <DecafContext.Provider value={value}>{children}</DecafContext.Provider>;
}

export const useDecaf = () => useContext(DecafContext);

/// ///////////////////////
// INTERNAL DEFINITIONS //
/// ///////////////////////

export function getAuthenticationToken(): string | undefined {
  // Attempt to get the cookie value:
  const cookie = Cookies.get('ember_simple_auth-session');

  // If no cookie, return nothing:
  if (!cookie) {
    return undefined;
  }

  try {
    // Attempt to parse the cookie value:
    const authinfo = JSON.parse(cookie);

    // Get the token, if any:
    const token: string | undefined = authinfo?.authenticated?.token;

    // Done, return the token:
    return token;
  } catch {
    console.error('Can not parse authentication information!');
    return undefined;
  }
}

export function getAuthenticatedDecafClient(): DecafClient | undefined {
  // Attempt to get the authentication token:
  const token = getAuthenticationToken();

  // Check token, build client and return:
  return token ? buildDecafClient('', { token }) : undefined;
}

export interface DecafContextType {
  client: DecafClient;
  me: Principal;
  publicConfig: PublicConfig;
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
