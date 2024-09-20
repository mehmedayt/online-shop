import { useEffect, useState, useCallback } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import './ListProduct.css';
import Popup from '../Popup/Popup';

const ListProduct = () => {
    const [allproducts, setAllproducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);

    const fetchInfo = useCallback(async () => {
        try {
            const res = await fetch(`https://e-commerce-react-db6a14093668.herokuapp.com/allproducts`);
            const data = await res.json();
            setAllproducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, []);

    const confirmRemoveProduct = (productId) => {
        setProductToRemove(productId);
        setShowPopup(true);
    };

    const removeProduct = async () => {
        try {
            await fetch(`https://e-commerce-react-db6a14093668.herokuapp.com/removeproduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productToRemove })
            });
            setAllproducts(prevProducts => prevProducts.filter(product => product.id !== productToRemove));
        } catch (error) {
            console.error("Failed to remove product:", error);
        } finally {
            setShowPopup(false);
            setProductToRemove(null);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo]);

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="list-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="list-allproducts">
                <hr />
                {allproducts.map((product) => (
                    <div key={product.id} className="list-format-main list-format">
                        <img src={product.image} alt="" className="list-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img 
                            onClick={() => confirmRemoveProduct(product.id)} 
                            src={cross_icon} 
                            alt="Remove product" 
                            className="list-remove-icon" 
                        />
                    </div>
                ))}
            </div>
            <Popup 
                show={showPopup} 
                handleClose={() => setShowPopup(false)} 
                title="Confirm Deletion" 
                message="Are you sure you want to remove this product?"
                onConfirm={removeProduct}
            />
        </div>
    );
};

export default ListProduct;
