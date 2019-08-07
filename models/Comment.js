import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  } /* ,
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // comment와 video를 연결시키는 첫번째 방법.
  } */, // Comment에 연결된 Video ID를 주는 방법.
});

const model = mongoose.model('Comment', CommentSchema);
export default model;
