import { useSelector } from 'react-redux'
import {
  Outlet,
  Navigate,
} from 'react-router-dom'
import { UserRedux } from '../store/user/userSlice'


const PrivateRoute = () => {
  const { currentUser } = useSelector(
    (state: UserRedux) => state.user
  )
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  )
}

export default PrivateRoute
