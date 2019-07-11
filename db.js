import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();        //dontenv.config라는 함수로 .env 파일 안에 있는 정보를 불러올 수 있음.
                        // 그리고 찾은 모든 variable들을 process.env.key에 저장

mongoose.connect(
    //"mongodb://localhost:27017/we-tube",
    process.env.MONGO_URL,
    {
        useNewUrlParser: true, 
        useFindAndModify: false
    }
);      //새로운 버전의 Mongoose는 이런 식으로 Configuration을 보낼 수 있다.

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.once("error", handleError);

/* 임시 가짜 데이터
export const videos = [
    {
        id: 324516,
        title: 'Video awesome',
        description: 'This is something I love',
        views: 24,
        videoFile:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/485050/movie.mp4",
        creator: {
            id:613,
            name:"Sangmin",
            email:"sangmin613@gmail.com"
        }
    }
]                                                                               */
