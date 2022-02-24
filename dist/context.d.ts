import { DecafClient } from '@decafhub/decaf-client';
import React from 'react';
export declare function getCookie(name: string): string;
export interface DecafContextType {
    client: DecafClient;
}
export declare const DecafContext: React.Context<DecafContextType>;
export declare function DecafProvider({ children, value }: {
    children: JSX.Element;
    value: DecafContextType;
}): JSX.Element;
export declare const useDecaf: () => DecafContextType;
export declare function getAuthenticationToken(): string | undefined;
export declare function getAuthenticatedDecafClient(): DecafClient | undefined;
export declare function getAuthenticatedDecafClientOrRedirect(): DecafClient;
//# sourceMappingURL=context.d.ts.map