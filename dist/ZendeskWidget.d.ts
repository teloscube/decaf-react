interface ZendeskWidgetProps {
    /** public zendesk key */
    zendeskKey: string;
    /** zendesk widget settings. see:
     *
     * https://developer.zendesk.com/api-reference/widget/settings/
     * */
    settings?: Record<string, any>;
}
export default function ZendeskWidget(props: ZendeskWidgetProps): null;
export {};
//# sourceMappingURL=ZendeskWidget.d.ts.map