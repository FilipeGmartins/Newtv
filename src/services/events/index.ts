import type {
  SportByIdResponse,
  EventStatus,
  SportsResponse,
} from "@/models/events";
import { EVENTS_API_URL } from "astro:env/server";

function getBaseUrl(): string {
  if (!EVENTS_API_URL) {
    throw new Error(
      "EVENTS_API_URL is not configured. Set it in your .env file or Cloudflare environment.",
    );
  }

  return EVENTS_API_URL;
}

export async function getEvents(status: EventStatus): Promise<SportsResponse> {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/sports?category=Futebol&status=${status}`,
  );

  const data = await response.json();
  return data;
}

export async function getEventById(id: string): Promise<SportByIdResponse> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/sports/${id}`);

  const data = await response.json();
  return data;
}
