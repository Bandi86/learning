import { Button, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { Post } from '../types/post'
import { postApi } from '../api'
import axios from 'axios'

type SideBarData = {
  searchTerm: string
  sort: string
  category: string
}

const Search = () => {
  const [sidebarData, setSidebarData] = useState<SideBarData>({
    searchTerm: '',
    sort: '',
    category: ''
  })

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const sortFromUrl = urlParams.get('sort')
    const categoryFromUrl = urlParams.get('category')
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || '',
        category: categoryFromUrl || ''
      }))
    }

    const fetchPosts = async () => {
      setLoading(true)
      const searchQuery = URLSearchParams.toString()
      try {
        const res = await axios.get(`${postApi}?${searchQuery}`)
        if (res.status !== 200) {
          setLoading(false)
          return
        } else {
          setPosts(res.data.posts)
          setLoading(false)
          if (res.data.posts.length === 9) {
            setShowMore(true)
          } else {
            setShowMore(false)
          }
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchPosts()
  }, [location.search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc'
      setSidebarData({ ...sidebarData, sort: order })
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized'
      setSidebarData({ ...sidebarData, category })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    if (sidebarData.searchTerm) urlParams.set('searchTerm', sidebarData.searchTerm)
    if (sidebarData.sort) urlParams.set('sort', sidebarData.sort)
    if (sidebarData.category) urlParams.set('category', sidebarData.category)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex.toLocaleString())
    const searchQuery = urlParams.toString()
    const res = await axios.get(`${postApi}?${searchQuery}`)
    if (res.status !== 200) {
      return
    } else {
      setPosts([...posts, res.data.posts])
      if (res.data.posts.length === 9) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={() => handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select onChange={() => handleChange} value={sidebarData.category} id="category">
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
