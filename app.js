//const express = require('express')  // express를 import
import express from "express";
import morgan from "morgan";
//import logger from "morgan";         // logger라고 임의로 이름 붙인 것. nickname.
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import { userInfo } from "os";
//import { userRouter } from "./routers/userRouter"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();               // express를 app 변수를 선언해서 express를 실행

//allow function을 사용해서 표현
// const handleHome = (req, res) => res.send('Hello from home');
/*
function handleProfile(req, res){
    res.send("You are on my profile")
}                                               */


app.set("view engine", "pug");
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// app.get("/", handleHome);

// app.get("/profile", handleProfile);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;