import { AiFillEye } from 'react-icons/ai'
import { useState } from 'react'
import {
  AiFillEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

interface InputBoxProps {
  name: string
  type: string
  id: string
  placeholder: string
  value?: string
  onChange?: (e: any) => void
}

const InputBox = ({ name, type, id, placeholder, value }: InputBoxProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className='relative w-[100%] mb-4'>
      <input
        name={name}
        type={
          type == 'password' ? (passwordVisible ? 'text' : 'password') : 'type'
        }
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        className='input-box'
      />
      {type === 'text' && <AiOutlineUser className='input-icon' />}
      {type === 'email' && <AiOutlineMail className='input-icon' />}
      {type === 'password' && (
        <div>
          <RiLockPasswordFill className='input-icon' />
          {passwordVisible ? (
            <AiFillEye
              className='input-icon left-[auto] right-4 cursor-pointer'
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          ) : (
            <AiFillEyeInvisible
              className='input-icon left-[auto] right-4 cursor-pointer'
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default InputBox
