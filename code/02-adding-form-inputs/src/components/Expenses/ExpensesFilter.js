import React, { useState } from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {

    const [selectedYear, setSelectedYear] = useState('');

    const yearChangeHandler = (event) => {
        setSelectedYear(event.target.value);
        console.log("Filter User selected: " + selectedYear);
        props.onFilterChanged(selectedYear);
    }


    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select onChange={yearChangeHandler}>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;