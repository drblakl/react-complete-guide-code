import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

    const { value: enteredName,
        hasError: nameInputHasError,
        isValid: enteredNameIsValid,
        reset: resetNameInput,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler } = useInput(value => value.trim() !== '');

    const { value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        reset: resetEmailInput,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler } = useInput(value => value.trim() !== '' && value.trim().indexOf("@") !== -1);


    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!enteredNameIsValid) {
            return;
        }

        if (!enteredEmailIsValid) {
            return;
        }

        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
    const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses} >
                <label htmlFor='name'>Your Name</label>
                <input
                    onChange={nameChangedHandler}
                    value={enteredName}
                    onBlur={nameBlurHandler}
                    type='text' id='name' />
                {nameInputHasError && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className={emailInputClasses} >
                <label htmlFor='email'>Your Email</label>
                <input
                    onChange={emailChangedHandler}
                    value={enteredEmail}
                    onBlur={emailBlurHandler}
                    type='text' id='email' />
                {emailInputHasError && <p className="error-text">Email must not be empty and must contain an @ sign</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
