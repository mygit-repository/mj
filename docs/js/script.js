const lyricsContainer = document.getElementById("lyricsContainer");
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");

const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const progressThumb = document.getElementById("progressThumb");

const currentTimeLabel = document.getElementById("currentTime");
const totalTimeLabel = document.getElementById("totalTime");

// ==============================
//   SONG DATA (was LyricsService.java)
// ==============================
const lyrics = [
    "Meri tumhi se hai jawabdari, naraazgi bhi dher saari",
    "Tumhein harane ki zid mein, ye zindagi tumhee se haari",
    "Agar kabhi tumhein rulaya, kaha mujhe bhi chain aaya",
    "Asal men dil nahi tumhara, khud hee ka dukhaya",
    "Kya batau dard leke, kitni raahat hui hai mujhe",
    "Lag raha hai qayde se ab mohabbat hui hai mujhe"
];

const timings = [
    6200,
    5750,
    5000,
    3850,
    10000,
    5600
];

const audioUrl = "audio/QaydeSe1.mp3";

let currentIndex = 0;
let lyricTimeout = null;

let isPlaying = false;
let isFinished = false;

function initialize() {

    audioPlayer.src = audioUrl;

    renderLyrics();

    audioPlayer.addEventListener("loadedmetadata", () => {

        totalTimeLabel.textContent =
            formatTime(audioPlayer.duration);

    });

    audioPlayer.addEventListener("timeupdate", updateProgress);

    audioPlayer.addEventListener("ended", () => {

        clearTimeout(lyricTimeout);

        isPlaying = false;
        isFinished = true;

        playButton.textContent = "Replay";

        playButton.classList.remove("is-playing");

        progressBar.style.width = "100%";
        progressThumb.style.left = "100%";

    });

    progressContainer.addEventListener("click", seekAudio);
}

function renderLyrics() {

    lyricsContainer.innerHTML = "";

    lyrics.forEach(lyric => {

        const div = document.createElement("div");

        div.className = "lyric-line";

        div.textContent = lyric;

        lyricsContainer.appendChild(div);

    });

    updateLyrics();
}

function updateLyrics() {

    const lines = document.querySelectorAll(".lyric-line");

    lines.forEach(line => line.classList.remove("active"));

    if (lines[currentIndex]) {

        lines[currentIndex].classList.add("active");

        const lineHeight =
            lines[currentIndex].getBoundingClientRect().height;

        lyricsContainer.style.transform =
            `translateY(-${currentIndex * lineHeight}px)`;
    }
}

function scheduleLyrics() {

    if (!isPlaying) return;

    if (currentIndex >= lyrics.length - 1) return;

    lyricTimeout = setTimeout(() => {

        currentIndex++;

        updateLyrics();

        scheduleLyrics();

    }, timings[currentIndex]);
}

async function startPlaying() {

    if (isFinished) {

        currentIndex = 0;

        updateLyrics();

        audioPlayer.currentTime = 0;

        isFinished = false;
    }

    await audioPlayer.play();

    isPlaying = true;

    playButton.textContent = "Stop Playing";

    playButton.classList.add("is-playing");

    scheduleLyrics();
}

function stopPlaying() {

    audioPlayer.pause();

    clearTimeout(lyricTimeout);

    isPlaying = false;

    playButton.textContent = "Start Playing";

    playButton.classList.remove("is-playing");
}

playButton.addEventListener("click", async () => {

    if (isPlaying) {

        stopPlaying();

    } else {

        await startPlaying();

    }

});

function updateProgress() {

    if (!audioPlayer.duration) return;

    const percentage =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.style.width = percentage + "%";

    progressThumb.style.left = percentage + "%";

    currentTimeLabel.textContent =
        formatTime(audioPlayer.currentTime);
}

function seekAudio(event) {

    const rect =
        progressContainer.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const percentage =
        x / rect.width;

    audioPlayer.currentTime =
        percentage * audioPlayer.duration;

    updateProgress();
}

function formatTime(seconds) {

    if (isNaN(seconds))
        return "00:00";

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

initialize();