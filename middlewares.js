import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    next();                 // app.js에서 코드 사이에 위치. 때문에 next를 호출해야 함. 다음 함수로 넘어가기 위함.
};

// local에 로컬 변수를 저장하면, 이 변수들을 템플릿에서 사용 할 수 있음.
// 전역적으로 사용할 수 있는 변수를 추가. 'views' folder 안에 있는 템플릿들 전부에서 사용 가능.