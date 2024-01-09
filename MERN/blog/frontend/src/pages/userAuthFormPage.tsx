import { BsGoogle } from 'react-icons/bs'
import InputBox from '../components/InputComponent'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/pageAnimation'
import { inputValidation } from '../validation/inputvalidation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface FormData {
  fullname: string
  email: string
  password: string
}

const UserAuthForm = ({ type }: { type: string }) => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
  })

  console.log(formData)

  const handleInputChange = (event: {
    target: { name: string; value: string }
  }) => {
    console.log(event.target.name, event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (type === 'sign-in') {
      const signInData = { email: formData.email, password: formData.password }
      inputValidation(
        type,
        formData.fullname,
        formData.email,
        formData.password
      )
      const res = await axios.post(
        'http://localhost:8000/auth/signin',
        signInData
      )
      if (res) {
        toast.success('Login success')
      }
    } else {
      inputValidation(
        type,
        formData.fullname,
        formData.email,
        formData.password
      )
      const res = await axios.post(
        'http://localhost:8000/auth/signup',
        formData
      )
      if (res) {
        toast.success('Signup success')
      }
    }
  }

  return (
    <AnimationWrapper keyvalue={type}>
      <section className='h-cover flex items-center justify-center'>
        <form className='w-[80%] max-w-[400px]' onSubmit={handleSubmitForm}>
          <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
            {type == 'sign-in' ? 'Wellcome back' : 'Join us today'}
          </h1>
          {type !== 'sign-in' ? (
            <InputBox
              name='fullname'
              type='text'
              id='fullname'
              placeholder='Full Name'
              value={formData.fullname}
              onChange={handleInputChange}
            />
          ) : (
            ''
          )}
          <InputBox
            name='email'
            type='email'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputBox
            name='password'
            type='password'
            id='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
          <button className='btn-dark w-full mt-8' type='submit'>
            {type.replace('-', ' ')}
          </button>
          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='w-1/2 border-black' />
            <p>or</p>
            <hr className='w-1/2 border-black' />
          </div>
          <button className='btn-dark flex items-center justify-center gap-4 w-[90%] center'>
            <BsGoogle className='text-2xl' />
            continue with google
          </button>
          {type === 'sign-in' ? (
            <p className='mt-6 text-dark-grey text-xl text-center'>
              Don't have an account?
              <Link to='/signup' className='underline text-black text-xl ml-1'>
                Sign up
              </Link>
            </p>
          ) : (
            <p className='mt-6 text-dark-grey text-xl text-center'>
              Already member?
              <Link to='/signin' className='underline text-black text-xl ml-1'>
                Login in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  )
}

export default UserAuthForm
