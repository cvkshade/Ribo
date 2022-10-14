let nowPlaying = document.querySelector(".now-playing");
let albumArt = document.querySelector(".album-art");
let songName = document.querySelector(".song-name");
let artist = document.querySelector(".track-artist");

// Sliders Declaration

let currentTime = document.querySelector(".current-time");
let seekSlider = document.querySelector(".seek_slider");
let totalDuration = document.querySelector(".total-duration");
let volumeSlider = document.querySelector(".volume_slider");

// Buttons

let playPauseTrack = document.querySelector(".play-pause-track");
let prev_Track = document.querySelector(".prev-track");
let next_Track = document.querySelector(".next-track");
let shuffleTrack = document.querySelector(".shuffle-track");
let repeatTrack = document.querySelector(".repeat-track");

// Logic Control

let trackNum = 0;
let isPlaying = false;
let timeUpdate;
// The Audio Player
let currentTrack = document.createElement('audio');
// Track List

let track_list = [
  {
    name: "Bang Bang",
    artist: "LDrez x Jaredo",
    image: "./media/cover.jpg",
    path: "./media/Bang Bang.jpg"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "Image URL",
    path: "Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "Image URL",
    path: "Shipping_Lanes.mp3",
  },
];


function loadTrack(trackNum) {
  // Clear the previous seek timer
  clearInterval(timeUpdate);
  resetValues();
  
  // Load a new track
  currentTrack.src = track_list[trackNum].path;
  currentTrack.load();
  
  // Update details of the track
  albumArt.style.backgroundImage = "url(" + track_list[trackNum].image + ")";
  songName.textContent = track_list[trackNum].name;
  trackArtist.textContent = track_list[trackNum].artist;
  nowPlaying.textContent = "PLAYING " + (trackNum + 1) + " OF " + track_list.length;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  timeUpdate = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  currenttrack.addEventListener("ended", nextTrack);
  
  }

  // Function to reset all values to their default
function resetValues() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

//  Play Pause Track

function playpauseTrack(){
  if(!isPlaying) playTrack();
  else pauseTrack();
}

// Play Loaded Track

function playTrack(){
  currentTrack.play();
  isPlaying = true;
  playpauseTrack.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (trackNum < track_list.length - 1)
    trackNum += 1;
  else trackNum = 0;
 
  loadTrack(trackNum);
  playTrack();
}
 
function prevTrack() {
  if (trackNum > 0)
    trackNum -= 1;
  else trackNum = track_list.length - 1;
   
  loadTrack(trackNum);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = currentTrack.duration * (seekSlider.value / 100);
  
  // Set the current track position to the calculated seek position
  currentTrack.currentTime = seekto;
  }
  
  function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  currentTrack.volume = volumeSlider.value / 100;
  }
  
  function seekUpdate() {
  let seekPosition = 0;
  
  // Check if the current track duration is a legible number
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currenttrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;
  
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
  }

  loadTrack(track_list);
  
  