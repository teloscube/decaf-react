import { DecafClient } from '@decafhub/decaf-client';

export interface DecafAppController {
  getDecafClient(): DecafClient | undefined;
  onSessionExpired(): null;
}
