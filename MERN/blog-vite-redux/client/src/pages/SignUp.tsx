import axios from 'axios'
import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../api'
import { useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

type FormData = {
  username: string
  email: string
  password: string
}

const SignUp = () => {
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState<FormData>({
      username: '',
      email: '',
      password: '',
    })

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null)

  const [loading, setLoading] = useState(false)

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
    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return setErrorMessage(
        'Please fill all fields'
      )
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await axios.post(
        register,
        formData
      )
      console.log(res)
      setLoading(false)
      if (res.data.success === false)
        return setErrorMessage(res.data.message)

      if (res.status === 201) {
        alert('You have successfully registered')
        navigate('/sign-in')
      }
    } catch (error: any) {
      setErrorMessage(error.message)
      setLoading(false)
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
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='username'
                id='username'
                onChange={handleChange}
              />
            </div>
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
                <span>Sign Up</span>
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link
              to='/sign-in'
              className='text-blue-500 hover:underline'
            >
              Login
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

export default SignUp
