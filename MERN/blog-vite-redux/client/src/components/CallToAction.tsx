import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className="flex flex-row justify-around border-2 p-4 mb-4 h-[20rem]">
      <div className='flex items-center justify-center flex-col'>
        <h2 className="text-2xl font-bold p-3 lg:text-3xl">
          Welcome to Blog!
        </h2>
        <p className="max-w-2xl mt-5">
          Join our community and start writing amazing blog posts today!
        </p>
        <div className="flex justify-center mt-5">
          <Link to="/register">
            <Button pill color="gray" size="md">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <img src="https://dummyimage.com/400x400" alt="Random Image" className='h-[18rem]' />
      </div>
    </div>
  )
}

export default CallToAction
