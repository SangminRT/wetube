import express from 'express';
import routes from '../routes';
import {users, userDetail, editProfile, changePassword} from '../controllers/userController';
import {onlyPrivate} from '../middlewares';

// export const userRouter = express.Router();
const userRouter = express.Router();

// userRouter.get("/",(req,res) => res.send('user index'));
// userRouter.get("/edit",(req,res) => res.send('user edit'));
// userRouter.get("/password",(req,res) => res.send('user password'));

userRouter.get('/', users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); // 이 순서로 해야 /edit-profile을 :id로 인식 안하고 제대로 보여줌. routes.js 파일 참고

export default userRouter;
