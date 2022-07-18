import { buildDecafClient } from '@decafhub/decaf-client';
import { DecafAppController } from './DecafAppController';

export function getCookie(name: string): string | undefined {
  // Check if we are on Browser environment:
  if (typeof document === 'undefined') {
    // Nope! Raise an exception:
    throw new Error('Can not read cookie: Not on browser environment!');
  }

  // Attempt to get the cookie:
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

  // Return the value of the cookie if found, `undefined` otherwise.
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function getAuthenticationToken(): string | undefined {
  // Attempt to get the cookie value:
  const cookie = getCookie('ember_simple_auth-session');

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

export const DecafWebappController: DecafAppController = {
  getDecafClient() {
    // Attempt to get the authentication token:
    const token = getAuthenticationToken();

    // Check token, build client and return:
    return token ? buildDecafClient('', { token }) : undefined;
  },

  onSessionExpired() {
    window.location.href = `/webapps/waitress/production/?next=${window.location.href}&reason=session-expired`;
    return null;
  },
};
