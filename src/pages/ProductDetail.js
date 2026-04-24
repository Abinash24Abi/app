import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadProduct();
  },[id]);

  const loadProduct = async () => {
    
    try {
      const data = await api.getProductById(id);
      setProduct(data);
    } catch {
      setProduct(null);
    }
    
  };



  if (!product) {
    return (
      <div className="container text-center py-5">
        <h4>Product not found</h4>
        <button className="btn btn-dark mt-2" onClick={() => navigate('/')}>
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">

      {/* BACK */}
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6 text-center mb-3">
          <div className="bg-light p-4 rounded">
            <img
              src={product.image}
              alt=""
              className="img-fluid"
              style={{ maxHeight: 350, objectFit: 'contain' }}
            />
          </div>
        </div>

       
        <div className="col-md-6">

          <p className="text-muted text-capitalize">{product.category}</p>

          <h4>{product.title}</h4>

          <p className="text-muted">{product.description}</p>

          
          <div className="mb-2 text-warning">
            {'★'.repeat(Math.floor(product.rating.rate))}
            {'☆'.repeat(5 - Math.floor(product.rating.rate))}
            <span className="text-muted ms-2">
              ({product.rating.count})
            </span>
          </div>

          {/* PRICE */}
          <h3 className="text-primary">
            ${product.price.toFixed(2)}
          </h3>

        
          <div className="d-flex align-items-center my-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              -
            </button>

            <span className="mx-3">{qty}</span>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

       
          <div className="d-flex gap-2">
            <button
              className="btn btn-dark"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;