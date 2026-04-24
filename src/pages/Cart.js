import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <h4>Your cart is empty</h4>
        <button className="btn btn-dark mt-2" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h4 className="mb-3">Shopping Cart</h4>

      <div className="row">
       
        <div className="col-lg-8">
          {cart.map(item => (
            <div key={item.id} className="card mb-3 p-2">
              <div className="d-flex align-items-center">

                <img
                  src={item.image}
                  alt=""
                  style={{ width: 60, height: 60, objectFit: 'contain' }}
                  className="me-3"
                />

                <div className="flex-grow-1">
                  <h6 className="mb-1">
                    {item.title.substring(0, 40)}...
                  </h6>
                  <small className="text-muted">{item.category}</small>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="form-control mx-2"
                  style={{ width: 60 }}
                />

                <span className="fw-bold me-3">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>

              </div>
            </div>
          ))}
        </div>

        
        <div className="col-lg-4">
          <div className="card p-3">
            <h5>Total</h5>
            <h4 className="text-primary">
              ${getCartTotal().toFixed(2)}
            </h4>

            <button className="btn btn-dark w-100 mt-2">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;