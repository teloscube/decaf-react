import { DecafClient } from '@decafhub/decaf-client';
import React from 'react';
import { DecafContextType } from 'types';
export declare const DecafContext: React.Context<DecafContextType>;
export declare function DecafProvider({ children, value }: {
    children: JSX.Element;
    value: DecafContextType;
}): JSX.Element;
export declare const useDecaf: () => DecafContextType;
export declare function getAuthenticationToken(): string | undefined;
export declare function getAuthenticatedDecafClient(): DecafClient | undefined;
//# sourceMappingURL=context.d.ts.map