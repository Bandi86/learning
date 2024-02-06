import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, unique: true},
  content: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true},
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  category: { type: String, default: 'uncategorized' },
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

export default Post