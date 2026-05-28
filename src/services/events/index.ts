import type {
  SportByIdResponse,
  EventStatus,
  SportsResponse,
} from "@/models/events";
import { EVENTS_API_URL } from "astro:env/server";

export async function getEvents(status: EventStatus): Promise<SportsResponse> {
  const baseUrl = EVENTS_API_URL;
  const response = await fetch(
    `${baseUrl}/sports?category=Futebol&status=${status}`,
  );

  const data = await response.json();
  return data;
}

export async function getEventById(id: string): Promise<SportByIdResponse> {
  const baseUrl = EVENTS_API_URL;
  const response = await fetch(`${baseUrl}/sports/${id}`);

  const data = await response.json();
  return data;
}
