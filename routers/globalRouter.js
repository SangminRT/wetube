import express from 'express';
import routes from '../routes';
import {home, search} from '../controllers/videoController';
import {getJoin, logout, postJoin, getLogin, postLogin} from '../controllers/userController';
import {onlyPublic, onlyPrivate} from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
// middleware가 정보를 다음 것으로 넘겨줌. postJoin은 이메일, 패스워드 등 정보들을 받아서 사용자를 가입시키고,
// 같은 정보를 받아서 postLogin은 사용자를 로그인 시켜줌.

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
