import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="header" id="header">
      <img src="https://www.svgrepo.com/show/190513/flowers-garden.svg" alt="" className="logo" />
      <ul className="nav" style={{ listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
      <button 
        onClick={handleLogout} 
        className="btn btn-outline-danger"
        style={{ marginLeft: '1rem' }}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
