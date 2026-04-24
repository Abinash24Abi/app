import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selected, setSelected] = useState('all');


  const search = new URLSearchParams(useLocation().search).get('search');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterData();
  }, [products, selected, search]);

  const loadData = async () => {
    
    try {
      const [p, c] = await Promise.all([
        api.getAllProducts(),
        api.getAllCategories()
      ]);
      setProducts(p);
      setCategories(['all', ...c]);
    } catch {
      setProducts([]);
    }
    
  };

  const filterData = () => {
    let data = [...products];

    if (selected !== 'all') {
      data = data.filter(p => p.category === selected);
    }

    if (search) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  };


  return (
    <div>

      
      <div className="bg-dark text-white text-center py-5">
        <h2>Summer Sale</h2>
        <p>Up to 50% off</p>
      </div>

      <div className="container my-4">

        
        <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
          <h5>Products</h5>

          <select
            className="form-select w-auto"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        
        {search && (
          <p className="text-muted">
            Results for "{search}" ({filtered.length})
          </p>
        )}

        
        {filtered.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <div className="row">
            {filtered.map(p => (
              <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;