import { getSports } from "../rei";
import type { EventStatus, SportsResponse } from "../../models/events";
export async function getEvents(status: EventStatus): Promise<SportsResponse> {
  const data = await getSports(status);
  return { success: true, data, total: data.length };
}
