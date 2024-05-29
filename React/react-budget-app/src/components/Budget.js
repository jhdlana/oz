import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import EditBudget from './EditBudget'
import ViewBudget from './ViewBudget'

const Budget = () => {
    // EditBudget 컴포넌트와 ViewBudget 컴포넌트에서 같이(동시에 그 둘에게 같이 update해줘야함) 함께 budget관리를 해줘야하므로 그 둘의 상위 컴포넌트인 여기서 useContext하는 것
    //-> 그래서 같이 각각의 하위 컴포넌트에 budget 내려주기
    const {budget, dispatch} = useContext(AppContext)

    // 수정하기 버튼을 눌렀을 때 수정 하는 중과 아닌 상태를 나타내기 (수정 상태를 나타내기)
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div className='
            alert alert-primary p-3 d-flex align-items-center justify-content-between
        '>
            {isEditing ? // 삼항 연산자 a ? true : false
            // 수정 중일때 EditBudget 컴포넌트 렌더링 
            <EditBudget dispatch={dispatch} setIsEditing={setIsEditing} budget={budget}/>
            :
            // 수정중이 아닐때 
            <ViewBudget setIsEditing={setIsEditing} budget={budget}/>
        }
        </div>
    )
}

export default Budget