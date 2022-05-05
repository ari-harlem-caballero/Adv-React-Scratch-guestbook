import { client, parseData } from './client';

export async function getEntries() {
  const request = await client
    .from('entries')
    .select()
    .order('created_at', { ascending: false });
  return parseData(request);
}

export async function createEntry({ userId, content }) {
  const request = await client
    .from('entries')
    .insert({ guest_id: userId, content });
  return parseData(request);
}

export async function updateEntryById(id, content) {
  const request = await client
    .from('entries')
    .update({ content })
    .match({ id });
  return parseData(request);
}

export async function deleteEntryById(id) {
  const request = await client.from('entries').delete().match({ id });
  return parseData(request);
}