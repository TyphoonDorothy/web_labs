import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:1337';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/items`);
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems, fetchItems, loading, error }}>
      {children}
    </ItemsContext.Provider>
  );
};
