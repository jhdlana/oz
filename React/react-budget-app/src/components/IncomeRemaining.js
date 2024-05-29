import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { formatNumberToWon } from '../utils'
import IncomeBudget from './IncomeBudget'

const IncomeRemaining = () => {
    const {expenses} = useContext(AppContext)

    const total = expenses.reduce((total, expense) => {
        return total += expense.cost
    }, 0)
    return (
        <div className='alert alert-secondary p-4'>
            총 지출: {formatNumberToWon(total)}
        </div>
    )
}

export default IncomeRemaining