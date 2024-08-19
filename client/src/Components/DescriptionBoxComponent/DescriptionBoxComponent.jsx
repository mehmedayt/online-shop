import './DescriptionBoxComponent.css';

const DescriptionBoxComponent = () => {
    return (
        <div className='description'>
            <div className="description-navigator">
                <div className="description-nav-box">Description</div>
                <div className="description-nav-box fade">Reviews (122)</div>
            </div>
            <div className="description-description">
                <p>Our online store offers a diverse range of clothing for men, women, and kids, ensuring stylish and comfortable options for every member of the family. We feature the latest trends and timeless classics, catering to various tastes and occasions. Our user-friendly website allows for easy browsing and secure shopping, with detailed product descriptions and size guides to help you find the perfect fit. Enjoy hassle-free returns and excellent customer service for a seamless shopping experience.</p>
            </div>
        </div>
    );
};

export default DescriptionBoxComponent;