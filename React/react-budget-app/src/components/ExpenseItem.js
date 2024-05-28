import React, { useContext } from 'react'
import {TiDelete} from 'react-icons/ti'
import { AppContext } from '../contexts/AppContext'

const ExpenseItem = ({id, name, cost}) => {
    // 구조분해 할당으로 AppContext(데이터 저장소)에서 삭제할 함수를 가지고 있는 dispatch만 가져오기
    const {dispatch} = useContext(AppContext)
    
    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id
        })
        // console.log('1')
    }

    return (
        <li
            className='list-group-item d-flex
            justify-content-between
            align-items-center
            '
        >
            {name}
            <div>
                <span
                    className='badge bg-secondary me-3'
                >{cost}</span>
                <TiDelete 
                    onClick={handleDeleteExpense}
                    size={'1.5em'}
                />
            </div>
        </li>
    )
}

export default ExpenseItem