
// todos reducer 함수 만들기
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.text] // text는 payload인데 꼭 이름을 payload로 안해도 됨.
        default:
            return state;
    }
}

// [
//     '밥먹기', '운동하기'
// ]

export default todos;