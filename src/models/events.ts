export type EventStatus = "upcoming" | "live" | "finished";

export interface SportEmbed {
  provider: string;
  quality: string;
  embed_url: string;
}

export interface SportGame {
  id: string;
  title: string;
  description: string;
  poster: string;
  start_time: string;
  end_time: string;
  status: EventStatus;
  category: string;
  embeds: SportEmbed[];
}

export interface SportsResponse {
  success: boolean;
  data: SportGame[];
  total: number;
}

export interface SportByIdResponse {
  success: boolean;
  data: SportGame;
}
