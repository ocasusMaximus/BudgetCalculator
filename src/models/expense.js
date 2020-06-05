const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    expenseTitle: String,
    amount: String,
    date: {
        type: String,
        default: Date.now()
    }
});

const expense = mongoose.model('Expense', expenseSchema);

module.exports = expense;