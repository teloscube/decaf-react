import { DecafClient } from '@decafhub/decaf-client';
import { ReactNode } from 'react';
import { DecafAppController, RedirectReason } from './DecafAppController';

export abstract class AbstractDecafNativeController implements DecafAppController {
  private client: DecafClient;

  constructor(client: DecafClient) {
    this.client = client;
  }

  getDecafClient() {
    return this.client;
  }

  abstract onInvalidSession(reason: RedirectReason): null;

  abstract onLoadingState(loading: boolean): null;

  abstract loadingComponent: ReactNode;
}
