import React from 'react';
import PrimaryButton from '../primarybutton';
import './catalog.css';

const catalogItems = [
    {
      id: 1,
      name: 'Bouquet',
      description: 'Lorem ipsum dolor set',
      price: '$123',
      imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
    },
    {
      id: 2,
      name: 'Bouquet',
      description: 'Lorem ipsum dolor set',
      price: '$123',
      imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
    },
    {
        id: 3,
        name: 'Item 2',
        description: 'Lorem ipsum dolor set',
        price: '$123',
        imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
      },
      {
        id: 4,
        name: 'Bouquet',
        description: 'Lorem ipsum dolor set',
        price: '$123',
        imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
      },
      {
        id: 5,
        name: 'Bouquet',
        description: 'Lorem ipsum dolor set',
        price: '$123',
        imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
      },
      {
        id: 6,
        name: 'Bouquet',
        description: 'Lorem ipsum dolor set',
        price: '$123',
        imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg',
      }
  ];
  
  const Catalog = () => {
    return (
      <div className="catalog">
        <div className="filters">
        <h3>Filters</h3>
        <select>
          <option value="">Select Category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <div className='catalog-items'>
        {catalogItems.map((item) => (
          <div key={item.id} className="catalog-card">
            <img src={item.imageUrl} alt={item.name} className="catalog-card-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <PrimaryButton text="View More" />
          </div>
        ))}</div>
        
      </div>
    );
  };
  
  export default Catalog;