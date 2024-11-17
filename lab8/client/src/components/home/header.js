import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header" id="header">
      <img src="https://www.svgrepo.com/show/190513/flowers-garden.svg" alt="" className="logo" />
      <ul className="nav" style={{ listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li> {}
        <li><Link to="/catalog">Catalog</Link></li> {}
        <li><Link to="/cart">Cart</Link></li> {}
      </ul>
    </header>
  );
};

export default Header;
