import React from 'react';

const Header = () => {
  return (
    <header className="header" id="header">
      <img src="https://www.svgrepo.com/show/190513/flowers-garden.svg" alt="" className="logo" />
      <ul className="nav" style={{ listStyle: 'none' }}>
        <li><a href="">Home</a></li>
        <li><a href="Catalog">Catalog</a></li>
        <li><a href="Cart">Cart</a></li>
      </ul>
    </header>
  );
};

export default Header;
