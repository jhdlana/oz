import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import IncomeItem from './IncomeItem';

const IncomeList = () => {
    // 구조분해 할당으로 value에서 필요한 부분만 가져옴(expenses)만.
    const {income} = useContext(AppContext) // AppContext 는 데이터 저장소 -> useContext()로 return하는 value를 가져올수있음
    console.log(income);
    


    // // Form에서 아이템을 추가하면 fillteredExpenses 상태를 추가한 아이템까지 포함해서 새로 업데이트 새켜줘야함.
    // useEffect(() => {
    //     setFilteredExpenses(expenses)
    // }, [expenses])
    

    
    const [incomeList, setIncomeList] = useState(income)

    useEffect(() => {
      setIncomeList(income)
    }, [income])
    

    return (
        <>
            <ul className='list-group mt-3 mb-3'>
                {incomeList.map((income) => (
                    <IncomeItem
                        key={income.id}
                        id={income.id}
                        name={income.name}
                        cost={income.cost}
                    />
                ))}
            </ul>
        </>
    )
}

export default IncomeList