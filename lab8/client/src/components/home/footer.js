import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="brand">
        <h6 className="brand_h6">Branding stuff</h6>
        <p className="brand_p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <img src="https://www.svgrepo.com/show/190513/flowers-garden.svg" alt="" className="logo" />
      <ul className="media" style={{ listStyle: 'none' }}>
        <li><a href=""><img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="" className="media_img" /></a></li>
        <li><a href=""><img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="" className="media_img" /></a></li>
      </ul>
    </footer>
  );
};

export default Footer;
