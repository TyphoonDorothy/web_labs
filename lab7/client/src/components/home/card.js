import React from 'react';

const Card = ({ imgSrc, title, description }) => {
  return (
    <div className="card">
      <img src={imgSrc} alt="" className="card_img" />
      <h6 className="card_name">{title}</h6>
      <p className="card_p">{description}</p>
    </div>
  );
};

export default Card;
