import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['all']);
  const [selectedCat, setSelectedCat] = useState('all');
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCat, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, catsData] = await Promise.all([
        api.getAllProducts(),
        api.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(['all', ...catsData]);
    } catch (err) {
      setError('Failed to load fashion items. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filteredList = [...products];
    if (selectedCat !== 'all') {
      filteredList = filteredList.filter(p => p.category === selectedCat);
    }
    if (searchTerm) {
      filteredList = filteredList.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(filteredList);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        {/* Hero Banner */}
        <div className="hero-banner">
          <Row className="align-items-center">
            <Col md={6}>
              <h1>
                Discover Your <span className="highlight">Fashion Style</span>
              </h1>
              <p>
                Find the latest trends in men's, women's fashion and premium accessories. 
                Quality pieces that define your unique personality and elevate your wardrobe.
              </p>
              <button 
                className="btn btn-primary-custom"
                onClick={() => navigate('/category/men\'s clothing')}
              >
                Shop Now →
              </button>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              <div style={{ fontSize: '120px' }}>🛍️</div>
            </Col>
          </Row>
        </div>

        {/* Categories */}
        <section className="my-5">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <span className="view-all-link" style={{ cursor: 'pointer', color: '#46b881', fontWeight: 600 }} onClick={() => setSelectedCat('all')}>
              View All →
            </span>
          </div>
          <Row className="g-4">
            {categories.slice(1, 5).map((cat, idx) => {
              const icons = { 'men\'s clothing': '👔', 'women\'s clothing': '👗', 'jewelery': '💍', 'electronics': '📱' };
              const names = { 'men\'s clothing': 'Men', 'women\'s clothing': 'Women', 'jewelery': 'Accessories', 'electronics': 'Electronics' };
              return (
                <Col key={idx} md={3} sm={6}>
                  <div className="category-card" onClick={() => setSelectedCat(cat)}>
                    <div className="category-icon">{icons[cat] || '👕'}</div>
                    <h5>{names[cat] || cat}</h5>
                    <small className="text-muted">Shop Collection</small>
                  </div>
                </Col>
              );
            })}
          </Row>
        </section>

        {/* Products */}
        <section className="my-5 pb-5">
          <div className="section-header">
            <h2>Featured Collection</h2>
            <Form.Select 
              className="w-auto"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              style={{ borderRadius: '50px', borderColor: '#e2e8f0', padding: '8px 20px' }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat} className="text-capitalize">
                  {cat === 'all' ? 'All Products' : cat}
                </option>
              ))}
            </Form.Select>
          </div>

          {searchTerm && (
            <Alert variant="success" className="mb-4" style={{ backgroundColor: '#e8f5ed', borderColor: '#46b881', color: '#2d3e50' }}>
              <i className="bi bi-search me-2"></i>
              Found {filtered.length} results for "{searchTerm}"
            </Alert>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-emoji-frown" style={{ fontSize: '60px', color: '#cbd5e1' }}></i>
              <h4 className="mt-3" style={{ color: '#64748b' }}>No products found</h4>
              <p style={{ color: '#94a3b8' }}>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <Row className="g-4">
              {filtered.slice(0, 8).map(product => (
                <Col key={product.id} md={3} sm={6}>
                  <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                    <div className="product-image-wrapper">
                      {product.rating.rate > 4.5 && <div className="product-badge">⭐ Best Seller</div>}
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-body">
                      <div className="product-category text-capitalize">
                        {product.category.replace("'s clothing", "").replace("jewelery", "Accessories")}
                      </div>
                      <div className="product-title">
                        {product.title.length > 45 ? product.title.substring(0, 45) + '...' : product.title}
                      </div>
                      <div className="product-rating">
                        <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.floor(product.rating.rate))}</span>
                        <span style={{ color: '#e2e8f0' }}>{'★'.repeat(5 - Math.floor(product.rating.rate))}</span>
                        <span className="ms-2" style={{ color: '#94a3b8', fontSize: '0.7rem' }}>({product.rating.count})</span>
                      </div>
                      <div className="product-price">${product.price.toFixed(2)}</div>
                      <button className="btn-add-to-cart" onClick={(e) => handleAddToCart(e, product)}>
                        Add to Cart 🛒
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {filtered.length > 8 && (
            <div className="text-center mt-5">
              <button className="btn btn-outline-custom" onClick={() => navigate(selectedCat === 'all' ? '/category/men\'s clothing' : `/category/${selectedCat}`)}>
                View All Products →
              </button>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Home;