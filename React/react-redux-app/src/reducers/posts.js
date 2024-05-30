const posts = (state = [], action ) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return [...state, ...action.payload] // 원래 있던 state를 스프래드로 복사해서 가져오고, 그 뒤에 스프래드로 action.payload 데이터 가져와서 ...state 뒤에 넣어줌
        default:
            return state;

    }
}

export default posts;