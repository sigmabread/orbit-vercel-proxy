/* Orbit Vercel frontend: service-worker proxy routing through a configured external Wisp endpoint. */
const form = document.getElementById('route-form');
const input = document.getElementById('route-input');
const status = document.getElementById('route-status');
const searchTemplate = 'https://www.google.com/search?q=%s';

function destinationFor(value) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error('Enter an address or search query.');
  try { return new URL(trimmed).href; } catch { /* try a hostname */ }
  try {
    const url = new URL(`https://${trimmed}`);
    if (url.hostname.includes('.')) return url.href;
  } catch { /* use search instead */ }
  return searchTemplate.replace('%s', encodeURIComponent(trimmed));
}

async function configuredWisp() {
  const response = await fetch('/api/config', { cache: 'no-store' });
  if (!response.ok) throw new Error('The Wisp endpoint configuration is unavailable.');
  const config = await response.json();
  if (!config.wispUrl) throw new Error('No Wisp endpoint is configured.');
  return config.wispUrl;
}

async function configureTransport(wispUrl) {
  const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
  if ((await connection.getTransport()) !== '/epoxy/index.mjs') {
    await connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Preparing private route…';
  try {
    const [destination, wispUrl] = await Promise.all([Promise.resolve(destinationFor(input.value)), configuredWisp()]);
    await window.registerOrbitServiceWorker();
    await configureTransport(wispUrl);
    status.textContent = 'Routing…';
    location.assign(__uv$config.prefix + __uv$config.encodeUrl(destination));
  } catch (error) {
    status.textContent = error.message || 'Unable to prepare the proxy route.';
    button.disabled = false;
  }
});
