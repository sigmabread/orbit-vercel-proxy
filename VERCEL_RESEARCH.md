# Vercel Architecture Research

| Area | Current platform finding | Architecture decision |
| --- | --- | --- |
| WebSocket functions | Vercel Functions can now serve WebSocket connections when Fluid compute is enabled. A connection stays pinned to one function instance but closes when the function reaches its duration limit. [1] | A Wisp endpoint can be implemented as a Vercel Function, but a long-lived transport must handle reconnects and is inherently duration-bounded. |
| Function duration | Vercel Functions have finite durations: 300 seconds on Hobby, up to 800 seconds on Pro/Enterprise, with a limited extended option. [2] | A persistent Wisp proxy should remain externally hosted for reliable continuous browsing. The Vercel package will use an external Wisp URL by default. |
| Static assets | Vercel serves `public/**` assets from its CDN; `express.static()` does not serve them on Vercel. [3] | The Orbit entry page, Ultraviolet service-worker configuration, and browser transport files will live under `public/`. |
| Environment values | Vercel environment variables are available during build or function execution, not automatically as runtime browser configuration. [4] | A tiny `/api/config` function will expose only the non-secret Wisp endpoint URL to the browser. |

## Scope decision

This package will provide a **Vercel-hosted Orbit frontend** with an Ultraviolet service worker and a configurable external Wisp endpoint. It will not host a permanent Wisp server in Vercel Functions, because transport connections are duration-bounded. The operator can point `ORBIT_WISP_URL` at the separately deployed Koyeb Wisp service from the previous package.

## References

[1]: https://vercel.com/docs/functions/websockets "Vercel WebSockets"
[2]: https://vercel.com/docs/functions/limitations "Vercel Function Limits"
[3]: https://vercel.com/docs/frameworks/backend/express "Express on Vercel"
[4]: https://vercel.com/docs/environment-variables "Vercel Environment Variables"
