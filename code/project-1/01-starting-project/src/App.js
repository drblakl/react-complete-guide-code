import React, { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResults from './components/InvestmentResults';

function App() {
    const [userInput, setUserInput] = useState(null);

    const resetHandler = () => {
        setUserInput(null);
    }

    const calculateHandler = (userInput) => {
        setUserInput(userInput);
    };

    const yearlyData = [];

    if (userInput) {
        let currentSavings = +userInput['current-savings'];
        const yearlyContribution = +userInput['yearly-contribution'];
        const expectedReturn = +userInput['expected-return'] / 100;
        const duration = +userInput['duration'];

        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
            console.log('looping');
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
                // feel free to change the shape of the data pushed to the array!
                key: Math.random() * 1000,
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
            });
        }
    }

    return (
        <div>
            <header className="header">
                <img src={logo} alt="logo" />
                <h1>Investment Calculator</h1>
            </header>

            <InvestmentForm onResetInvestment={resetHandler} onAddInvestment={calculateHandler}></InvestmentForm>
            <InvestmentResults items={yearlyData} investment={userInput != null ? userInput["current-savings"] : 0}></InvestmentResults>
        </div>
    );
}

export default App;