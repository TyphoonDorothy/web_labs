import React from 'react';
import './add.css';
import { useDispatch } from 'react-redux';
import { addToCart } from './cart/cart_actions';

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
