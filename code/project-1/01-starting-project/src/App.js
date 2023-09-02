import React, { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResults from './components/InvestmentResults';

function App() {
    const [yearlyInvestmentData, setInvestmentData] = useState('');

    const resetHandler = () => {
        setInvestmentData('');
    }

    const calculateHandler = (userInput) => {
        let yearlyData = [];
        // Should be triggered when form is submitted
        // You might not directly want to bind it to the submit event on the form though...
        let currentSavings = +userInput['savings']; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput['contribution']; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput['return'] / 100;
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

        // do something with yearlyData ...
        console.log(yearlyData);

        setInvestmentData(yearlyData);
    };

    return (
        <div>
            <header className="header">
                <img src={logo} alt="logo" />
                <h1>Investment Calculator</h1>
            </header>

            <InvestmentForm onResetInvestment={resetHandler} onAddInvestment={calculateHandler}></InvestmentForm>

            {/* Todo: Show below table conditionally (only once result data is available) */}
            {/* Show fallback text if no data is available */}

            <InvestmentResults items={yearlyInvestmentData}></InvestmentResults>
        </div>
    );
}

export default App;