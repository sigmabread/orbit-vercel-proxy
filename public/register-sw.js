/* Orbit service-worker registration for a Vercel-hosted HTTPS frontend. */
window.registerOrbitServiceWorker = async function registerOrbitServiceWorker() {
  if (!('serviceWorker' in navigator)) throw new Error('This browser does not support service workers.');
  if (location.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
    throw new Error('Service workers require HTTPS outside local development.');
  }
  const registration = await navigator.serviceWorker.register('/uv/sw.js', { scope: '/uv/' });
  await navigator.serviceWorker.ready;
  return registration;
};
