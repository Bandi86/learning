import { useSelector } from 'react-redux'
import { UserRedux } from '../store/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Modal, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { commentApi } from '../api'
import { Comment } from '../types/comment'
import CommentRender from './Comment'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const CommentSection = ({ postId }: { postId: string }) => {
  const { currentUser } = useSelector((state: UserRedux) => state.user)

  const navigate = useNavigate()

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [commentError, setCommentError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${commentApi}/${postId}`)
        if (res.data) {
          setComment('')
          setCommentError(null)
          setComments(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  }, [postId, refresh])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.length > 200) {
      return
    }

    try {
      const res = await axios.post(
        commentApi,
        { content: comment, postId, userId: currentUser?._id },
        { withCredentials: true }
      )
      if (res.status === 201) {
        setComment('')
        setCommentError(null)
        setRefresh(true)
      } else {
        setCommentError('Error submitting comment')
      }
    } catch (error: any) {
      setCommentError(error.message)
    }
  }

  const handleLike = async (commentId: string) => {
    try {
      if (!currentUser) {
        navigate('/login')
        return
      }
      const res = await axios.put(`${commentApi}/likeComment/${commentId}`, {
        withCredentials: true
      })

      if (res.status === 200) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.likes.length
                }
              : comment
          )
        )
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleEdit = async (comment: Comment, editedContent: string) => {
    setComments(comments.map((c) => (c._id === comment._id ? { ...c, content: editedContent } : c)))
    if (!refresh || refresh) setRefresh(true)
  }

  const handleDelete = async (commentId: string | null) => {
    setShowModal(false)
    try {
      if (!currentUser) {
        navigate('/login')
        return
      }
      const res = await axios.delete(`${commentApi}/${commentId}`, {
        withCredentials: true
      })
      if (res.status === 200) {
        setComments(comments.filter((comment) => comment._id !== commentId))
        if (!refresh || refresh) setRefresh(true)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <CommentRender
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId: string | null) => {
                setShowModal(true)
                setCommentToDelete(commentId)
              }}
            />
          ))}
        </>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CommentSection
