/* eslint-disable react/jsx-no-undef */
import './FooterComponent.css';
import footer_logo from '../../assets/logo_big.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pintester_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';

const FooterComponent = () => {
    return (
        <div className="foot">
            <div className="foot-logo">
                <img src={footer_logo } alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="foot-links">
            <li><a href="/online-shop/company">Company</a></li>
            <li><a href="/online-shop/products">Products</a></li>
            <li><a href="/online-shop/offices">Offices</a></li>
            <li><a href="/online-shop/about">About</a></li>
                <li>Contact</li>
            </ul>
            <div className="foot-social-icon">
                <div className="foot-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="foot-icons-container">
                    <img src={pintester_icon} alt="" />
                </div>
                <div className="foot-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
                <div className="foot-copyright">
                    <hr/>
                    <p>Copyright @ 2024 - All Right Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;