import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

// export const userRouter = express.Router();
const userRouter = express.Router();

// userRouter.get("/",(req,res) => res.send('user index'));
// userRouter.get("/edit",(req,res) => res.send('user edit'));
// userRouter.get("/password",(req,res) => res.send('user password'));

userRouter.get("/",users);
userRouter.get(userDetail,userDetail);
userRouter.get(editProfile,editProfile);
userRouter.get(changePassword,changePassword);

export default userRouter;