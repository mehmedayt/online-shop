import './CSSPages/ProfilePage.css';
import { useEffect, useState } from 'react';
import PopUpComponent from '../Components/PopUpComponent/PopUpComponent';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }
    }, [navigate]);

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

    const handleUpdateEmail = async () => {
                const response = await fetch('http://localhost:4000/auth/changeEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({
                        currentEmail: localStorage.getItem('user-email'),
                        newEmail: formData.email
                    })
                });
        
                const data = await response.json();
        
                if (data.success) {
                    localStorage.setItem('user-email', formData.email);
                    setPopupTitle('Success');
                    setPopupMessage('Your email has been updated successfully.');
                    setFormData({
                        ...formData,
                        email: ''
                    });
                } else {
                    setPopupTitle('Error');
                    setPopupMessage(data.message || 'There was a problem updating your email.');
                }
        
                setShowPopup(true);
            };

    const handleDeleteAccount = async () => {
        if (!confirmDelete) {
            setPopupTitle('Confirm Deletion');
            setPopupMessage('Are you sure you want to delete your account? This action cannot be undone.\n Press enter to confirm!');
            setShowPopup(true);
            setConfirmDelete(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/auth/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('auth-token')
                }
            });

            const data = await response.json();

            if (data.success) {
                setPopupTitle('Account Deleted');
                setPopupMessage('Your account has been deleted successfully.');
                localStorage.removeItem('user-email');
                localStorage.removeItem('auth-token');
                setShowPopup(true);
                
                setTimeout(() => {
                        window.location.replace('/');
                    
                }, 2000);
            } else {
                setPopupTitle('Error');
                setPopupMessage(data.message || 'There was a problem deleting your account.');
                setShowPopup(true);
            }
        } catch (error) {
            setPopupTitle('Error');
            setPopupMessage('An error occurred while deleting your account.');
            setShowPopup(true);
        } finally {
            setConfirmDelete(false);
        }
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
                             name="email"
                             type="text"
                             value={formData.email}
                             onChange={changeHandler}
                             placeholder="Change Email"
                         />
                     <p>Email: {localStorage.getItem('user-email')}</p>
                     <button onClick={handleUpdateEmail}>Update Email</button>
                 </div>

                <div className="profile-section">
                    <h2>Danger Zone</h2>
                    <button className="delete-account" onClick={handleDeleteAccount}>
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