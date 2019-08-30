// 비디오들의 형태를 정의
import mongoose from "mongoose";

//model은 document name, 실제 data |  schema는 형태.
const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type: String,       //bytes를 저장하는게 아니라, 비디오의 link를 집어 넣는 거.  Video의 주소를 입력.
        required: "File URL is required"                                    // 서버(Amazon)에 Video를 저장
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{                                        // video와 comments를 연결 시키는 두번째 방법
        type: mongoose.Schema.Types.ObjectId,           // 모든 Comment ID들을 array로 video에 집어 넣기.
        ref: "Comment"                                  // Video와 연결된 Comment들의 ID가 저장 됨. 
    }]
});

//definition을 통해 실제 document를 생성. schema가 definition 같은 것.
const model = mongoose.model("Video", VideoSchema);
export default model;