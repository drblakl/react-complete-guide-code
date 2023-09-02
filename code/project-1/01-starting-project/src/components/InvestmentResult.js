import React, { useState } from 'react';



const InvestmentResult = (props) => {
    console.log("RESULTS ");
    console.log(props);
    return (
        <tr>
            <td>{props.data.year}</td>
            <td>{props.data.savingsEndOfYear}</td>
            <td>{props.data.yearlyInterest}</td>
            <td></td>
            <td></td>
            {/*<td>{item.totalInterestGained}</td>*/}
            {/*<td>{item.totalInvestedCapital}</td>*/}
        </tr>
    );

}

export default InvestmentResult;