import { Like } from './like'

export type Comment = {
  _id: string | null
  postId: string | null
  userId: string | null
  content: string | null
  likes: Like[] | null
  numberOfLikes: number
  createdAt: Date | null
  updatedAt: Date | null
}
