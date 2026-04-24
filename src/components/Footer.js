import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
      <div className="container">

        <div className="row text-center text-md-start">

          {/* COLUMN 1 */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold">FASHION STORE</h5>
            <p className="text-light">
              Your one-stop destination for trendy fashion and accessories.
            </p>
          </div>

          {/* COLUMN 2 */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none d-block mb-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/men's clothing" className="text-white text-decoration-none d-block mb-1">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/women's clothing" className="text-white text-decoration-none d-block mb-1">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/jewelery" className="text-white text-decoration-none d-block mb-1">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-1">Email: support@fashionstore.com</p>
            <p className="mb-0">Phone: +91 9876543210</p>
          </div>

        </div>




      </div>
    </footer>
  );
};

export default Footer;