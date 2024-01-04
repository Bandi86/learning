import { BsGoogle } from 'react-icons/bs'
import InputBox from '../components/InputComponent'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/pageAnimation'

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

  return (
    <AnimationWrapper keyvalue={type}>
      <section className='h-cover flex items-center justify-center'>
        <form className='w-[80%] max-w-[400px]'>
          <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
            {type == 'sign-in' ? 'Wellcome back' : 'Join us today'}
          </h1>
          {type !== 'sign-in' ? (
            <InputBox
              name='fullname'
              id='name'
              type='text'
              placeholder='Full Name'
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              value={formData.fullname}
            />
          ) : (
            ''
          )}
          <InputBox
            name='email'
            type='email'
            placeholder='Email'
            id='email'
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
          <InputBox
            name='password'
            type='password'
            placeholder='Password'
            id='password'
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
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
