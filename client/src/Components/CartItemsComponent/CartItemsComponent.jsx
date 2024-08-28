import { useState, useContext } from "react";
import "./CartItemsComponent.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import PopUpComponent from "../PopUpComponent/PopUpComponent"; 

const CartItemsComponent = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    userEmail,
  } = useContext(ShopContext);

  // Състояния за Pop-Up
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const handleCheckout = async () => {
    const cartItemsList = all_product.map((e) => {
      if (cartItems[e.id] > 0) {
        return {
          name: e.name,
          price: e.new_price,
          quantity: cartItems[e.id],
          total: e.new_price * cartItems[e.id],
        };
      }
      return null;
    }).filter(item => item !== null);

    try {
      const response = await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          cartItems: cartItemsList,
          totalAmount: getTotalCartAmount(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPopupTitle('Order Placed');
        setPopupMessage('Your order has been successfully placed!');
      } else {
        setPopupTitle('Order Failed');
        setPopupMessage('Failed to send order confirmation. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupTitle('Error');
      setPopupMessage('An unexpected error occurred. Please try again.');
    } finally {
      setShowPopup(true);
    }
  };

  return (
    <div className="cartitem">
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitem-format cartitem-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitem-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitem-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove Icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitem-down">
        <div className="cartitem-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promocode">
          <p>If you have a promocode, Enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="promo code" />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
      
      <PopUpComponent
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title={popupTitle}
        message={popupMessage}
      />
    </div>
  );
};

export default CartItemsComponent;
