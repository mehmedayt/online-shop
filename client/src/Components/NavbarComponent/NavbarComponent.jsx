import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavbarComponent.css';
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/cart_icon.png';
import profile_icon from '../../assets/profile_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const NavbarComponent = () => {
    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <div className="navigation">
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/mens" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Men
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/womens" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Women
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/kids" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Kids
                    </NavLink>
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => {
                        localStorage.removeItem('auth-token');
                        localStorage.removeItem('user-email');
                        window.location.replace('/');
                    }}>
                        Logout
                    </button>
                ) : (
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )}
                <Link to='/profile'> 
                    <img src={profile_icon} alt="Profile Icon" className="nav-profile-icon" />
                </Link>
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart Icon" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default NavbarComponent;
