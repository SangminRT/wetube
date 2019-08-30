//const express = require('express')  // express를 import
import express from "express";
import morgan from "morgan";
//import logger from "morgan";         // logger라고 임의로 이름 붙인 것. nickname.
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import { userInfo } from "os";
const app = express()               // express를 app 변수를 선언해서 express를 실행

const PORT = 4000;
/*
//respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world')
})
*/
const handleListening = () => {
    console.log(`Linstening on: http://localhost:${PORT}`);
}
/*
function handleListening() {
    console.log("Listening on: http://lacalhost:4000");
}
*/

/*
function handleHome(req, res){
    //console.log(req);
    res.send('Hello from home')
} */
//allow function을 사용해서 표현
const handleHome = (req, res) => res.send('Hello from home');

function handleProfile(req, res){
    res.send("You are on my profile")
}

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
};

// app.use(betweenHome);       //middleware를 아래의 보는 route에 대해 작동하도록 전역으로 설정한 것.
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

//app.use(betweenHome);     //여기에 위치하면 작동 X. 코드 작성의 순서도 중요하다. 위에서 아래 순서로 작동.

app.listen(PORT, handleListening);