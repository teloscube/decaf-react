import { useEffect } from 'react';

export interface ZendeskWidgetProps {
  /** public zendesk key */
  zendeskKey: string;
  /** zendesk widget settings. see:
   *
   * https://developer.zendesk.com/api-reference/widget/settings/
   * */
  settings?: Record<string, any>;
}

const ZENDESK_WIDGET_SCRIPT = 'https://static.zdassets.com/ekr/snippet.js';

export default function ZendeskWidget(props: ZendeskWidgetProps) {
  useEffect(() => {
    if (!props.zendeskKey || typeof document === 'undefined') return;
    const script = document.createElement('script');
    script.src = ZENDESK_WIDGET_SCRIPT + '?key=' + props.zendeskKey;
    script.async = true;
    script.id = 'ze-snippet'; // do not change this. zendesk expects this to be ze-snippet
    document.body.appendChild(script);
    // @ts-expect-error
    window.zESettings = props.settings || {};
    return () => {
      document.body.removeChild(script);
    };
  }, [props]);

  return null;
}
