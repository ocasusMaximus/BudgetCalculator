import React, { Component } from 'react';
//import { BudgetConsumer } from '../store';
import axios from 'axios';

class ExpenseList extends Component {

    state = {
        expenseTitle: '',
        amount: '',
        date:'',
        expenses: []
    }

    componentDidMount = () => {
        this.getExpense();
    }

    getExpense = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data;
            this.setState({ expenses: data })
        })
        .catch((err) => {
            alert('ERROR RETRIEVING')
        })
    }

    displayExpenses = (expenses) => {
        if(!expenses.length) return null;

        return expenses.map((expense, index) => (
            <tr key={index}>
                <td>{expense.expenseTitle}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
            </tr>
        ));
    }

    render() {
        
        return (
            <div className="card mt-5">
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Položka</th>
                            <th>Výdaje</th>
                            <th>Datum</th>
                        </tr>
                    </thead>

                   <tbody>{this.displayExpenses(this.state.expenses)}</tbody>
                </table>
            </div>
        )
    }
}

export default ExpenseList