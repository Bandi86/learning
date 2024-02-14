import { useEffect, useState } from 'react'
import { User } from '../types/currentUser'
import { Comment } from '../types/comment'
import { Post } from '../types/post'
import { useSelector } from 'react-redux'
import { UserRedux } from '../store/user/userSlice'
import { commentApi, postApi, userApi } from '../api'
import axios from 'axios'

const DashboardComp = () => {
  const { currentUser } = useSelector(
    (state: UserRedux) => state.user
  )

  const [users, setUsers] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [totalUsers, setTotalUsers] = useState<Number>(0)
  const [totalPosts, setTotalPosts] = useState<Number>(0)
  const [totalComments, setTotalComments] = useState<Number>(0)
  const [lastMonthUsers, setLastMonthUsers] = useState<Number>(0)
  const [lastMonthPosts, setLastMonthPosts] = useState<Number>(0)
  const [lastMonthComments, setLastMonthComments] =
    useState<Number>(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${userApi}?limit=5`)
        if (res.status === 200) {
          setUsers(res.data.users)
          setTotalUsers(res.data.totalUsers)
          setLastMonthUsers(res.data.lastMonthUsers)
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${postApi}?limit=5`)
        if (res.status === 200) {
          setPosts(res.data.posts)
          setTotalPosts(res.data.totalPosts)
          setLastMonthPosts(res.data.lastMonthPosts)
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${commentApi}?limit=5`)
        if (res.status === 200) {
          setComments(res.data.comments)
          setTotalComments(res.data.totalComments)
          setLastMonthComments(res.data.lastMonthComments)
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }

    if (currentUser?.isAdmin) {
      fetchUsers()
      fetchPosts()
      fetchComments()
    }
  }, [currentUser])

  return <div>Comp</div>
}

export default DashboardComp
