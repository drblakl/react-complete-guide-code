import './ExpenseItem.css'

// A Component in React is a javascript function
// Can also use object destructuring in param list
//function ExpenseItem(date, title, amount) {
function ExpenseItem(props) {
    return (
        <div className="expense-item">
            <div>{props.date.toISOString()}</div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;