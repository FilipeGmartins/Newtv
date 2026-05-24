import type { SportByIdResponse, SportsResponse } from "@/models/events";
import { EVENTS_API_URL } from "astro:env/server";

export async function getLiveEvents(): Promise<SportsResponse> {
  const baseUrl = EVENTS_API_URL;
  console.log(baseUrl);
  const response = await fetch(
    `${baseUrl}/sports?category=Futebol&status=live`,
  );

  const data = await response.json();
  return data;
}

export async function getUpcomingEvents(): Promise<SportsResponse> {
  const baseUrl = EVENTS_API_URL;
  const response = await fetch(
    `${baseUrl}/sports?category=Futebol&status=upcoming`,
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
