import './NewsLetterComponent.css';
import { useState } from 'react';
import PopUpComponent from '../PopUpComponent/PopUpComponent';
import { postRequest } from '../../utils/requester'; 

const NewsLetterComponent = () => {
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');

    const handleSubscribe = async () => {
        try {
            const response = await postRequest('/subscribe', { email });

            if (response) {
                setPopupTitle('Success');
                setPopupMessage('Subscription successful!');
            } else {
                setPopupTitle('Error');
                setPopupMessage('Subscription failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            setPopupTitle('Error');
            setPopupMessage('An unexpected error occurred.');
        } finally {
            setShowPopup(true);
        }
    };

    return (
        <div className="news">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input
                    type="email"
                    placeholder="Your Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe}>Subscribe</button>
            </div>    
            <PopUpComponent
                show={showPopup}
                handleClose={() => setShowPopup(false)}
                title={popupTitle}
                message={popupMessage}
            />    
        </div>
    );
};

export default NewsLetterComponent;
