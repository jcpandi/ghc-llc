import Script from "next/script";

/**
 * LeadConnector (GoHighLevel) chat widget, the same one used on
 * herocleaninggroup.com. Loads after the page is idle so it doesn't slow
 * the hero intro.
 */
const WIDGET_ID = "69fffb274c428b106a0ec4ea";

export default function ChatWidget() {
  return (
    <Script
      id="lc-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={WIDGET_ID}
      strategy="lazyOnload"
    />
  );
}
