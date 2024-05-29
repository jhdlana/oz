import React from 'react'
import { formatNumberToWon } from '../utils'

// ViewBudget의 바로 위 상위 컴포넌트인 budget컴포넌트에서 props로 내려준 
const ViewBudget = ({budget, setIsEditing}) => { //budget, setIsEditing 내려받기
  return (
    <>
        <span>예산: {formatNumberToWon(budget)}</span>
        <button
        onClick={() => setIsEditing(true)}
         type='button' className='btn btn-primary'>
            수정
        </button>
    </>
  )
}

export default ViewBudget