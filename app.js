//const express = require('express')  // express를 import
import express from "express";
import morgan from "morgan";
//import logger from "morgan";         // logger라고 임의로 이름 붙인 것. nickname.
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import { userInfo } from "os";
import { localsMiddleware } from "./middlewares";
//import { userRouter } from "./routers/userRouter"
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();               // express를 app 변수를 선언해서 express를 실행

//allow function을 사용해서 표현
// const handleHome = (req, res) => res.send('Hello from home');
/*
function handleProfile(req, res){
    res.send("You are on my profile")
}                                               */

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(localsMiddleware);                               // local변수에 접근하기 위함. 전역에서 사용하기 위함.

// app.get("/", handleHome);

// app.get("/profile", handleProfile);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;