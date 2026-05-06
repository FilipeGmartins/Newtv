

// =========================
// FILE: script.js
// =========================
const container = document.getElementById("channel-list");
const modal = document.getElementById("player-modal");
const player = document.getElementById("player");
const closeBtn = document.getElementById("close-btn");
const channelTitle = document.getElementById("current-channel-title");
const prevChannelBtn = document.getElementById("prev-channel");
const nextChannelBtn = document.getElementById("next-channel");

let currentChannelIndex = -1;

function openPlayer(link, channelName, index) {
  player.src = link;
  modal.classList.remove("hidden");

  if (channelName) {
    channelTitle.textContent = channelName;
    currentChannelIndex = index;
  }

  const fullscreenTarget = player;
  if (fullscreenTarget.requestFullscreen) {
    fullscreenTarget.requestFullscreen().catch(() => {
      if (modal.requestFullscreen) {
        modal.requestFullscreen().catch(() => {
          console.warn("Fullscreen não pôde ser ativado.");
        });
      }
    });
  }
}

function navigateChannel(direction) {
  if (currentChannelIndex === -1) return;

  let newIndex = currentChannelIndex + direction;

  if (newIndex < 0) {
    newIndex = channels.length - 1;
  } else if (newIndex >= channels.length) {
    newIndex = 0;
  }

  const channel = channels[newIndex];
  openPlayer(channel.link, channel.name, newIndex);
}

function renderChannels() {
  channels.forEach((channel, index) => {
    const card = document.createElement("div");
    card.classList.add("channel-card");

    const logo = getLogoByChannelName(channel.name);

    card.innerHTML = `
      <img src="${logo}" alt="${channel.name}" loading="lazy" />
      <div class="channel-info">
        <h3>${channel.name}</h3>
      </div>
    `;

    card.addEventListener("click", () => openPlayer(channel.link, channel.name, index));

    container.appendChild(card);
  });
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  player.src = "";
  currentChannelIndex = -1;
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
});

prevChannelBtn.addEventListener("click", () => navigateChannel(-1));
nextChannelBtn.addEventListener("click", () => navigateChannel(1));

renderChannels();
