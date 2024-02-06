import { Sidebar } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiUser,
} from 'react-icons/hi'
import useTabFromUrl from '../hooks/useTabFromUrl'
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const DashSideBar = () => {
  const tab = useTabFromUrl()
  const logout = useLogout()

  const handleLogoutClick = () => {
    logout()
  }

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              className='flex items-center space-x-2'
              active={tab === 'profile'}
              icon={HiUser}
              label={'User'}
              labelColor='dark'
              as='div'
            >
              <span>Profile</span>
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=sign-out'>
            <Sidebar.Item
              className='flex items-center space-x-2 cursor-pointer'
              icon={HiArrowSmRight}
              as='div'
              onClick={handleLogoutClick}
            >
              <span>Sign Out</span>
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
