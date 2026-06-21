import { Link } from 'react-router-dom'
import './PageNotFound.css'

const PageNotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>This corner of the grid doesn't exist.</p>
    <Link to="/" className="not-found__link">Back to the Plaza</Link>
  </div>
)

export default PageNotFound
