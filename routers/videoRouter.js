import express from "express";
import routes from "../routes"
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();
videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload,uploadVideo,postUpload); // server에 있는 folder(video/)에 Upload함. -> 그 뒤 postUpload라는 function은 해당 file에 접근 (file이 아닌 URL 방식으로)

videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.editVideo,editVideo);
videoRouter.get(routes.deleteVideo,deleteVideo);

export default videoRouter;

// A router is in charge of mapping URLS with Controller Functions.