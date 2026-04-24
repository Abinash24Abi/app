import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  

  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  const loadProducts = async () => {
    
    try {
      const data = await api.getProductsByCategory(categoryName);
      setProducts(data);
      setPage(1);
    } catch {
      setProducts([]);
    }
  };

  const start = (page - 1) * perPage;
  const current = products.slice(start, start + perPage);
  const totalPages = Math.ceil(products.length / perPage);



  return (
    <div className="container my-4">

     
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h4 className="text-capitalize">{categoryName}</h4>
      <p className="text-muted">{products.length} products</p>

   
      <div className="row">
        {current.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          current.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>

      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-3">

          <button
            className="btn btn-outline-dark btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            {page} / {totalPages}
          </span>

          <button
            className="btn btn-outline-dark btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default CategoryPage;