import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { formatNumberToWon } from '../utils'

const IncomeTotal = () => {
    const {income} = useContext(AppContext)

    const total = income.reduce((total, income) => {
        return total += income.cost
    }, 0)
    return (
        <div className='alert alert-secondary p-4 alert-success'>
            총 수입: {formatNumberToWon(total)}
        </div>
    )
}

export default IncomeTotal