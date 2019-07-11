import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest: "uploads/video/"}); // dest: "uploads/video/" -> destination을 적은 것. (server에 있는) 프로젝트 folder안 (uploads/video/)에 Upload함.
                                                        // "/uploads/video/" 이렇게 적으면 프로젝트 폴더 안이 아닌 root에서 upload를 만들게 됨.
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.user = {             // 실제 사용자 정보가 있으면 대체될 임시 코드.
        isAuthenticated: true,
        id: 1
    };          
    next();                 // app.js에서 코드 사이에 위치. 때문에 next를 호출해야 함. 다음 함수로 넘어가기 위함.
};

// local에 로컬 변수를 저장하면, 이 변수들을 템플릿에서 사용 할 수 있음.
// 전역적으로 사용할 수 있는 변수를 추가. 'views' folder 안에 있는 템플릿들 전부에서 사용 가능.

export const uploadVideo = multerVideo.single("videoFile");  // 여기서 single은 오직 하나의 파일만 Upload할 수 있는 걸 의미. 
                                                             // "videoFile"은 Name part로 여기 들어올 파일의 Name. | upload.pug 에서 설정한 것.
//-> videoRouter.js에서 import 후 사용.