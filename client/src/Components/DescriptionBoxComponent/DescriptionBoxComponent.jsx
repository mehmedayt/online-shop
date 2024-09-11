/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import './DescriptionBoxComponent.css';
import { ShopContext } from '../../Context/ShopContext';

const DescriptionBoxComponent = ({ product = {} }) => {
    const [showDescription, setShowDescription] = useState(true);
    const { userEmail } = useContext(ShopContext);  
    const [averageRating, setAverageRating] = useState(product.averageRating || 0);
    const [ratings, setRatings] = useState(product.ratings || []);

    const handleRatingClick = async (rating) => {
        if (!userEmail) {
            alert('Please ensure your email is set in the system.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/submit-rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id || '',
                    userEmail,
                    rating
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            const newRatings = [...ratings, { userEmail, rating }];
            const totalRating = newRatings.reduce((acc, r) => acc + r.rating, 0);
            const newAverageRating = totalRating / newRatings.length;

            setRatings(newRatings);
            setAverageRating(newAverageRating);

        } catch (error) {
            console.error(error);
            alert('Failed to submit rating');
        }
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
                    Reviews ({ratings.length})
                </div>
            </div>
            {showDescription ? (
                <div className="description-description">
                    <p>{product.description || 'No description available.'}</p>
                </div>
            ) : (
                <div className="rating-section">
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= averageRating ? 'selected' : ''}`}
                                onClick={() => handleRatingClick(star)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <div className="average-rating">Average Rating: {averageRating.toFixed(1)}</div>
                </div>
            )}
        </div>
    );
};

export default DescriptionBoxComponent;
