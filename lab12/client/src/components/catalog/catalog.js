import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PrimaryButton from '../primarybutton';
import Loader from '../loader/loader';
import './catalog.css';
import { useCatalog } from './catalog_context';
import axios from 'axios';
import AddToCartButton from '../add_button';

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSearchText, setLocalSearchText] = useState('');

  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedPriceOrder, 
    setSelectedPriceOrder 
  } = useCatalog();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCategory(params.get('category') || '');
    setSelectedPriceOrder(params.get('priceOrder') || '');
  }, [location.search]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:1337/items', {
          params: {
            category: selectedCategory || undefined,
            priceOrder: selectedPriceOrder || undefined
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        setItems(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, selectedPriceOrder]);

  useEffect(() => {
    if (localSearchText === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(localSearchText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [localSearchText, items]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedPriceOrder) params.set('priceOrder', selectedPriceOrder);
    navigate(`?${params.toString()}`, { replace: true });
  }, [selectedCategory, selectedPriceOrder, navigate]);

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="catalog">
      <div className="filters">
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={localSearchText}
          onChange={(e) => setLocalSearchText(e.target.value)}
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
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="catalog-card">
              <img src={item.imageUrl} alt={item.name} className="catalog-card-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <Link to={`/item/${item.id}`}>
                <PrimaryButton text="View More" />
              </Link>
              <AddToCartButton item={item} />
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
