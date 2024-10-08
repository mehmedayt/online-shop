import { useState, useContext, useEffect } from "react";
import "./CartItemsComponent.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import PopUpComponent from "../PopUpComponent/PopUpComponent";
import { postRequest } from "../../utils/requester"; 

const CartItemsComponent = () => {
  const {
    getTotalCartAmount,
    allProducts,
    cartItems,
    removeFromCart,
    userEmail,
  } = useContext(ShopContext);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {}, [allProducts, cartItems]);

  const handleCheckout = async () => {
    const cartItemsList = allProducts
      .filter((product) => cartItems[product._id] > 0)
      .map((product) => ({
        name: product.name,
        price: product.new_price,
        quantity: cartItems[product._id],
        total: product.new_price * cartItems[product._id],
      }));

    try {
      const result = await postRequest('/checkout', {
        email: userEmail,
        cartItems: cartItemsList,
        totalAmount: getTotalCartAmount(),
      });

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
      {allProducts.map((product) => {
        if (cartItems[product._id] > 0) {
          return (
            <div key={product._id}>
              <div className="cartitem-format cartitem-format-main">
                <img src={product.image} alt="" className="carticon-product-icon" />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <button className="cartitem-quantity">{cartItems[product._id]}</button>
                <p>${product.new_price * cartItems[product._id]}</p>
                <img
                  className="cartitem-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(product._id)}
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
