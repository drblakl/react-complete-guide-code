import React from 'react';
import styles from './InvestmentResults.module.css';
import InvestmentResult from './InvestmentResult';

const InvestmentResults = props => {
    console.log(props);
    if (props.items.length === 0) {
        return (
            <table className={styles.result}><tbody><tr><td>No investment data available.  Please add new expenses.</td></tr></tbody></table>
        )
    }
    else {
        return (
            <table className={styles.result}>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Total Savings</th>
                        <th>Interest (Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map((item) => (
                            <InvestmentResult data={item}></InvestmentResult>
                        ))
                    }

                </tbody>
            </table>
        );
    }
}

export default InvestmentResults;