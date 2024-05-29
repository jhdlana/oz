import { createContext, useReducer } from "react";

// 데이터 저장소
export const AppContext = createContext()




// 데이터를 단순히 가져가서 이용하는 것 뿐만 아니라 컨트롤(삭제, 합계 .. 등)도 해야하므로 같이 내려보내기
export const AppReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload] // payload: 데이터 전송에서 실제로 전달되고자 하는 데이터
                //!!!!!! 결국 변화된(새로운 상태) state를 리턴해주는 것!!!!!!!! -> 되돌아가서 객체 변경되어 UI 다시 랜더링됨
            }
        
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload // 선택한 값(action으로 전달받은 데이터)와 원래 있던 배열(expenses)의 각 객체(expense)의 아이디와 같이 않는 것만 남겨두기(거르기 === 배열.filter())
                )
            }

            case 'ADD_INCOME':
                return {
                    ...state,
                    income: [...state.income, action.payload] // payload: 데이터 전송에서 실제로 전달되고자 하는 데이터
                    //!!!!!! 결국 변화된(새로운 상태) state를 리턴해주는 것!!!!!!!! -> 되돌아가서 객체 변경되어 UI 다시 랜더링됨
                }
            
            case 'DELETE_INCOME':
                return {
                    ...state,
                    income: state.income.filter(
                        (income) => income.id !== action.payload // 선택한 값(action으로 전달받은 데이터)와 원래 있던 배열(expenses)의 각 객체(expense)의 아이디와 같이 않는 것만 남겨두기(거르기 === 배열.filter())
                    )
                }
        
        case 'SET_BUDGET': // 예산금액 (budget)을 바꾸고 싶으면, (지금은 30000만원)
            return{
                ...state,
                budget: action.payload // 내가 입력한 값(action.payload 액션으로인해 전송할 데이터)를 budget에 새로 넣어주기.
            }
        default: // action이 아무것도 없으면
            return state; // 원래 있던 state 리턴하기.
    }
}

// 기본 데이터 만들기
const initialState = {
    budget: 30000,
    expenses: [
        {id: crypto.randomUUID(), name: '밥먹기', cost: 1000},
        {id: crypto.randomUUID(), name: '카드비', cost: 3000},
        {id: crypto.randomUUID(), name: '교통비', cost: 7000}
    ],
    income: [
        {id: crypto.randomUUID(), name: '월급', cost: 50000},
        {id: crypto.randomUUID(), name: '용돈', cost: 20000},
    ]

}






export const AppContextProvider = (props) => {
    // const [value, setValue] = useState('');
    // useReducer은 useState와 비슷한 것으로 좀 더 복잡한 상황에서 state를 처리해야할 때 사용함 (조건(ex. action)에 따라 state가 변할때 같은 상황)
    const [state, dispatch] = useReducer(AppReducer ,initialState) // 어떠한 상황에 어떻게 처리할지를 함수로 만들고나서, 초기값은 두번째 파라미터에 넣어준다. -> state가 initialState가 됨

    // return (
    //     <AppContext.Provider value={{}}>
    //         {props.children}
    //     </AppContext.Provider>
    // )
    // ===
    return (
        <AppContext.Provider value={{
            expenses: state.expenses, // 위의 state의 초기값을 initialState로 했으므로 (state == initialState) state로 접근해서 expenses가져옴(state.expenses == initialState.expenses)
            budget: state.budget,
            income: state.income,
            dispatch
        }} {...props} />
    )
}
