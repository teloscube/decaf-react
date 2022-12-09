import { DecafClient } from '@decafhub/decaf-client';
import { ReactNode } from 'react';

export type RedirectReason = 'session-expired' | 'not-authenticated';

export interface DecafAppController {
  getDecafClient(): DecafClient | undefined;
  onInvalidSession(reason: RedirectReason): null;
  onLoadingState(loading: boolean): null;
  loadingComponent: ReactNode;
  disableZendeskWidget?: boolean;
  isNodeApp?: boolean;
}
