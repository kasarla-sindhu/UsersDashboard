import React, { useState } from 'react';
import './index.css'

const UserDetails = ({ user, updateUser }) => {
    const [userData, setUserData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userData);
    };

    return (
        <form className='edit-form' onSubmit={handleSubmit}>
            <h1>Edit Form</h1>
            <input type="text" name="name" value={userData.name} onChange={handleChange} required />
            <input type="date" name="dob" value={userData.dob} onChange={handleChange} required />
            <input type="text" name="contact" value={userData.contact} onChange={handleChange} required />
            <input type="email" name="email" value={userData.email} onChange={handleChange} required />
            <textarea name="description" value={userData.description} onChange={handleChange} required></textarea>
            <button type="submit">Update User</button>
        </form>
    );
};

export default UserDetails;