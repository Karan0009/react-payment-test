import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const { products } = props;

  useEffect(() => {
    let total = 0;
    products.forEach((p) => {
      total += p.price * p.quantity;
    });
    setOrderTotal(total);
  }, [props.products]);

  if (products.length <= 0) return <h1>cart is empty</h1>;
  return (
    <>
      <h1>cart</h1>
      <div className="cart-container">
        <div className="cart-products">
          {products.map((product, index) => (
            <div key={index} className="productCard">
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p>{product.price * product.quantity}</p>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <p>order summary</p>
          <div className="row">
            <p>total :</p>
            <p>{orderTotal}</p>
          </div>
          <Link to="/checkout">checkout</Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
