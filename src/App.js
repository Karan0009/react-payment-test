import React, { useState, useEffect, useRef, useReducer } from "react";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, FpxBankElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import styled from "styled-components";
// import StripeCheckout from "react-stripe-checkout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./cart";
import Checkout from "./checkout";
import "./App.css";

const products = [
  {
    name: "product 1",
    id: "1",
    category: "tshirt",
    price: "299.99",
    gender: "men",
    selectedSize: "m",
    quantity: 2,
  },
  {
    name: "product 2",
    id: "2",
    category: "hoodie",
    price: "699.99",
    gender: "men",
    selectedSize: "m",
    quantity: 1,
  },
];

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.

// const promise = loadStripe(
//   "pk_test_51HVixgHV238zUVmWkeWueVLuH5TgeKYc0qu88w5ZZDYcr3EaZQiaJZaLbqobL4XfQiYbUDRnR7OigGjR0uA7MqBY001RhOXdKk"
// );

const CheckoutButton = styled.button`
  border: 2px solid black;
  background: transparent;
  color: black;
  borderradius: 0px;
`;

const ProductCard = styled.div`
  border: 2px solid blue;
  padding: 13px;
`;

export default function App() {
  // const [products, setProducts] = useState([
  //   { price: 2000, id: "tee" },
  //   { price: 7000, id: "pant" },
  // ]);
  const [userNote, setUserNote] = useState("user note here");
  const [shippingMethod, setShippingMethod] = useState("10$ one");
  const [error, setError] = useState(null);
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // let paypalRef = useRef();

  // useEffect(() => {
  //   // const script = document.createElement("script");
  //   // script.src =
  //   //   "https://paypal.com/sdk/js?client-id=AerRcK0VUG2TqrfSmUrXW2Q2ARqKph8DdqYuqNy9RAbGSgBnEpmVl4riJ53xfubFP_EIYPzfmkBWk66R";
  //   // script.addEventListener("load", () => setLoaded(true));
  //   // document.body.appendChild(script);

  //   // if (loaded) {
  //   //   setTimeout(() => {
  //   window.paypal
  //     .Buttons({
  //       createOrder: (data, actions) => {
  //         return actions.order.create({
  //           intent: "CAPTURE",
  //           purchase_units: [
  //             {
  //               description: "product description",
  //               amount: {
  //                 currency_code: "USD",
  //                 value: 500.0,
  //               },
  //             },
  //           ],
  //         });
  //       },
  //       onApprove: async (data, actions) => {
  //         const order = await actions.order.capture();
  //         setPaidFor(true);
  //         console.log(order);
  //       },
  //       onError: (err) => {
  //         setError(err);
  //         console.error("ERROR", err);
  //       },
  //     })
  //     .render(paypalRef.current);
  //   //   });
  //   // }
  // });

  if (paidFor) return <h1>your payment is done</h1>;
  if (error) return <h1>there is some problem with this transaction</h1>;

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/cart">
            <Cart products={products} />
          </Route>
          <Route exact path="/checkout">
            <Checkout products={products} />
          </Route>
        </Switch>
        {/* {paidFor ? (
          <h1>payment done</h1>
        ) : (
          <div>
            <div>
              {products.map((product, index) => (
                <ProductCard key={index}>
                  {product.id}-: ${product.price}
                </ProductCard>
              ))}
            </div>
            <div ref={paypalRef} />
          </div>
        )} */}
        {/* <h1>cart</h1> */}
        {/* <CheckoutButton>checkout</CheckoutButton> */}

        {/* <Elements stripe={promise}>
        <CheckoutForm />
      </Elements> */}
      </div>
    </Router>
  );
}
