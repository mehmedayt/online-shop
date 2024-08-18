
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li><Link to='/'>Shop</Link></li>
                <li><Link to='/mens'>Men</Link></li>
                <li><Link to='/womens'>Women</Link></li>
                <li><Link to='/kids'>Kids</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;