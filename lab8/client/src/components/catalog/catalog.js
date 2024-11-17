import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primarybutton';
import './catalog.css';
import { ItemsContext } from '../item/item_context';
import { useCatalog } from './catalog_context';

const Catalog = () => {
  const { items } = useContext(ItemsContext);
  const { 
    searchText, 
    setSearchText, 
    selectedCategory, 
    setSelectedCategory, 
    selectedPriceOrder, 
    setSelectedPriceOrder } = useCatalog();

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
        {sortedItems.map((item) => (
          <div key={item.id} className="catalog-card">
            <img src={item.imageUrl} alt={item.name} className="catalog-card-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <Link to={`/item/${item.id}`}>
              <PrimaryButton text="View More" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
