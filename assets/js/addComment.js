import axious from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li); // prepend는 객체를 앞에 추가해 줌. 만약 append를 사용한다면 뒤에 추가 됨.
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axious({
    url: `/api/${videoId}/comment`,
    method: 'POST', // POST, It sends a request with some data.
    data: {
      comment, // videoController.js 파일 참고.
    }, // request/comment를 보내면 comment라는 body에 들어감.
  });
  // console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
