import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
    // 구조분해 할당으로 value에서 필요한 부분만 가져옴(expenses)만.
    const {expenses} = useContext(AppContext) // AppContext 는 데이터 저장소 -> useContext()로 return하는 value를 가져올수있음
    console.log(expenses);
    
    // Form에서 아이템을 추가하면 fillteredExpenses 상태를 추가한 아이템까지 포함해서 새로 업데이트 새켜줘야함.
    useEffect(() => {
        setFilteredExpenses(expenses)
    }, [expenses])
    

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []) // useState 값이 있으면 expenses, 없으면 [] 빈배열
    const handleChange = (e) => {
        console.log(e.target.value);
        
        const searchResults = expenses.filter((expense) => { // 빈 문자열은 모든 문자열에 포함되어 있으므로, 사용자가 입력한 값이 비어 있을 때 모든 항목이 조건에 맞으므로, 원래 배열이 다시 나타남.
            // 사용자가 입력한 값을 포함(includes)하는 항목만 필터링
            const result = expense.name.toLowerCase().includes(e.target.value);
            console.log(expense); // 필터링되는 각 항목을 로그에 출력
            console.log(result)
            return result; // 필터링 결과 반환
        });
    
        setFilteredExpenses(searchResults);
        console.log(searchResults); // 필터링 결과를 로그에 출력
    }
    

    return (
        <>
            <input
                type='text'
                className='form-control'
                placeholder='검색하기...'
                onChange={handleChange}
            />
            <ul className='list-group mt-3 mb-3'>
                {filteredExpenses.map((expense) => (
                    <ExpenseItem 
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        cost={expense.cost}
                    />
                ))}
            </ul>
        </>
    )
}

export default ExpenseList