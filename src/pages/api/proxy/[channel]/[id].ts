import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const channels = await getCollection("channels");
  const channel = channels.find(({ data }) => data.slug === params.channel);
  const id = params.id ?? "";
  if (!channel || !/^[1-9]\d*$/.test(id)) {
    return new Response("Player not found", { status: 404 });
  }
  const player = channel.data.players[Number(id) - 1];
  if (!player) return new Response("Player not found", { status: 404 });

  try {
    const response = await fetch(player.url, {
      signal: AbortSignal.timeout(10_000),
    });
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  } catch {
    return new Response("Player temporarily unavailable", { status: 502 });
  }
};
