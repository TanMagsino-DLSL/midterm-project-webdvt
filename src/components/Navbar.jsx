import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Budget<span>Tracker</span></div>
      <div className="navbar-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/add">Add a Transaction</NavLink>
        <NavLink to="/summary">Summary</NavLink>
      </div>
    </nav>
  )
}

export default Navbar