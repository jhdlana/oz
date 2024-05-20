import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "373d9b954db55da43c8811df1e88522d",
        language: "ko-KR"
    }
})

export default instance