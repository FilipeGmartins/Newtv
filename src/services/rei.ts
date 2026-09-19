import type { SportGame, EventStatus } from "../models/events";

export const API = "https://api.reidoscanais.st";
export interface Programme {
  title: string;
  formatted_time?: string;
  start_time: number;
  end_time: number;
}
export interface Channel {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  category?: string;
  embeds: { provider: string; quality?: string; embed_url: string }[];
  epg?: { current?: Programme | null; next?: Programme | null } | null;
}
export interface SearchResults { channels: Channel[]; events: SportGame[] }

async function request(path: string): Promise<unknown> {
  const response = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`API HTTP ${response.status}`);
  const body = await response.json() as { success?: boolean; data?: unknown };
  if (body.success !== true || body.data == null) throw new Error("Invalid API response");
  return body.data;
}

export async function getChannels(): Promise<Channel[]> {
  const data = await request("/channels");
  if (!Array.isArray(data)) throw new Error("Invalid channels response");
  return data;
}
export async function getChannel(id: string): Promise<Channel | undefined> {
  return (await getChannels()).find(channel => channel.id === id);
}
export async function getSports(status?: EventStatus): Promise<SportGame[]> {
  const data = await request(`/sports${status ? `?status=${encodeURIComponent(status)}` : ""}`);
  if (!Array.isArray(data)) throw new Error("Invalid sports response");
  return data;
}
export async function getSport(id: string): Promise<SportGame | undefined> {
  return (await getSports()).find(event => event.id === id);
}
export async function search(query: string): Promise<SearchResults> {
  if (!query.trim()) return { channels: [], events: [] };
  const data = await request(`/search?${new URLSearchParams({ q: query.trim() })}`) as SearchResults;
  if (!Array.isArray(data.channels) || !Array.isArray(data.events)) throw new Error("Invalid search response");
  return data;
}
export function playableEmbeds(embeds: Channel["embeds"] = []) {
  return embeds.filter(embed => {
    try { return new URL(embed.embed_url).protocol === "https:"; } catch { return false; }
  }).map(embed => ({ url: embed.embed_url, source: [embed.provider, embed.quality].filter(Boolean).join(" · ") }));
}
