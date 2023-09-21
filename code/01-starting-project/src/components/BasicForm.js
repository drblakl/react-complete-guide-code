import useInput from "../hooks/use-input";

const BasicForm = (props) => {
    const { value: firstName,
        hasError: firstNameInputHasError,
        isValid: firstNameIsValid,
        reset: resetFirstNameInput,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler } = useInput(value => value.trim() !== '');

    const { value: lastName,
        hasError: lastNameInputHasError,
        isValid: lastNameIsValid,
        reset: resetLastNameInput,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler } = useInput(value => value.trim() !== '');

    const { value: email,
        hasError: emailInputHasError,
        isValid: emailIsValid,
        reset: resetEmailInput,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler } = useInput(value => value.trim() !== '' && value.trim().indexOf("@") != -1);


    const firstNameInputClasses = firstNameInputHasError ? "form-control invalid" : "form-control";
    const lastNameInputClasses = lastNameInputHasError ? "form-control invalid" : "form-control";
    const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className='form-control'>
                    <label htmlFor='name'>First Name</label>
                    <input
                        onChange={firstNameChangedHandler}
                        onBlur={firstNameBlurHandler}
                        value={firstName}
                        className={firstNameInputClasses}
                        type='text'
                        id='firstName'
                    />
                    {firstNameInputHasError && <p className="error-text">First Name must not be empty</p>}

                </div>
                <div className='form-control'>
                    <label htmlFor='name'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        onChange={lastNameChangedHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastName}
                        className={lastNameInputClasses}
                    />
                    {lastNameInputHasError && <p className="error-text">Last Name must not be empty</p>}
                </div>
            </div>
            <div className='form-control'>
                <label htmlFor='name'>E-Mail Address</label>
                <input
                    type='text'
                    id='email'
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={email}
                    className={emailInputClasses}
                />
                {emailInputHasError && <p className="error-text">Email must not be empty and must contain an @ symbol</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
