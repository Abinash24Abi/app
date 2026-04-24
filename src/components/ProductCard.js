import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="card h-100 shadow-sm product-card border-0">


      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top"
          style={{
            height: '220px',
            objectFit: 'contain',
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}
        />

      
        <div className="card-body">

          
          <h6 className="fw-bold">
            {product.title.length > 50
              ? product.title.substring(0, 50) + '...'
              : product.title}
          </h6>

    
          <p className="text-muted small mb-1">
            {product.category}
          </p>

          
          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">

            <h5 className="text-primary mb-0">
              ${product.price.toFixed(2)}
            </h5>


          </div>
        </div>
      </div>

      
      <div className="card-footer bg-white border-0">
        <button
          className="btn btn-dark w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};

export default ProductCard;