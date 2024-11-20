export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: { ...item, quantity: 1 }, // Ensure default quantity is 1
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateItemQuantity = (id, change) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { id, change },
});
