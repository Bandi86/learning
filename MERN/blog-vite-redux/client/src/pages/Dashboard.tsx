import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'
import useTabFromUrl from '../hooks/useTabFromUrl'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'

const Dashboard = () => {
  const tab = useTabFromUrl()

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSideBar />
      </div>
      { tab === 'profile' && <DashProfile /> }
      { tab === 'posts' && <DashPosts /> }
      { tab == 'users' && <DashUsers /> }
    </div>
  )
}

export default Dashboard
