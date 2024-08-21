import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {


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
                
                    <div className="list-format-main list-format">
                        <img src="" alt="" className="list-product-icon" />
                        <p>Name</p>
                        <p>Old Price</p>
                        <p>New Price</p>
                        <p>Category</p>
                        <img src={cross_icon} alt="" className="list-remove-icon" />
                    </div>
            </div>
        </div>
    );
};

export default ListProduct;