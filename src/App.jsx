import './App.css'
import { useRoutes, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import LocationDetails from './pages/LocationDetails'
import AllEvents from './pages/AllEvents'
import PageNotFound from './pages/PageNotFound'

const App = () => {
  const element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/locations/:id', element: <LocationDetails /> },
    { path: '/events', element: <AllEvents /> },
    { path: '/*', element: <PageNotFound /> },
  ])

  return (
    <div className="App">
      <header className="site-header">
        <div className="header-container">
          <Link to="/" className="brand">
            <span className="brand__mark">⬡</span>
            <span className="brand__name">Nexus<span>Plaza</span></span>
          </Link>
          <nav className="site-nav">
            <NavLink to="/" end>Plaza</NavLink>
            <NavLink to="/events">All Events</NavLink>
          </nav>
        </div>
      </header>

      <main>{element}</main>

      <footer className="site-footer">
        <p>Nexus Plaza · a virtual community space</p>
      </footer>
    </div>
  )
}

export default App
