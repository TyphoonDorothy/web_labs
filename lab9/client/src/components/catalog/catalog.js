import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primarybutton';
import Loader from '../loader/loader';
import './catalog.css';
import { useCatalog } from './catalog_context';

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { 
    searchText, 
    setSearchText, 
    selectedCategory, 
    setSelectedCategory, 
    selectedPriceOrder, 
    setSelectedPriceOrder 
  } = useCatalog();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:1337/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    
    if (selectedPriceOrder === 'ascending') {
      return priceA - priceB;
    } else if (selectedPriceOrder === 'descending') {
      return priceB - priceA;
    }
    return 0;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>; 

  return (
    <div className="catalog">
      <div className="filters">
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Flowers</option>
          <option value="roses">Roses</option>
          <option value="tulips">Tulips</option>
        </select>
        <select onChange={(e) => setSelectedPriceOrder(e.target.value)} value={selectedPriceOrder}>
          <option value="">Sort by price</option>
          <option value="ascending">Low to High</option>
          <option value="descending">High to Low</option>
        </select>
      </div>

      <div className="catalog-items">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <div key={item.id} className="catalog-card">
              <img src={item.imageUrl} alt={item.name} className="catalog-card-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <Link to={`/item/${item.id}`}>
                <PrimaryButton text="View More" />
              </Link>
            </div>
          ))
        ) : (
          <div className="no-items">No items match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
