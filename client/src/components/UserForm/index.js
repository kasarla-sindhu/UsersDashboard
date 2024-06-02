import './index.css'

import React, { useState } from 'react';

const UserForm = ({ addUser }) => {
    const [user, setUser] = useState({ name: '', dob: '', contact: '', email: '', description: '' });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            addUser(user);
            setUser({ name: '', dob: '', contact: '', email: '', description: '' });
        };
    
    
        
        return (

            <form onSubmit={handleSubmit}>
                <h1>Enter Details</h1>
                <div className='input-con'>
                    <label htmlFor='name'>Name</label>
                    <p>:</p>
                    <input id="name" name="name" value={user.name} type="text" placeholder='Enter Name' onChange={handleChange}/>
                </div>
                <div className='input-con'>
                    <label htmlFor='dob'>Date Of Birth</label>
                    <p>:</p>
                    <input id="dob" type="date" name='dob' value={user.dob} placeholder='Enter Date of Birth' dateFormat='mm/dd/yyyy' onChange={handleChange} />
                </div>
                <div className='input-con'>
                    <label htmlFor='phno'>Phone Number</label>
                    <p>:</p>
                    <input id="phno" name='contact' value={user.contact} type="text" placeholder='Enter Phone Number' onChange={handleChange}/>
                </div>
                <div className='input-con'>
                    <label htmlFor='email'>Email</label>
                    <p>:</p>
                    <input id="email" type="text" name='email' value={user.email} placeholder='Enter Email' onChange={handleChange}/>
                </div>
                <div className='input-con'>
                    <label htmlFor='description'>Description</label>
                    <p>:</p>
                    <textarea id="description" name='description' value={user.description} placeholder='Description' onChange={handleChange}/>
                </div>
                <div className='sub-btn-con'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }


export default UserForm