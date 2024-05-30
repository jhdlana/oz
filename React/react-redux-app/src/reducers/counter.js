// reducer 함수는 두개의 매개변수를 받음 (이전 상태, action 객체(type, payload를 가짐)) 
// counter 를 위한 reducer 함수
const counter = (state = 0, action) => { // 초기값을 나타내는게 없다면, 매개변수 안에서 지정(state=0)
    switch (action.type) {
        case 'INCREMENT':
            return state + 1; // => return 하는 값이 store state를 update 시킴 ==> react component rerendering 됨.
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    
    }
}

export default counter; // 이 reducer 함수를 다론 곳(컴포넌드들)에서도 사용해야하기 때문에 export 하기.
