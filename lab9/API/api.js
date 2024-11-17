import axios from 'axios';

const BASE_URL = "http://localhost:1337";

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchFilteredItems = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${BASE_URL}/items?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    throw error;
  }
};

export const fetchItemById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await axios.post(`${BASE_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
};
