import { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import './ListProduct.css';

const ListProduct = () => {

    const [allproducts,setAllproducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllproducts(data);});
    };

    useEffect(()=>{
        fetchInfo();
    },[]);

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
                {allproducts.map((product,i)=>{
                    return <div key={i} className="list-format-main list-format">
                        <img src={product.image} alt="" className="list-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img src={cross_icon} alt="" className="list-remove-icon" />
                    </div>;
                })}
            </div>
        </div>
    );
};

export default ListProduct;