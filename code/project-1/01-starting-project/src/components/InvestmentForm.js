import React, { useState } from 'react';
import styles from './InvestmentForm.module.css';

const InvestmentForm = (props) => {
    const [currentSavings, setCurrentSavings] = useState('');
    const [yearlyContribution, setYearlyContribution] = useState('');
    const [duration, setDuration] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');

    const inputChangeHandler = (identifier, value) => {
        switch (identifier) {
            case 'current-savings':
                setCurrentSavings(value);
                break;
            case 'yearly-contribution':
                setYearlyContribution(value);
                break;
            case 'expected-return':
                setExpectedReturn(value);
                break;
            case 'duration':
                setDuration(value);
                break;
            default:
        }
    };

    const handleReset = (event) => {
        // Clear all data
        setCurrentSavings('');
        setYearlyContribution('');
        setExpectedReturn('');
        setDuration('');

        props.onResetInvestment();

        console.log("Reset");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Submit");

        const investmentData = {
            savings: currentSavings,
            contribution: yearlyContribution,
            duration: duration,
            return: expectedReturn
        };

        props.onAddInvestment(investmentData);

        setCurrentSavings('');
        setYearlyContribution('');
        setExpectedReturn('');
        setDuration('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input type="number" id="current-savings" value={currentSavings} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input type="number" id="yearly-contribution" value={yearlyContribution} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
            </div>
            <div className={styles["input-group"]}>
                <p>
                    <label htmlFor="expected-return">
                        Expected Interest (%, per year)
                    </label>
                    <input type="number" id="expected-return" value={expectedReturn} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input type="number" id="duration" value={duration} onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} />
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