import React from 'react'

const User = () => {
  return (
    <div> 
       <div class="menu-wrap">
      <input type="checkbox" class="toggler" />
      <div class="hamburger"><div></div></div>
      <div class="menu">
        <div>
          <div>
            <ul>
              <li><a href="/user">Home</a></li>
              <li><a href="/transcations">transcations</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <header class="showcase">
      <div class="container-user showcase-inner">
        <h1>Welcome</h1>
        <p>
          hello User
        </p>
      </div>
    </header>
    </div>
  )
}

export default User
