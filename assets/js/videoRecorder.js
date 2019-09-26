const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;

const handleVideoData = event => {
  // console.log(event);
  const {data: videoFile} = event;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(videoFile);
  link.download = 'recorded.webm';
  document.body.appendChild(link);
  link.click(); // faking click (조작 클릭)
};

const stopRecording = () => {
  videoRecorder.stop();
  streamObject.getVideoTracks()[0].stop();
  recordBtn.removeEventListener('click', stopRecording);
  recordBtn.addEventListener('click', getVideo);
  recordBtn.innerHTML = 'Start recording';
};

const startRecording = () => {
  // console.log(streamObject);
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener('dataavailable', handleVideoData); // ondataavailable 이라는 이벤트를 제공하고 있기에 이렇게 사용 가능.
  // setTimeout(()=>videoRecorder.stop(),5000);  // 데이터는 레코딩이 끝났을 때, 한번에 저장됨. 때문에 타이머 함수로 종료를 해준 것.
  // console.log(videoRecorder);
  recordBtn.addEventListener('click', stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {width: 1280, height: 720},
    });
    // console.log(stream);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop recording';
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = 'Cant record';
  } finally {
    recordBtn.removeEventListener('click', getVideo);
  }
};

function init() {
  recordBtn.addEventListener('click', getVideo);
  // recordBtn.onclick = getVideo;
}

if (recorderContainer) {
  init();
}
