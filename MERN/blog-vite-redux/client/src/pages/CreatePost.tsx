import { getApp } from 'firebase/app'
import {
  getDownloadURL,
  ref as storageRef,
  getStorage,
  uploadBytesResumable
} from 'firebase/storage'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios'
import { postApi } from '../api'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const app = getApp()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'uncategorized',
    image: ''
  })

  const [file, setFile] = useState<File | null>(null)

  const [imageUploadProgress, setImageFileUploadingProgress] = useState<number | null>(null)
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null)
  const [imageUploadError, setImageFileUploadError] = useState<string | null>(null)
  const [publishError, setPublishError] = useState<string | null>(null)

  useEffect(() => {
    if (file) handleUploadImage()
  }, [file])

  const handleUploadImage = async () => {
    try {
      if (!file) return
      const storage = getStorage(app)
      const fileName = new Date().getTime() + '-' + (file?.name || '')
      const storageReference = storageRef(storage, 'images/post' + fileName)
      const uploadTask = uploadBytesResumable(storageReference, file as Blob)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageFileUploadingProgress(Number(progress.toFixed(0)))
          //console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          setImageFileUploadError(error.message)
          setImageFileUploadingProgress(null)
          setFile(null)
          setImageFileUrl(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL)
            //console.log('File available at', downloadURL)
            setFormData({ ...formData, image: downloadURL })
            setImageFileUploadingProgress(100)
          })
        }
      )
    } catch (error) {
      setImageFileUploadError('Something went wrong')
      setImageFileUploadingProgress(null)
      setFile(null)
      setImageFileUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(postApi, formData, { withCredentials: true })
      if (res.status !== 201) {
        setPublishError(res.data.message)
      } else if (res.status === 201) {
        setPublishError(null)
        navigate(`/post/${res.data.slug}`)
      }
    } catch (error: any) {
      setPublishError('Something went wrong')
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} id="create-post">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            autoComplete="on"
          />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            typeof="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress === 100 || !file}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value })
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  )
}

export default CreatePost
