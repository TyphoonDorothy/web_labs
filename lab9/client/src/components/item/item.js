import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ItemsContext } from './item_context';
import Loader from '../loader/loader';
import "./item.css";

const Item = () => {
  const { id } = useParams();
  const { items, loading } = useContext(ItemsContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchedItem = items.find(item => item.id === parseInt(id)); 
    setItem(fetchedItem);
  }, [id, items]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="details">
      <h2>Item Details</h2>
      <img src={item.imageUrl} alt={item.name} />
      <p>Name: {item.name}</p>
      <p>Price: {item.price}</p>
      <p>Description: {item.description}</p>
      <p>Category: {item.category}</p>
    </div>
  );
};

export default Item;
