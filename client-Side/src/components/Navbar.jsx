import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthProvider';
import { FaBell } from 'react-icons/fa';
import Notifications from './Notifications';

export default function Navbar() {
  const { isAuthenticated, notifications, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const toggleNotif = () => setNotifOpen((prev) => !prev);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbarIn">
        <p
          style={{
            color: '#ece1a1',
            fontSize: '28px',
            fontWeight: 'bold',
            margin: 0,
            fontFamily: 'Arial, sans-serif',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, color 0.3s ease',
          }}
          onClick={() => navigate('/home')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = '#ece1a1';
          }}
        >
          CineStream
        </p>
        <div className="navbar2">
          <ul className="navbarList">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li style={{ position: 'relative' }}>
              {isAuthenticated && (
                <span
                  className="notification-icon"
                  onClick={toggleNotif}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  <FaBell size={20} />
                  {notifications?.length > 0 && (
                    <span
                      className="notification-count"
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        fontSize: '10px',
                        background: 'red',
                        color: '#fff',
                        borderRadius: '50%',
                        padding: '2px 5px',
                      }}
                    >
                      {notifications.length}
                    </span>
                  )}
                </span>
              )}
              {isAuthenticated ? (
                <>
                  <Link to="/moviespage">
                    <button>Go to Movies</button>
                  </Link>
                  <button className="logout-button" onClick={handleLogout} style={{marginLeft:'8px'}}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <button className="button1">Login</button>
                  </Link>
                </>
              )}
              <Notifications open={notifOpen} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
