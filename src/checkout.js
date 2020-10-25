import React, { useState, useEffect, useRef } from "react";
// import { PayPalButton } from "react-paypal-button-v2";
import { Link, Redirect } from "react-router-dom";
// import ReactDOM from "react-dom";

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

const Checkout = (props) => {
  const { products } = props;
  const [name, setName] = useState("karan singh");
  const [email, setEmail] = useState("karan@ab.com");
  const [phone, setPhone] = useState("911234567890");
  const [note, setNote] = useState("this is optional user note");
  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("0");
  const [pu, setPu] = useState([]);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const paypalRef = useRef();

  // useEffect(() => {
  //   let total = 0;
  //   products.forEach((p) => {
  //     total += p.price * p.quantity;
  //   });
  //   setPu(
  //     products.map((p) => {
  //       return {
  //         description: `this is product description of ${p.id}`,
  //         amount: { currency_code: "USD", value: p.price * p.quantity },
  //       };
  //     })
  //   );
  //   setOrderTotal(total);
  // }, [props.products]);

  //   useEffect(() => {

  //   }, [props.products]);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "prouduct description",
                amount: {
                  currency_code: "USD",
                  value: 200,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [props.products]);

  const paymentHandler = (details, data) => {
    /** Here you can call your backend API
      endpoint and update the database */
    console.log(details, data);
  };

  if (props.products.length <= 0) return <Redirect to="/cart" />;

  if (error) return <h1>some error in this transaction</h1>;
  if (paidFor) return <h1>some error in this transaction</h1>;
  return (
    <>
      <h1>Checkout</h1>
      <div className="basic-container-2">
        <div className="user-details basic-card">
          <input type="text" value={name} />
          <input type="text" value={email} />
          <input type="text" value={phone} />
          <input type="text" value={note} />
          <select onChange={(e) => setShippingMethod(e.target.value)}>
            <option value="0">customer pickup</option>
            <option value="5">5-6 days</option>
            <option value="10">express</option>
          </select>
        </div>
        <div className="order-summary basic-card">
          <p>order summary</p>
          <div className="row">
            <p>total :</p>
            <p>{orderTotal}</p>
          </div>
          <div className="row">
            <p>shipping method :</p>
            <p>{shippingMethod ? shippingMethod : "not selected yet"}</p>
          </div>
          <div className="row">
            <p>additional taxes apply based on payment method</p>
          </div>
          {/* <PayPalButton
            amount={200}
            currency="USD"
            onSuccess={(details, data) => paymentHandler(details, data)}
            options={{
              clientId:
                "AerRcK0VUG2TqrfSmUrXW2Q2ARqKph8DdqYuqNy9RAbGSgBnEpmVl4riJ53xfubFP_EIYPzfmkBWk66R",
            }}
          /> */}
          <div ref={paypalRef} />
        </div>
      </div>
    </>
  );
};
export default Checkout;
