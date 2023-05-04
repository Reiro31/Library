import { Link, NavLink, Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand link-light" to="/">
            E-books
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link link-primary" to="/login">
                  New Book
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link link-primary"
                  aria-current="page"
                  to="/library"
                >
                  Library
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-primary" to="/client">
                  Client
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default NavBar;
