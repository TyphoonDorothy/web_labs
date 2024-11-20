import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateItemQuantity } from './cart_actions';
import './cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(updateItemQuantity(id, 1)); // Increment quantity by 1
  };

  const handleDecrease = (id) => {
    dispatch(updateItemQuantity(id, -1)); // Decrement quantity by 1
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0; // Ensure price is valid
      const quantity = item.quantity || 0; // Ensure quantity is valid
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity || 0}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                  <p className="cart-item-price">
                    $
                    {(
                      (parseFloat(item.price.replace('$', '')) || 0) *
                      (item.quantity || 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="total">
            <p>Total amount: ${calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
