import axios from "axios"

export const fetchPosts = () => {
    return async function fetchPostThunk(dispatch, getState) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(response) // console에서 응답받은 responses확인 가능 & responses.data는 responses에서 data가 들온걸 확인 가능
        // posts 상태에 데이터(response.data) 넣기
        dispatch({type: 'FETCH_POSTS', payload: response.data}) // console에서 data 배열 확인해보면 100개의 객체가 있고 각각 id, userId, title갖음
    
    }
    }

