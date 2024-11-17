import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

const FirstItems = [
    { id: 1, name: 'Beatrice', description: 'Lorem ipsum dolor set', price: '$101', category: 'roses', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' },
    { id: 2, name: 'Jeanne', description: 'Lorem ipsum dolor set', price: '$123', category: 'roses', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' },
    { id: 3, name: 'Dora', description: 'Lorem ipsum dolor set', price: '$123', category: 'roses', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' },
    { id: 4, name: 'Chris', description: 'Lorem ipsum dolor set', price: '$315', category: 'tulips', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' },
    { id: 5, name: 'Nana', description: 'Lorem ipsum dolor set', price: '$207', category: 'tulips', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' },
    { id: 6, name: 'Mina', description: 'Lorem ipsum dolor set', price: '$89', category: 'tulips', imageUrl: 'https://www.flowersfromthefarm.co.uk/wp-content/uploads/2023/10/Mrs-Moseleys-posies-autumn-bouquet-october-with-dahlias-and-cosmos.jpg' }
]

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState(FirstItems);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
