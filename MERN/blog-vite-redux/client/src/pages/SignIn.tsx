import axios from 'axios'
import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react'
import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import { login } from '../api'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../store/user/userSlice'
import {
  useDispatch,
  useSelector,
} from 'react-redux'

type FormData = {
  email: string
  password: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error: errorMessage } =
    useSelector((state: any) => state.user)

  const [formData, setFormData] =
    useState<FormData>({
      email: '',
      password: '',
    })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    dispatch(signInStart())
    if (!formData.email || !formData.password) {
      return dispatch(
        signInFailure('Please fill all fields')
      )
    }
    try {
      dispatch(signInStart())
      const res = await axios.post(
        login,
        formData,
        {
          withCredentials: true,
        }
      )

      if (res.status !== 200) {
        dispatch(signInFailure(res.data.message))
        alert(res.data.message)
      }

      if (res.status === 200) {
        dispatch(signInSuccess(res.data.user))
        alert('You have successfully logged in')
        navigate('/')
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link
            to='/'
            className='sm:text-xl font-bold dark:text-white text-4xl'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-pink-500 rounded-lg text-white'>
              My
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is demo project. You can register
            with your email and password or with
            Google
          </p>
        </div>
        <div className='flex-1'>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div></div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='email@email.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>
                    Loading...
                  </span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have no account?</span>
            <Link
              to='/sign-up'
              className='text-blue-500 hover:underline'
            >
              Register
            </Link>
          </div>
          {errorMessage && (
            <Alert
              className='mt-5'
              color='failure'
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn
