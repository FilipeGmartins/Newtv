import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ props }) => {
  const { url } = props;

  try {
    const response = await fetch(url);
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return new Response("Proxy error: " + error.message, { status: 500 });
    return new Response("Proxy error", { status: 500 });
  }
};

export async function getStaticPaths() {
  const channels = await getCollection("channels");

  const result = channels.map(({ data }) => {
    const channel = data.slug;

    return data.players.map(({ url, source }, index) => ({
      params: { channel, id: String(index + 1) },
      props: { url, source },
    }));
  });

  return result.flat();
}
