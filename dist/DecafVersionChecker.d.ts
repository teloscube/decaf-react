/// <reference types="react" />
export interface DecafVersionCheckerProps {
    currentVersion: string;
    onNewVersion?: (versionOld: string, versionNew: string) => void;
    publicURL?: string;
}
export default function DecafVersionChecker(props: DecafVersionCheckerProps): JSX.Element | null;
//# sourceMappingURL=DecafVersionChecker.d.ts.map