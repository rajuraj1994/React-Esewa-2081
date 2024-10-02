import React, { useState, useEffect, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { IMG_URL } from "../config";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartItems"));
    setProducts(cartData);
  }, []);
  //increase quantity
  const increaseQty = (id) => {
    const updateProducts = products.map((item) => {
      if (item.id === id && item.quantity<item.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setProducts(updateProducts);
    localStorage.setItem("cartItems", JSON.stringify(updateProducts));
  };
  //decrease quantity
  const decreaseQty = (id) => {
    const updateProducts = products.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setProducts(updateProducts);
    localStorage.setItem("cartItems", JSON.stringify(updateProducts));
  };
  //remove items form the cartt
  const removeCarthandler = (id) => {
    const confirmed = window.confirm(
      "Are yo sure you want to delete this item from the cart?"
    );
    if (confirmed) {
      const filterCart = products.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(filterCart));
      setProducts(filterCart);
      toast.success("product is removed from the cart");
    }
  };
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <ToastContainer theme="colored" position="top-center" />
      <div className="container">
        <div className="row d-flex justify-content-between my-5">
          {products.length === 0 ? (
            <h2 className="text-center text-danger mt-5">Your Cart is Empty</h2>
          ) : (
            <>
              <h2 className="text-center">Your Cart Items</h2>
              <div className="col-md-8 shadow">
                {products.map((item, i) => (
                  <Fragment key={i}>
                    <hr />
                    <div className="row d-flex align-items-center">
                      <div className="col-2">
                        <img src={`${IMG_URL}/${item.image}`} alt={item.title} width="50" />
                      </div>
                      <div className="col-3">
                        <strong>{item.title}</strong>
                      </div>
                      <div className="col-2 text-warning">Rs{item.price}</div>
                      <div className="col-3">
                        <div className="d-flex">
                          <button
                            className="btn btn-danger"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </button>
                          &nbsp;
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="form-control text-center border-0"
                          />
                          &nbsp;
                          <button
                            className="btn btn-primary"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCarthandler(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </div>
              <div className="col-md-3">
                <div className="shadow p-2">
                  <h5>Cart Summary</h5>
                  <hr />
                  <p>
                    <strong>Units:</strong>{" "}
                    {products.reduce(
                      (ac, item) => ac + Number(item.quantity),
                      0
                    )}
                  </p>
                  <p>
                    <strong>Total:</strong> Rs
                    {products.reduce(
                      (ac, item) => ac + item.quantity * item.price,
                      0
                    )}
                  </p>
                  <hr />
                  <button className="btn btn-warning">Check Out</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;