import { useSelector } from 'react-redux'
import {
  Outlet,
  Navigate,
} from 'react-router-dom'
import { CurrentUser } from '../types/currentUser'

const PrivateRoute = () => {
  const { currentUser } = useSelector(
    (state: CurrentUser) => state.user
  )
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  )
}

export default PrivateRoute
