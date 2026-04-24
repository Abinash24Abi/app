import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand fw-bold fs-3">
          <span className="text-dark">FASHION</span>
          <span className="text-secondary">STORE</span>
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV CONTENT */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* CENTER MENU */}
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link mx-2">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/men's clothing" className="nav-link mx-2">Men</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/women's clothing" className="nav-link mx-2">Women</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/jewelery" className="nav-link mx-2">Accessories</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/electronics" className="nav-link mx-2">Electronics</Link>
            </li>
          </ul>

          {/* SEARCH + CART */}
          <div className="d-flex align-items-center flex-column flex-lg-row gap-2">

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </form>

            {/* CART */}
            <Link to="/cart" className="position-relative ms-lg-3 mt-2 mt-lg-0">
              <i className="bi bi-cart" style={{ fontSize: '24px' }}></i>

              {cartItemCount > 0 && (
                <span
                  className="badge bg-dark position-absolute top-0 start-100 translate-middle rounded-pill"
                >
                  {cartItemCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;