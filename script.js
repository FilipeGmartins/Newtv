

// =========================
// FILE: script.js
// =========================
const container = document.getElementById("channel-list");
const modal = document.getElementById("player-modal");
const player = document.getElementById("player");
const closeBtn = document.getElementById("close-btn");

function renderChannels() {
  channels.forEach(channel => {
    const card = document.createElement("div");
    card.classList.add("channel-card");

    card.innerHTML = `
      <img src="${channel.image}" alt="${channel.name}" />
      <div class="channel-info">
        <h3>${channel.name}</h3>
        <button class="watch-btn">Assistir agora</button>
      </div>
    `;

    card.querySelector(".watch-btn").addEventListener("click", () => {
      player.src = channel.link;
      modal.classList.remove("hidden");
    });

    container.appendChild(card);
  });
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  player.src = "";
});

renderChannels();
