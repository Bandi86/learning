import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'
import useTabFromUrl from '../hooks/useTabFromUrl'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComp from '../components/Dashboard'

const Dashboard = () => {
  const tab = useTabFromUrl()

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts />}
      {tab === 'users' && <DashUsers />}
      {tab === 'comments' && <DashComments />}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard
