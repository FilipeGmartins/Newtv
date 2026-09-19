import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getChannels, getChannel, getSports, getSport, search, playableEmbeds } from '../src/services/rei.ts';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const reply = data => new Response(JSON.stringify({ success: true, data }));
test('channels and detail use the API ID and preserve EPG', async () => {
  const channel = { id: 'band', name: 'Band', embeds: [], epg: { current: { title: 'Jornal' } } };
  globalThis.fetch = async url => { assert.equal(url, 'https://api.reidoscanais.st/channels'); return reply([channel]); };
  assert.deepEqual(await getChannel('band'), channel);
  assert.equal(await getChannel('missing'), undefined);
});
test('sports filter and global search use the requested endpoints', async () => {
  globalThis.fetch = async url => { assert.equal(url, 'https://api.reidoscanais.st/sports?status=live'); return reply([]); };
  assert.deepEqual(await getSports('live'), []);
  globalThis.fetch = async url => { assert.equal(new URL(url).searchParams.get('q'), 'São Paulo & futebol'); return reply({ channels: [], events: [] }); };
  assert.deepEqual(await search(' São Paulo & futebol '), { channels: [], events: [] });
});
test('event detail and missing IDs', async () => {
  globalThis.fetch = async () => reply([{ id: 'match', embeds: [] }]);
  assert.equal((await getSport('match')).id, 'match');
  assert.equal(await getSport('missing'), undefined);
});
test('HTTP, API, malformed and network failures reject instead of showing empty success', async () => {
  for (const response of [new Response('', { status: 503 }), new Response('{'), new Response(JSON.stringify({success:false,data:[]})), reply({})]) {
    globalThis.fetch = async () => response;
    await assert.rejects(getChannels);
  }
  globalThis.fetch = async () => { throw new Error('network'); };
  await assert.rejects(getChannels);
});
test('empty search does not call API and unsafe embed URLs are rejected', async () => {
  globalThis.fetch = async () => { throw new Error('should not call'); };
  assert.deepEqual(await search(' '), {channels:[],events:[]});
  assert.deepEqual(playableEmbeds([{provider:'A',embed_url:'javascript:alert(1)'},{provider:'B',quality:'HD',embed_url:'https://example.com/player'}]), [{url:'https://example.com/player',source:'B · HD'}]);
});
