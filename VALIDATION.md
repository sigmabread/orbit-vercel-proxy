# Validation Record

The Orbit Vercel package was validated locally on **August 27, 2026**.

| Check | Result |
| --- | --- |
| Unit tests | Passed: external Wisp endpoint normalization and unsupported-scheme rejection. |
| Script syntax | Passed for the configuration function, vendor-copy build script, browser launch script, and service-worker registration script. |
| Vendor build | Passed: Ultraviolet service worker, Ultraviolet bundle, BareMux, Epoxy, and the custom Orbit UV configuration were written under `public/`. |
| External endpoint default | The fallback normalizes to `wss://stale-nonna-interstellarrrr-8ae62b4e.koyeb.app/wisp/`. A deployment can override it with `ORBIT_WISP_URL`. |
| Vercel boundary | Verified by current Vercel documentation: WebSocket Function connections are duration-bounded, so this package intentionally uses an external Wisp service instead of a Vercel-hosted persistent transport. [1] [2] |

## Production acceptance

After deployment, open the Vercel **HTTPS** domain in a standard browser, enter `https://example.com`, and confirm that `/uv/sw.js` appears as an active service worker. Then confirm that the browser has received `ORBIT_WISP_URL` from `/api/config` before evaluating further sites. These browser interactions cannot be fully validated in the sandbox browser, whose page-evaluation context does not expose service-worker APIs.

## References

[1]: https://vercel.com/docs/functions/websockets "Vercel WebSockets"
[2]: https://vercel.com/docs/functions/limitations "Vercel Function Limits"
