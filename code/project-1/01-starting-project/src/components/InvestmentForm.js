import React, { useState } from 'react';
import styles from './InvestmentForm.module.css';

const InvestmentForm = (props) => {

    const initialUserInput = {
        'current-savings': 10000,
        'yearly-contribution': 1200,
        'expected-return': 7,
        duration: 10
    }

    const [userInput, setUserInput] = useState(initialUserInput);


    //const [currentSavings, setCurrentSavings] = useState('');
    //const [yearlyContribution, setYearlyContribution] = useState('');
    //const [duration, setDuration] = useState('');
    //const [expectedReturn, setExpectedReturn] = useState('');

    const inputChangeHandler = (input, value) => {

        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input]: +value
            };
        })
    };

    const handleReset = (event) => {
        setUserInput(initialUserInput);
        props.onResetInvestment();
        console.log("Reset");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Submit");

        props.onAddInvestment(userInput);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input type="number" id="current-savings" value={userInput["current-savings"]} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input type="number" id="yearly-contribution" value={userInput["yearly-contribution"]} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
            </div>
            <div className={styles["input-group"]}>
                <p>
                    <label htmlFor="expected-return">
                        Expected Interest (%, per year)
                    </label>
                    <input type="number" id="expected-return" value={userInput["expected-return"]} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input type="number" id="duration" value={userInput["duration"]} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
            </div>
            <p className={styles.actions}>
                <button type="reset" onClick={handleReset} className={styles.buttonAlt}>
                    Reset
                </button>
                <button type="submit" className={styles.button}>
                    Calculate
                </button>
            </p>
        </form>
    );
}

export default InvestmentForm;