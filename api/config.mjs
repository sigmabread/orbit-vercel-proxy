/* Vercel runtime configuration: expose only the non-secret external Wisp endpoint. */
const FALLBACK_WISP_URL = 'wss://stale-nonna-interstellarrrr-8ae62b4e.koyeb.app/wisp/';

function normalizeWispUrl(value) {
  const input = String(value || FALLBACK_WISP_URL).trim();
  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(input);
  const url = new URL(hasScheme ? input : `wss://${input}`);
  if (!['ws:', 'wss:'].includes(url.protocol)) throw new TypeError('ORBIT_WISP_URL must use ws:// or wss://.');
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.hash = '';
  return url.href;
}

export default function handler(_request, response) {
  try {
    response.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.status(200).json({ wispUrl: normalizeWispUrl(process.env.ORBIT_WISP_URL) });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

export { normalizeWispUrl };
