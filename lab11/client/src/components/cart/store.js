import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart_reducer';

const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default store;
