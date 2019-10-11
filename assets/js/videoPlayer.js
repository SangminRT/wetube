const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
// let videoPlayer;
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');
const setPlayTime = document.getElementById('jsSetPlaytime');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  fetch(`/api/${videoId}/view`, {
    method: 'POST',
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    if (volumeRange.value >= 0.6) {
      volumeBtn.innerHTML = '<i class = "fas fa-volume-up"></i>';
    } else if (volumeRange.value >= 0.3) {
      volumeBtn.innerHTML = '<i class = "fas fa-volume-down"></i>';
    } else if (volumeRange.value > 0) {
      volumeBtn.innerHTML = '<i class = "fas fa-volume-off"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.removeEventListener('click', exitFullScreen);
  fullScrnBtn.addEventListener('click', goFullScreen);
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener('click', goFullScreen);
  fullScrnBtn.addEventListener('click', exitFullScreen);
}

const formatData = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${hours}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatData(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatData(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: {value},
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class = "fas fa-volume-up"></i>';
  } else if (value >= 0.3) {
    volumeBtn.innerHTML = '<i class = "fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class = "fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class = "fas fa-volume-mute"></i>';
  }
}

function controlPlayTime(event) {
  const {
    target: {value},
  } = event;
  videoPlayer.currentTime = videoPlayer.duration * value;
}

function forInitializeTime() {
  setPlayTime.value = videoPlayer.currentTime / videoPlayer.duration;
}

function init() {
  // videoPlayer = videoContainer.querySelector(video);
  setInterval(forInitializeTime, 1000);
  videoPlayer.volume = 0.5;
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScrnBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('loadedmetadata', setTotalTime);
  videoPlayer.addEventListener('ended', handleEnded);
  volumeRange.addEventListener('input', handleDrag);
  setPlayTime.addEventListener('input', controlPlayTime);
}

if (videoContainer) {
  init();
}
