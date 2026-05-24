export interface BaseEmbed {
  source: string;
}

export interface RawEmbed extends BaseEmbed {
  url: string;
}

export interface ProxiedEmbed extends BaseEmbed {
  slug: string;
  index: number;
}
