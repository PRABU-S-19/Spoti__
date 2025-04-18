// Song data
const songs = [
  {
    title: "Safari",
    artist: "Serhat Durmus",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://i1.sndcdn.com/artworks-000449882396-6k9gn2-t500x500.jpg"
  },
  {
    title: "Closer",
    artist: "The Chainsmokers",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/6/62/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png"
  },
  {
    title: "Alone",
    artist: "Alan Walker",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/f/f2/Alan_Walker_-_Alone.png"
  }
];

let currentIndex = 0;
const audio = new Audio();
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("artist-name");
const coverEl = document.querySelector(".cover");
const progressEl = document.getElementById("progress");
const volumeEl = document.getElementById("volume");
const trackListEl = document.querySelector(".track-list");

// Load song to player
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
}

// Play / Pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

// Next / Prev
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Progress
audio.addEventListener("timeupdate", () => {
  progressEl.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressEl.addEventListener("input", () => {
  audio.currentTime = (progressEl.value / 100) * audio.duration;
});

// Volume
volumeEl.addEventListener("input", () => {
  audio.volume = volumeEl.value;
});

// Track list UI
function renderTrackList() {
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "track-item";
    item.innerHTML = `
      <img src="${song.cover}" alt="Cover" />
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    `;
    item.onclick = () => {
      currentIndex = index;
      loadSong(index);
      audio.play();
      playBtn.textContent = "⏸️";
    };
    trackListEl.appendChild(item);
  });
}

// Init
renderTrackList();
loadSong(currentIndex);

// Event listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);