import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primarybutton';

const Card = ({ imgSrc, title, description, id }) => {
  return (
    <div className="card">
      <img src={imgSrc} alt="" className="card_img" />
      <h6 className="card_name">{title}</h6>
      <p className="card_p">{description}</p>
      <Link to={`/item/${id}`}>
        <PrimaryButton text="View More" />
      </Link>
    </div>
  );
};

export default Card;
