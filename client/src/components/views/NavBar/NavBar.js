import React from 'react';

function NavBar(){
  return(
    <div>
      NavBar
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar;