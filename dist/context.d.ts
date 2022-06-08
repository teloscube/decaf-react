import { DecafClient } from '@decafhub/decaf-client';
import React from 'react';
export declare const DecafContext: React.Context<DecafContextType>;
export declare function DecafProvider({ children, value }: {
    children: JSX.Element;
    value: DecafContextType;
}): JSX.Element;
export declare const useDecaf: () => DecafContextType;
export declare function getAuthenticationToken(): string | undefined;
export declare function getAuthenticatedDecafClient(): DecafClient | undefined;
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
//# sourceMappingURL=context.d.ts.map