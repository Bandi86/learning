import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import FooterComp from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/sign-up'
          element={<SignUp />}
        />
        <Route
          path='/sign-in'
          element={<SignIn />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
        </Route>
        <Route
          path='/projects'
          element={<Projects />}
        />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
