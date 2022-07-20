import { DecafClient } from '@decafhub/decaf-client';
import { ReactNode } from 'react';

export interface DecafAppController {
  getDecafClient(): DecafClient;
  onSessionExpired(): null;
  onLoadingState(loading: boolean): null;
  loadingComponent: ReactNode;
}
