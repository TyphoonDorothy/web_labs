import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ItemsContext } from './item_context'; 
import "./item.css";

const Item = () => {
  const { id } = useParams();
  const { items } = useContext(ItemsContext);


  const item = items.find(item => item.id);

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
