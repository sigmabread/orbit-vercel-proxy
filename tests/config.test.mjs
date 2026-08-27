import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeWispUrl } from '../api/config.mjs';

test('canonicalizes the user-provided external Wisp endpoint', () => {
  assert.equal(normalizeWispUrl('stale-nonna-interstellarrrr-8ae62b4e.koyeb.app/wisp'), 'wss://stale-nonna-interstellarrrr-8ae62b4e.koyeb.app/wisp/');
  assert.equal(normalizeWispUrl('wss://proxy.example/wisp/'), 'wss://proxy.example/wisp/');
});

test('rejects unsupported external endpoint schemes', () => {
  assert.throws(() => normalizeWispUrl('https://proxy.example/wisp'), /ws:\/\/ or wss:\/\//);
});
