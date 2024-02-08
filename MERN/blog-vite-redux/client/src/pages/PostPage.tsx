import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { postApi } from '../api'
import { Post } from '../types/post'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'

const PostPage = () => {
  const { postSlug } = useParams<{ postSlug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${postApi}?slug=${postSlug}`)
        if (!res.data.posts) {
          setPost(null)
        } else if (res.data.posts.length >= 1) {
          setPost(res.data.posts[0])
        }
      } catch (error) {
        console.log(error)
        setError('Error fetching post')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [postSlug])

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'><Spinner size="xl" /></div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>
  }

  if (!post) {
    return <div className="flex justify-center items-center min-h-screen">Post not found</div>
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-bold mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl'>{post.title}</h1>
      <Link to={`/search?category=${post.category}`} className='self-center mt-5'>
        <Button className='mt-5' pill color='gray' size='xs'>{post.category}</Button>
      </Link>
      <img src={post.image} alt={post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{(post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div dangerouslySetInnerHTML={{__html: post.content}} className='p-3 max-w-2xl mx-auto w-full post-content'>

      </div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
    </main>
  );
}

export default PostPage
