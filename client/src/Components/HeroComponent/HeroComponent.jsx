import './HeroComponent.css';
import hand_icon from '../../assets/hand_icon.png';
import arrow_icon from '../../assets/arrow.png';
import hero_image from '../../assets/hero_image.png';

const HeroComponent = () => {
    const scrollToLastest = () => {
        window.scrollTo({
            top: document.body.scrollHeight / 2,
            behavior: 'smooth'
        });
    };
    return (
        <div className="myhero">
            <div className="myhero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="myhero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="myhero-latest-btn" onClick={scrollToLastest}>
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="myhero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    );
};

export default HeroComponent;