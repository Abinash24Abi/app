import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          <span style={{ color: '#2d3e50' }}>FASHION</span>
          <span style={{ color: '#46b881' }}>STORE</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-3">
            <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/category/men's clothing" className="fw-semibold">Men</Nav.Link>
            <Nav.Link as={Link} to="/category/women's clothing" className="fw-semibold">Women</Nav.Link>
            <Nav.Link as={Link} to="/category/jewelery" className="fw-semibold">Accessories</Nav.Link>
            <Nav.Link as={Link} to="/category/electronics" className="fw-semibold">Electronics</Nav.Link>
          </Nav>
          
          <form onSubmit={handleSearch} className="d-flex me-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '50px', borderColor: '#e2e8f0' }}
            />
            <button type="submit" className="btn btn-primary-custom" style={{ padding: '8px 20px' }}>
              Search
            </button>
          </form>
          
          <Nav.Link as={Link} to="/cart" className="position-relative">
            <i className="bi bi-bag" style={{ fontSize: '24px', color: '#2d3e50' }}></i>
            {cartItemCount > 0 && (
              <Badge 
                bg="success" 
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ backgroundColor: '#46b881 !important' }}
              >
                {cartItemCount}
              </Badge>
            )}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;