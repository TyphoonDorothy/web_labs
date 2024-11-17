import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/home/header';
import Info from './components/home/info';
import Prev from './components/home/prev';
import Footer from './components/home/footer';
import Catalog from './components/catalog/catalog';
import { CatalogProvider } from './components/catalog/catalog_context'; 
import { ItemsProvider } from './components/item/item_context';
import Item from './components/item/item';
import './App.css';

const App = () => {
  return (
    <Router>
      <CatalogProvider>
        <ItemsProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Info />
                  <Prev />
                </>
              }
            />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/cart" element={<div>Cart page is coming soon!</div>} />
          </Routes>
          <Footer />
        </ItemsProvider>
      </CatalogProvider>
    </Router>
  );
};

export default App;
