import "./db"
import app from "./app";        // When I do import X from "./Y" is because I want to use X for something.
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";    // Just import the files because I want to make the DB connection aware that my models exist (but I'm not gonna do anything with them.)
import "./models/Comment";

const PORT = process.env.PORT || 4000; // .env 폴더 안의 PORT를 찾고 못찾으면, 4000을 사용.

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
