const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
   
    expenseTitle: String,
    amount: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    userName: String,
});

const expense = mongoose.model('Expense', expenseSchema);

module.exports = expense;