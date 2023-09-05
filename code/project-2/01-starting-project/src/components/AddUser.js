import React, { useState } from 'react';
import styles from './AddUser.module.css';
import Card from './Card';
import Button from './Button';
import ErrorModal from './ErrorModal';

const AddUser = (props) => {
    const [error, setError] = useState();
    const [enteredAge, setEnteredAge] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');

    const usernameHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        };

        if (+enteredAge < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter an age greater than or equal to 1."
            });
            return;
        }

        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={enteredUsername}
                        onChange={usernameHandler}
                    />
                    <label htmlFor="age">Age (Years)</label>
                    <input
                        id="age"
                        type="number"
                        value={enteredAge}
                        onChange={ageHandler}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>

    )
};

export default AddUser;