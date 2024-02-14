import { useEffect, useState } from 'react'
import { Comment } from '../types/comment'
import axios from 'axios'
import { commentApi, userApi } from '../api'
import { User } from '../types/currentUser'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { Button, Textarea } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { UserRedux } from '../store/user/userSlice'

const CommentRender = ({
  comment,
  onLike,
  onEdit,
  onDelete
}: {
  comment: Comment
  onLike: any
  onEdit: any
  onDelete: any
}) => {
  const { currentUser } = useSelector((state: UserRedux) => state.user)

  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState<string | null>(comment.content)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${userApi}/${comment.userId}`)

        if (res.data.user) {
          setUser(res.data.user)
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    getUser()
  }, [comment])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(commentApi, comment._id, {
        withCredentials: true
      })
      if (res.status === 200) {
        setIsEditing(false)
        onEdit(comment, editedContent)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent || ''}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" size="sm" gradientDuoTone="purpleToBlue" onClick={handleSave}>
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  comment.likes &&
                  currentUser?._id &&
                  comment.likes.map((like) => like.userId).includes(currentUser._id)
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CommentRender
