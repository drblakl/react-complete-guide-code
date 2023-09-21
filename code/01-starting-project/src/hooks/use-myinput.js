import { useState } from "react";

const useMyInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    // value change handler
    const valueChangedHandler = (event) => {
        setEnteredValue(event.target.value);
    };
    // blur handler
    const inputBlurHandler = (event) => {
        setIsTouched(true);
    };
    // reset handler
    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangedHandler,
        inputBlurHandler,
        reset
    }
};

export default useMyInput
