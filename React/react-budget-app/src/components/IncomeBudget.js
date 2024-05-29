import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { formatNumberToWon } from '../utils'

const IncomeBudget = () => {

    const {expenses, income} = useContext(AppContext)

    const expensesTotal = expenses.reduce((total, expense) => {
        return total += expense.cost
    }, 0)

    const incomeTotal = income.reduce((total, income) => {
        return total += income.cost
    }, 0)

    const balance = incomeTotal - expensesTotal
    
    return (
        <div className='alert alert-secondary p-4 alert-success'>
            남은 돈:  {formatNumberToWon(balance)}
        </div>
    )
}

export default IncomeBudget