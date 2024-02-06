import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { UserRedux } from '../store/user/userSlice'

const AdminRoute = () => {
  const { currentUser } = useSelector(
    (state: UserRedux) => state.user
  )
  return currentUser && currentUser?.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />
}

export default AdminRoute
