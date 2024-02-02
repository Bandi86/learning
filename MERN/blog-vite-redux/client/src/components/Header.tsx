import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
} from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import {
  Link,
  useLocation,
} from 'react-router-dom'
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import { toggleTheme } from '../store/theme/themeSlice'
import { Theme } from './ThemeProvider'
import { CurrentUser } from '../types/currentUser'

const Header = () => {
  const path = useLocation().pathname
  const dispatch = useDispatch()
  const { currentUser } = useSelector(
    (state: CurrentUser) => state.user
  )

  const { theme } = useSelector(
    (state: Theme) => state.theme
  )

  const handleSignOut = () => {}

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-pink-500 rounded-lg text-white'>
          My
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button
        className='w-12 h-10'
        color='gray'
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-6 items-center md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={
                  currentUser.data.profilePicture
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <div className='flex flex-col justify-center'>
                <span className='block text-sm font-medium truncate'>
                  {currentUser.data.username}
                </span>

                <span className='block text-sm font-medium truncate'>
                  {currentUser.data.email}
                </span>
              </div>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleSignOut}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              gradientDuoTone='purpleToBlue'
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === '/'}
          as={'div'}
        >
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === '/about'}
          as={'div'}
        >
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === '/projects'}
          as={'div'}
        >
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
