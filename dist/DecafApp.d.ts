/// <reference types="react" />
export interface DecafAppConfig {
    /** version of the application */
    currentVersion?: string;
    /** callback when a new version is available */
    onNewVersion?: (newVersion: string) => void;
}
export interface DecafAppType {
    children: JSX.Element;
    config?: DecafAppConfig;
}
export default function DecafApp(props: DecafAppType): JSX.Element | null;
//# sourceMappingURL=DecafApp.d.ts.map