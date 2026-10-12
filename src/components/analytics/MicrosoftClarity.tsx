import { CLARITY_PROJECT_ID } from "@/lib/clarity";

/**
 * Microsoft Clarity loader. Rendered once in the root layout so it ships in
 * every statically exported page - never pasted into individual pages.
 *
 * This is Microsoft's official tag, unmodified except for injecting the project
 * ID from a single constant. It defines the `clarity` queue stub, then appends
 * an `async` <script> for clarity.ms, so it never blocks rendering.
 *
 * No consent override is issued: Clarity's built-in Consent Signal enforcement
 * (EEA + UK + Switzerland, live since 2025-10-31) keeps in-region visitors
 * cookieless until consent is signalled, which mirrors the site's region-scoped
 * GA4 Consent Mode. Calling `clarity("consent")` here would force-grant and
 * bypass that enforcement, so it is deliberately omitted. See clarity.ts.
 */

const CLARITY_SNIPPET = `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
`.trim();

export function MicrosoftClarity() {
  return <script id="ms-clarity-init" dangerouslySetInnerHTML={{ __html: CLARITY_SNIPPET }} />;
}
