import React from "react";
import BalanceDisplay from './BalanceDisplay';
import ExpenseList from './ExpenseList';

const DisplayBudget = () => {
    return (
        <div className="card card-body">
            <h3 className="text-center">Informace o rozpočtu</h3>
            <BalanceDisplay />
            <ExpenseList />
        </div>
    )
}

export default DisplayBudget