import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a2c3e', color: 'white', marginTop: '60px', padding: '60px 0 30px' }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h3 className="mb-3">
              <span style={{ color: 'white' }}>FASHION</span>
              <span style={{ color: '#46b881' }}>STORE</span>
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
              Your one-stop destination for trendy fashion and accessories. Quality style for every occasion.
            </p>
            <div className="mt-3">
              <a href="#" className="me-3" style={{ color: '#46b881', fontSize: '20px' }}><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3" style={{ color: '#46b881', fontSize: '20px' }}><i className="bi bi-instagram"></i></a>
              <a href="#" className="me-3" style={{ color: '#46b881', fontSize: '20px' }}><i className="bi bi-twitter"></i></a>
              <a href="#" style={{ color: '#46b881', fontSize: '20px' }}><i className="bi bi-pinterest"></i></a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/category/men's clothing" className="text-decoration-none" style={{ color: '#94a3b8' }}>Men's Fashion</Link></li>
              <li className="mb-2"><Link to="/category/women's clothing" className="text-decoration-none" style={{ color: '#94a3b8' }}>Women's Fashion</Link></li>
              <li className="mb-2"><Link to="/category/jewelery" className="text-decoration-none" style={{ color: '#94a3b8' }}>Accessories</Link></li>
              <li className="mb-2"><Link to="/category/electronics" className="text-decoration-none" style={{ color: '#94a3b8' }}>Electronics</Link></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#94a3b8' }}>Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#94a3b8' }}>FAQs</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#94a3b8' }}>Shipping Info</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#94a3b8' }}>Returns</a></li>
            </ul>
          </Col>
          
          <Col md={4} className="mb-4">
            <h5 className="mb-3">Newsletter</h5>
            <p style={{ color: '#94a3b8' }}>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            <div className="d-flex">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                style={{ borderRadius: '50px 0 0 50px', border: 'none' }}
              />
              <button className="btn" style={{ backgroundColor: '#46b881', color: 'white', borderRadius: '0 50px 50px 0' }}>
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
        
        <hr style={{ backgroundColor: '#2d3e50', marginTop: '30px' }} />
        
        <div className="text-center mt-3">
          <p className="mb-0" style={{ color: '#94a3b8' }}>&copy; 2024 Fashion Store. All rights reserved. | Designed with <i className="bi bi-heart-fill" style={{ color: '#46b881' }}></i> for fashion lovers</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;