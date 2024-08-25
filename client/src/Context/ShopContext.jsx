/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import staticProducts from '../assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_product] = useState(staticProducts); 

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => {
                setAll_product((prevProducts) => [
                    ...prevProducts,
                    ...data,
                ]);
            })
            .catch((error) => console.error('Error fetching products:', error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
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
                const itemInfo = all_product.find((product) => product.id === Number(itemId));
                return total + (itemInfo ? itemInfo.new_price * count : 0);
            }
            return total;
        }, 0);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing from cart:', error));
        }
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
        }
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
