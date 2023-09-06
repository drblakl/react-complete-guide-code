import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
    //const [enteredEmail, setEnteredEmail] = useState('');
    //const [emailIsValid, setEmailIsValid] = useState();
    //const [enteredPassword, setEnteredPassword] = useState('');
    //const [passwordIsValid, setPasswordIsValid] = useState();
    const initialEmailState = { value: null, isValid: null };
    const initialPasswordState = { value: null, isValid: null };
    const [formIsValid, setFormIsValid] = useState(false);
    const emailReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
            return { value: action.val, isValid: action.val.includes("@") };
        }
        if (action.type === "INPUT_BLUR") {
            return { value: state.value, isValid: state.value.includes("@") };
        }
        return initialEmailState;
    };

    const passwordReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
            return { value: action.val, isValid: action.val.length > 6 };
        }
        if (action.type === "INPUT_BLUR") {
            return { value: state.value, isValid: action.val.length > 6 };
        }
        return initialPasswordState;
    };

    const [emailState, dispatchEmail] = useReducer(emailReducer, initialEmailState);
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialPasswordState);

    const { isValid: emailIsValid} = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifer = setTimeout(() => {
            console.log("Checking form valid");
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500);

        return () => {
            console.log("CLEANUP");
            clearTimeout(identifer);
        };
    }, [emailIsValid, passwordIsValid]);


    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });

        setFormIsValid(
            event.target.value.includes("@") && passwordState.isValid
        )
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });

        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );

    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" })
    };

    const validatePasswordHandler = (event) => {
        dispatchPassword({ type: "INPUT_BLUR", val: event.target.value })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
