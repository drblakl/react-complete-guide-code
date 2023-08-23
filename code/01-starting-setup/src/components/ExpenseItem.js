import './ExpenseItem.css'

// A Component in React is a javascript function
function ExpenseItem() {
    return (
        <div className="expense-item">
            <div>March 28th 2021</div>
            <div className="expense-item__description">
                <h2>Car Insurance</h2>
                <div className="expense-item__price">$249.67</div>
            </div>
        </div>
    );
}

export default ExpenseItem;