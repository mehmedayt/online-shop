import './CSSPages/ProfilePage.css';
import { useState } from 'react';
import PopUpComponent from '../Components/PopUpComponent/PopUpComponent';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPopup, setShowPopup] = useState(false);
        const [popupMessage, setPopupMessage] = useState('');
        const [popupTitle, setPopupTitle] = useState('');
    
        const changeHandler = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const handleUpdatePassword = async () => {
            if (formData.newPassword !== formData.confirmPassword) {
                setPopupTitle('Error');
                setPopupMessage('New passwords do not match.');
                setShowPopup(true);
                return;
            }


            const response = await fetch('http://localhost:4000/auth/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });
        
            const data = await response.json();
        
            if (data.success) {
                setFormData({ 
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setPopupTitle('Success');
                setPopupMessage('Your password has been updated successfully.');
            } else {
                setFormData({ 
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setPopupTitle('Error');
                setPopupMessage(data.message || 'There was a problem updating your password.');
            }
        
            setShowPopup(true);
        };
        
    


    return (
        <div className="profile">
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-section">
                    <h2>Change Password</h2>
                    <input
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={changeHandler}
                        placeholder="Current Password"
                    />
                    <input
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={changeHandler}
                        placeholder="New Password"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder="Confirm New Password"
                    />
                    <button onClick={handleUpdatePassword}>Update Password</button>
                </div>

                <div className="profile-section">
                    <h2>Account Information</h2>
                    <input
                        name="username"
                        type="text"
                        placeholder="Change Username"
                    />
                    <p>Email: user@example.com</p>
                    <button>Update Username</button>
                </div>

                <div className="profile-section">
                    <h2>Danger Zone</h2>
                    <button className="delete-account">
                        Delete Account
                    </button>
                </div>
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

export default ProfilePage;

// const handleDeleteAccount = () => {
//     // Входната точка за заявка за изтриване на акаунт
//     console.log('Delete account');
//     setPopupTitle('Account Deletion');
//     setPopupMessage('Your account has been deleted successfully.');
//     setShowPopup(true);
// };

//                 <div className="profile-section">
//                     <h2>Account Information</h2>
//                     <input
//                         name="username"
//                         value={formData.username}
//                         onChange={changeHandler}
//                         type="text"
//                         placeholder="Change Username"
//                     />
//                     <p>Email: user@example.com</p>
//                 </div>

//                 <div className="profile-section">
//                     <h2>Danger Zone</h2>
//                     <button className="delete-account" onClick={handleDeleteAccount}>
//                         Delete Account
//                     </button>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ProfilePage;
