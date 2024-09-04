import './CSSPages/ProfilePage.css';

const ProfilePage = () => {


    return (
        <div className="profile">
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-section">
                    <h2>Change Password</h2>
                    <input
                        name="currentPassword"
                        type="password"
                        placeholder="Current Password"
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm New Password"
                    />
                    <button>Update Password</button>
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

          
        </div>
    );
};

export default ProfilePage;
