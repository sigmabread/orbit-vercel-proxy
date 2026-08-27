/* Build step: copy browser-only Ultraviolet/BareMux/Epoxy runtime files to Vercel's public directory. */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

function copyVendor(source, destination, { preserveConfig = false } = {}) {
  const configFile = path.join(destination, 'uv.config.js');
  const orbitConfig = preserveConfig && readFileSync(configFile, 'utf8');
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(destination, { recursive: true });
  cpSync(source, destination, { recursive: true });
  if (orbitConfig) writeFileSync(configFile, orbitConfig);
}

copyVendor(uvPath, path.join(publicDir, 'uv'), { preserveConfig: true });
copyVendor(epoxyPath, path.join(publicDir, 'epoxy'));
copyVendor(baremuxPath, path.join(publicDir, 'baremux'));

console.log('Orbit vendor assets copied for Vercel static deployment.');
