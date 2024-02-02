import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'
import useTabFromUrl from '../hooks/useTabFromUrl'

const Dashboard = () => {
  const tab = useTabFromUrl()

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSideBar />
      </div>
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard
