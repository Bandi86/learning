import { useSelector } from 'react-redux'
import { CurrentUser } from '../types/currentUser'
import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'

const DashProfile = () => {
  const { currentUser } = useSelector(
    (state: CurrentUser) => state.user
  )

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

  useEffect(() => {
    if (imageFile) uploadImage()
  }, [imageFile])

  const uploadImage = async () => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + (imageFile?.name || '')
    const storageRef = storage.ref(fileName)
    const uploadTask = uploadBytesResumable(
      storageRef,
      imageFile as Blob
    )
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadingProgress(progress.toFixed(0))
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        setImageFileUploadError(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setImageFileUrl(downloadURL)
            console.log('File available at', downloadURL)
          }
        )
      }
    )
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>
        Profile
      </h1>
      <form className='flex flex-col'>
        <input
          type='file'
          accept='image/*'
          id='profilePicture'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current?.click()}
        >
          <img
            src={imageFileUrl || currentUser?.data?.profilePicture}
            alt='profile picture'
            className='w-full h-full rounded-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser?.data?.username}
          className='my-5'
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser?.data?.email}
          className='my-5'
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          defaultValue={currentUser?.data?.password}
          className='my-5'
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className='text-red-500 cursor-pointer flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
