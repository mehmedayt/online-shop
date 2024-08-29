/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './DescriptionBoxComponent.css';


const DescriptionBoxComponent = ({product}) => {
    const [showDescription, setShowDescription] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('user-email') || '';
        setUserEmail(email);
    }, []);

    const handleRatingClick = async (rating) => {
        if (!userEmail) {
            alert('Please ensure your name and email are stored in local storage.');
            return;
        }

        console.log(product);
        console.log(rating);
        
        

        //   try {
        //     const response = await fetch('/submit-rating', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             productId: product?.id,
        //             userEmail,
        //             rating
        //         })
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to submit rating');
        //     }

          
        // } catch (error) {
        //     console.error(error);
        //     alert('Failed to submit rating');
        // }

    };

    return (
        <div className='description'>
        <div className="description-navigator">
            <div 
                className={`description-nav-box ${showDescription ? 'active' : ''}`} 
                onClick={() => setShowDescription(true)}
            >
                Description
            </div>
            <div 
                className={`description-nav-box ${!showDescription ? 'active' : ''}`} 
                onClick={() => setShowDescription(false)}
            >
                Reviews 122
            </div>
        </div>
        {showDescription ? (
            <div className="description-description">
                <p>Our online store offers a diverse range of clothing for men, women, and kids, ensuring stylish and comfortable options for every member of the family. We feature the latest trends and timeless classics, catering to various tastes and occasions. Our user-friendly website allows for easy browsing and secure shopping, with detailed product descriptions and size guides to help you find the perfect fit. Enjoy hassle-free returns and excellent customer service for a seamless shopping experience.</p>
            </div>
        ) : (
            <div className="rating-section">
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= 'selected' ? 'selected' : ''}`}
                            onClick={() => handleRatingClick(star)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <div className="average-rating">Average Rating: 2</div>
            </div>
        )}
    </div>
    );
};

export default DescriptionBoxComponent;
