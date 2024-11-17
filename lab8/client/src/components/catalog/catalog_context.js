import React, { createContext, useState, useContext } from 'react';

const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceOrder, setSelectedPriceOrder] = useState('');

  return (
    <CatalogContext.Provider value={{ searchText, setSearchText, selectedCategory, setSelectedCategory, selectedPriceOrder, setSelectedPriceOrder }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => useContext(CatalogContext);
