import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


const Login = (props) => {
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

    const authCtx = useContext(AuthContext);

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
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        }
        else if (!emailIsValid) {
            emailInputRef.current.focus();
        }
        else if (!passwordIsValid) {
            passwordInputRef.current.focus();
        }
    };

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}>
                </Input>
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}>
                </Input>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
