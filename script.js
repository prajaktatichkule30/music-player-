alert("JavaScript Working!");
const songs = [
{
title: "Song 1",
artist: "Artist 1",
src: "song1.mp3"
},
{
title: "Song 2",
artist: "Artist 2",
src: "song2.mp3"
},
{
title: "Song 3",
artist: "Artist 3",
src: "song3.mp3"
}
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function loadSong(index){
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

loadSong(currentSong);

function playPause(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
}

function nextSong(){
    currentSong++;
    if(currentSong >= songs.length){
        currentSong = 0;
    }
    loadSong(currentSong);
    audio.play();
}

function prevSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    audio.play();
}

audio.addEventListener("timeupdate", () => {
    const progressPercent =
        (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent =
        formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    nextSong();
});

function formatTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

songs.forEach((song,index)=>{
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;

    li.addEventListener("click",()=>{
        currentSong = index;
        loadSong(currentSong);
        audio.play();
    });

    playlist.appendChild(li);
});