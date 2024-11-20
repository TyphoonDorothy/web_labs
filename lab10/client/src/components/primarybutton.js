import React from 'react';
import './primarybutton.css';

const PrimaryButton = ({ text }) => {
  return (
    <button className="primary-button">
      {text}
    </button>
  );
};

export default PrimaryButton;
