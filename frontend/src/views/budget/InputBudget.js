import React, { Component } from 'react';
import axios from 'axios';


class InputBudget extends Component {
    state = {
        amount: 0,
    }
    handleInput = (e) => {
        this.setState({ amount: Number(e.target.value) })
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }
    submit = (event) => {
        event.preventDefault();

        const payload = {
            amount: this.state.amount
        }

        this.setState({
            amount: 0,
        })

        axios({
            url: 'budget/save',
            method: 'POST',
            data: payload,
            headers: { Authorization: localStorage.getItem('jwt') }
        })
            .then(() => {
                this.props.callbackExpenses();
                this.props.budgetChanged(payload.amount);
            })
            .catch((err) => {
                console.log(err);
            })
    };


    render() {
        return (
            <div className="card card-body mb-3">
                <label>Rozpočet</label>
                <form onSubmit={this.submit} className="form-inline">
                    <input
                        onChange={this.handleInput}
                        value={this.state.amount}
                        className="form-control mr-2"
                        type="number"
                    />
                    <button type='submit' className="btn btn-dark">Odešli</button>
                </form>
            </div>
        )


    }
}

export default InputBudget