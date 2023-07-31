import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ProfileTabs = () => {
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== currentPassword) {
            // Perform validation to ensure both passwords match
            console.error("Passwords do not match.");
            return;
        }

        try {
            // Send the newPassword to the backend API for password change
            await axios.post("https://platz-shop-api.onrender.com/api/change-password", {
                currentPassword,
                newPassword,
            });

            // Password changed successfully
            console.log("Password updated successfully.");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <>
            <form className="row form-container" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-pass">Current Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="account-pass"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-confirm-pass">New Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="account-confirm-pass"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">Update Profile</button>
            </form>

            <div>
                {localStorage.getItem("roles").includes("SELLER") &&
                    < Link to={'/dashboard'} className={'btn btn-dark mt-4'}> Go to Dashboard</Link>
                }
            </div>
        </>
    );
};

export default ProfileTabs;
