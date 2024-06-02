import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css'

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data.data);
    };

    const addUser = async (user) => {
        await axios.post('http://localhost:5000/api/user', user);
        fetchUsers();
    };

    const updateUser = async (user) => {
        await axios.put(`http://localhost:5000/api/user/${user.id}`, user);
        fetchUsers();
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/api/user/${id}`);
        fetchUsers();
    };

    return (
        <div className='App'>
            <UserForm addUser={addUser} />
            <div className='u-con'>
                <UserList users={users} setSelectedUser={setSelectedUser} deleteUser={deleteUser} />
                {selectedUser && <UserDetails user={selectedUser} updateUser={updateUser} />}
            </div>
            
        </div>
    );
};

export default App;