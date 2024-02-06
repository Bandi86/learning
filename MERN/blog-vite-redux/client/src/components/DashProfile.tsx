import { useSelector } from 'react-redux'
import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
} from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {
  getDownloadURL,
  ref as storageRef,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios'
import { userApi } from '../api'
import {
  updateStart,
  updateFailure,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  UserRedux,
} from '../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import useLogout from '../hooks/useLogout'
import { Link } from 'react-router-dom'

const DashProfile = () => {
  const dispatch = useDispatch()
  const logout = useLogout()

  const { currentUser, error, loading } = useSelector(
    (state: UserRedux) => state.user
  )
  const _id = currentUser?._id

  const filePickerRef = useRef<HTMLInputElement>(null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(
    null
  )
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState<number | null>(null)
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null)
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: currentUser?.password || '',
    profilePicture: currentUser?.profilePicture || '',
  })

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (imageFile) uploadImage()
  }, [imageFile])

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const uploadImage = async () => {
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + (imageFile?.name || '')
    const storageReference = storageRef(storage, 'images/avatar' + fileName)
    const uploadTask = uploadBytesResumable(
      storageReference,
      imageFile as Blob
    )
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadingProgress(Number(progress.toFixed(0)))
        //console.log('Upload is ' + progress + '% done')
      },
      error => {
        setImageFileUploadError(error.message)
        setImageFileUploadingProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageFileUrl(downloadURL)
          //console.log('File available at', downloadURL)
          setFormData({ ...formData, profilePicture: downloadURL })
          setImageFileUploadingProgress(100)
        })
      }
    )
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!currentUser?._id) return
    if (Object.keys(formData).length === 0) return
    if (imageFileUploadingProgress !== 100) return
    try {
      dispatch(updateStart(formData))
      const res = await axios.patch(`${userApi}/${_id}, ${formData}`)
      console.log(res)
      if (res.status !== 200) {
        dispatch(updateFailure(res.statusText))
      } else {
        dispatch(updateStart(res.data))
      }
    } catch (error: any) {
      dispatch(updateFailure(error.message))
    }
  }

  const deleteAccount = async (_id: string) => {
    showModal ? setShowModal(false) : setShowModal(true)
    dispatch(deleteStart())
    try {
      const res = await axios.delete(`${userApi}/${_id}`)
      if (res.status === 200) {
        setShowModal(false)
        dispatch(deleteSuccess())
      } else {
        dispatch(deleteFailure(res.statusText))
      }
    } catch (error: any) {
      dispatch(deleteFailure(error.message))
    }
  }

  const handleLogoutClick = () => {
    logout()
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>
        Profile
      </h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          id='profilePicture'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadingProgress && (
            <div className='absolute w-full h-full flex items-center justify-center top-0 left-0'>
              <CircularProgressbar
                value={imageFileUploadingProgress}
                text={`${imageFileUploadingProgress}%`}
              />
            </div>
          )}
          <img
            src={imageFileUrl || currentUser?.profilePicture}
            alt='profile picture'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={imageFileUploadError} />
        )}
        <Label htmlFor='username' className='mt-5'>
          Username
        </Label>
        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          value={formData.username}
          className='my-5'
          onChange={e =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <Label htmlFor='email' className='mt-5'>
          Email
        </Label>
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          value={formData.email}
          className='my-5'
          onChange={e =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <Label htmlFor='password' className='mt-5'>
          Password
        </Label>
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          value={formData.password}
          className='my-5'
          onChange={e =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading}
          className='my-5'
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser?.isAdmin && (
          <Link to='/create-post'>
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              outline
              className='my-5 text-center w-full'
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 cursor-pointer flex justify-between mt-5'>
        <span
          className='cursor-pointer'
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>
        <span className='cursor-pointer' onClick={handleLogoutClick}>
          Sign Out
        </span>
      </div>
      {error && <Alert color='failure'>{error}</Alert>}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => deleteAccount(_id ?? '')}
              >
                Yes, I'm sure
              </Button>
              <Button
                color='gray'
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile
