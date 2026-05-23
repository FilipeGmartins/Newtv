// =========================
// FILE: logos.js
// =========================
// Mapeamento de canais para suas logos
// Você pode adicionar logos em URL, caminho local, ou usar placeholder

const logos = {
  "Premiere": "img/premiere-br.webp",
  "SportTV": "img/sportv.webp",
  "SportTV 2": "img/sportv.webp",
  "SportTV 3": "img/sportv.webp",
  "Premiere 2": "img/premiere-br.webp",
  "Premiere 3": "img/premiere-br.webp",
  "Globo": "img/globo.webp",
  "Premiere 4": "img/premiere-br.webp",
  "Premiere 5": "img/premiere-br.webp",
  "Premiere 6": "img/premiere-br.webp",
  "Premiere 7": "img/premiere-br.webp",
  "Premiere 8": "img/premiere-br.webp",
  "TNT(Champions League)": "img/tnt-br.webp",
  "ESPN": "img/espn.webp",
  "ESPN 2": "img/espn.webp",
  "ESPN 3": "img/espn.webp",
  "ESPN 4": "img/espn-4-br.webp",
  "ESPN 5": "img/espn-5.webp",
  "ESPN 6": "img/espn.webp",
  "XSPORTS": "img/xsports.webp",
  "Canal Max": "img/max-icon.webp",
  "Canal Max 2": "img/max-icon.webp",
  "Canal Max 3": "img/max-icon.webp",
  "Canal Max 4": "img/max-icon.webp",
  "Canal Max 5": "img/max-icon.webp",
  "Canal Max 6": "img/max-icon.webp",
  "Combate": "img/combate.webp",
  "DAZN": "img/dazn.webp",
  "Prime Video 1": "img/primevideo.webp",
  "Prime Video 2": "img/primevideo.webp",
  "Prime Video 3": "img/primevideo.webp",
  "BandSports": "img/bandsports.webp",
  "Todo Mundo Odeia o Chris24H": "img/24h_odeiachris.webp"
};

// Função para obter a logo de um canal
function getLogoByChannelName(channelName) {
  return logos[channelName] || "img/padrao.webp";
}
