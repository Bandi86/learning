import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQm8G1rxa4rqE70Ct9IguIiiVRjpdn0vHKSafiMHnew&s'
    },
    slug: { type: String, required: true, unique: true },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    category: { type: String, default: 'uncategorized' }
  },
  { timestamps: true }
)

const Post = mongoose.model('post', postSchema)

export default Post