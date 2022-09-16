import React from 'react'
import Admin_data from './Admin_Data/Admin_data'

const Admin = () => {
  return (
    <div>
      <div>
       <svg style={{display:"none"}}>
        <symbol id="logo" viewBox="0 0 140 59">
        
        </symbol>
        <symbol id="down" viewBox="0 0 16 16">
            <polygon points="3.81 4.38 8 8.57 12.19 4.38 13.71 5.91 8 11.62 2.29 5.91 3.81 4.38" />
        </symbol>
        <symbol id="users" viewBox="0 0 16 16">
            <path
                d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,15a7,7,0,0,1-5.19-2.32,2.71,2.71,0,0,1,1.7-1,13.11,13.11,0,0,0,1.29-.28,2.32,2.32,0,0,0,.94-.34,1.17,1.17,0,0,0-.27-.7h0A3.61,3.61,0,0,1,5.15,7.49,3.18,3.18,0,0,1,8,4.07a3.18,3.18,0,0,1,2.86,3.42,3.6,3.6,0,0,1-1.32,2.88h0a1.13,1.13,0,0,0-.27.69,2.68,2.68,0,0,0,.93.31,10.81,10.81,0,0,0,1.28.23,2.63,2.63,0,0,1,1.78,1A7,7,0,0,1,8,15Z" />
        </symbol>
        <symbol id="trends" viewBox="0 0 16 16">
            <polygon
                points="0.64 11.85 -0.02 11.1 2.55 8.85 4.57 10.4 9.25 5.25 12.97 8.84 15.37 6.79 16.02 7.54 12.94 10.2 9.29 6.68 4.69 11.76 2.59 10.14 0.64 11.85" />
        </symbol>

    </svg>
    <header className="page-header">
        <nav>
            <ul>
                <a href="#0" aria-label="forecastr logo" className="logo">
                    <svg width="140" height="49">
                        <use xlinkHref="#logo"></use>
                    </svg>
                </a>
                <button className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
                    <svg width="20" height="20" aria-hidden="true">
                        <use xlinkHref="#down"></use>
                    </svg>
                </button>
                <ul className="admin-menu">
                    <li className="menu-heading">
                        <h3>Admin</h3>
                    </li>
                    <li>
                        <a href="#0">
                            <svg>
                                <use xlinkHref="#users"></use>
                            </svg>
                            <span>Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <svg>
                                <use xlinkHref="#trends"></use>
                            </svg>
                            <span>Transcations</span>
                        </a>
                    </li>
                </ul>
            </ul>
        </nav>
    </header>
    <section className="page-content">
        <section className="search-and-user">
            <div className="admin-profile">
                <span className="greeting">Hello admin</span>
                <div className="notifications">
                    <svg>
                        <use xlinkHref="#users"></use>
                    </svg>
                </div>
            </div>
        </section>
        <section className="grid">
           
            <article> </article>
        </section>
    </section>
    </div>
     </div>  
  
  )
}

export default Admin;
