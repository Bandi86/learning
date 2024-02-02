import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from 'firebase/auth'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { signInSuccess } from '../store/user/userSlice'

const OAuth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogle = async () => {
    // create a new instance of GoogleAuthProvider
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account',
    })
    try {
      const resultGoogle = await signInWithPopup(
        auth,
        provider
      )
      const data = {
        name: resultGoogle.user.displayName,
        email: resultGoogle.user.email,
        googlePhotoUrl:
          resultGoogle.user.photoURL,
      }

      const res = await axios.post(
        '/api/auth/google',
        data
      )

      if (
        res.status === 201 ||
        res.status === 200
      ) {
        dispatch(signInSuccess(res.data))
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogle}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  )
}

export default OAuth
