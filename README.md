# Orbit for Vercel

This package deploys the dark Orbit frontend and an Ultraviolet service-worker proxy to Vercel. It deliberately uses an **external Wisp endpoint** rather than attempting to keep a Wisp server alive inside a Vercel Function.

> Vercel Functions can serve WebSockets, but their connections close when the function reaches its duration limit. For a continuous browser transport, host Wisp separately—for example, with the accompanying Koyeb package—and configure `ORBIT_WISP_URL` to that public `/wisp/` endpoint. [1] [2]

## Architecture

| Deployed on Vercel | Hosted separately |
| --- | --- |
| Orbit dark entry page | WispJS-compatible endpoint |
| Ultraviolet service worker and route rewriter | Long-lived outbound TCP stream handling |
| BareMux and Epoxy browser assets | Target-access and network policy controls |
| `/api/config` browser configuration endpoint | Server logs and target-specific error details |

## Deploy to Vercel

1. Unzip this archive and push the folder to a Git repository, or import the folder using your preferred Vercel workflow.
2. In **Project Settings → Environment Variables**, set `ORBIT_WISP_URL` to your public Wisp endpoint. For example: `wss://your-koyeb-service.koyeb.app/wisp/`.
3. Deploy using the included `vercel.json`. The build command copies vendor browser assets into `public/` before deployment.
4. Open the Vercel HTTPS URL in a normal browser, submit `https://example.com`, and check that the service worker activates before evaluating additional sites.

`ORBIT_WISP_URL` is intentionally provided to the browser through `/api/config`, because the service worker must connect to it. Do not place passwords, access tokens, or private endpoint URLs in that variable.

## Local verification

```sh
npm install
npm run check
npm test
npm run build
```

Use `vercel dev` to test a Vercel-equivalent local environment. Service workers require HTTPS outside localhost.

## Limitations and operations

Vercel serves files in `public/**` from its CDN, which is why the build script explicitly copies the proxy runtime browser assets there. [3] The external Wisp service must allow the desired public target connections and remain online. Website-level restrictions—such as authentication, anti-bot systems, media delivery, rate limits, regional availability, and browser-integrity checks—can still prevent a target from working even when Orbit and Wisp are healthy.

Keep private, loopback, and internal targets blocked at the Wisp host. A broadly exposed Wisp service requires monitoring, resource limits, and access controls appropriate to your deployment.

## License and source availability

This project is AGPL-3.0-or-later due to its proxy runtime dependencies. Preserve the included full license and dependency notices, and make the corresponding source available to users of your hosted deployment. See [NOTICE.md](./NOTICE.md).

## References

[1]: https://vercel.com/docs/functions/websockets "Vercel WebSockets"
[2]: https://vercel.com/docs/functions/limitations "Vercel Function Limits"
[3]: https://vercel.com/docs/frameworks/backend/express "Express on Vercel"
[4]: https://github.com/titaniumnetwork-dev/Ultraviolet/wiki/Installing "Ultraviolet installation guide"
