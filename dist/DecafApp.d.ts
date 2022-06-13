/// <reference types="react" />
export interface DecafAppConfig {
    /** version of the application */
    currentVersion?: string;
    /** callback when a new version is available */
    onNewVersion?: (versionOld: string, versionNew: string) => void;
    /** Base path of host app.
     *
     * This is usually PUBLIC_URL environment variable in React apps.
     *
     * Required to enable version checker. */
    basePath?: string;
}
export interface DecafAppType {
    children: JSX.Element;
    config?: DecafAppConfig;
}
export default function DecafApp(props: DecafAppType): JSX.Element | null;
//# sourceMappingURL=DecafApp.d.ts.map