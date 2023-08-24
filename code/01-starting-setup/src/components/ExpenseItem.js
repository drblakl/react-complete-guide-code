import ExpenseDate from './ExpenseDate';
import Card from './Card'
import './ExpenseItem.css';

// A Component in React is a javascript function
// Can also use object destructuring in param list
//function ExpenseItem(date, title, amount) {
function ExpenseItem(props) {

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </Card>
    );
}

export default ExpenseItem;