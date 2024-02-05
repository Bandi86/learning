import axios from 'axios'
import { logOut } from '../api'
import { useDispatch } from 'react-redux'
import { logoutStart, logoutFailure, logoutSuccess } from '../store/user/userSlice'

const useLogout = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      dispatch(logoutStart())
      const res = await axios.get(logOut, { withCredentials: true })
     
      if (res.status === 200) {
        dispatch(logoutSuccess())
      } else {
        dispatch(logoutFailure('Something went wrong'))
      }
    } catch (error: any) {
      dispatch(logoutFailure(error.message))
    }
  }

  return logout
}

export default useLogout
