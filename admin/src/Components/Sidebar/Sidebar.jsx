import './Sidebar.css';
import {Link} from 'react-router-dom';
import list_product_icon from '../../assets/Product_list_icon.svg';
import add_product_icon from '../../assets/Product_Cart.svg';

const Sidebar = () => {
    return (
        <div className='side'>
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="side-item">
                    <img src={add_product_icon} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className="side-item">
                    <img src={list_product_icon} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    );
};

export default Sidebar;