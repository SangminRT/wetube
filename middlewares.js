import multer from 'multer';
import routes from './routes';

const multerVideo = multer({dest: 'uploads/video/'}); // dest: "uploads/video/" -> destination을 적은 것. (server에 있는) 프로젝트 folder안 (uploads/video/)에 Upload함.
// "/uploads/video/" 이렇게 적으면 프로젝트 폴더 안이 아닌 root에서 upload를 만들게 됨.
const multerAvatar = multer({dest: 'uploads/avatar/'});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // user가 존재하거나, 존재하지 않다면 비어있는 object를 주도록 {} => but, 이렇게 되면 항상 true이기 때문에 빈객체 {}를 나중에 null로 변경.
  // passport가 사용자를 로그인 시킬 때, passport는 쿠키나 serialize, deserialize 등의 기능을 다 지원해줌은 물론이고, user가 담긴 object를 요청(request)에도 올려줄 것이기 때문에 가능.
  next(); // app.js에서 코드 사이에 위치. 때문에 next를 호출해야 함. 다음 함수로 넘어가기 위함.
};

// local에 로컬 변수를 저장하면, 이 변수들을 템플릿에서 사용 할 수 있음.
// 전역적으로 사용할 수 있는 변수를 추가. 'views' folder 안에 있는 템플릿들 전부에서 사용 가능.

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single('videoFile'); // 여기서 single은 오직 하나의 파일만 Upload할 수 있는 걸 의미.
// "videoFile"은 Name part로 여기 들어올 파일의 Name. | upload.pug 에서 설정한 것.
// -> videoRouter.js에서 import 후 사용.
export const uploadAvatar = multerAvatar.single('avatar'); // 여기서 'avatar'은 editProfile.pug 파일 안의 .fileUpload 부분 input name 확인.
