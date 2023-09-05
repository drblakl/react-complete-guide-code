import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';

function App() {
    const [usersList, setUsersList] = useState([]);


    const handleAddUser = (name, age) => {
        setUsersList((prevUsersList) => {
            return [
                ...prevUsersList,
                { name: name, age: age, id: Math.random().toString()},
            ]
        });
    };

    return (
        <div>
            <AddUser onAddUser={handleAddUser}></AddUser>
            <UsersList users={usersList}></UsersList>
        </div>
    );
}

export default App;
