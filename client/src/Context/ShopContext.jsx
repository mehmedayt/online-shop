/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = (productIds) => {
    let cart = {};
    productIds.forEach(id => cart[id] = 0);
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('user-email') || "");

    useEffect(() => {
        fetch('https://e-commerce-react-db6a14093668.herokuapp.com/allproducts')
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data);
                const productIds = data.map(product => product._id);
                setCartItems(getDefaultCart(productIds));
            })
            .catch((error) => console.error('Error fetching products:', error));

        if (localStorage.getItem('auth-token')) {
            fetch('https://e-commerce-react-db6a14093668.herokuapp.com/getcart', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data))
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, []);

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + (count > 0 ? count : 0), 0);
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, count]) => {
            if (count > 0) {
                const itemInfo = allProducts.find((product) => product._id === itemId);
                return total + (itemInfo ? itemInfo.new_price * count : 0);
            }
            return total;
        }, 0);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: Math.max(0, prev[itemId] - 1) };
            if (localStorage.getItem('auth-token')) {
                fetch('https://e-commerce-react-db6a14093668.herokuapp.com/removefromcart', {
                    method: 'POST',
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                })
                    .then((response) => response.json())
                    .catch((error) => console.error('Error removing from cart:', error));
            }
            return updatedCart;
        });
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            if (localStorage.getItem('auth-token')) {
                fetch('https://e-commerce-react-db6a14093668.herokuapp.com/addtocart', {
                    method: 'POST',
                    headers: {
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                })
                    .then((response) => response.json())
                    .catch((error) => console.error('Error adding to cart:', error));
            }
            return updatedCart;
        });
    };

    const contextValue = { 
        getTotalCartItems, 
        getTotalCartAmount, 
        allProducts, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        userEmail 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
