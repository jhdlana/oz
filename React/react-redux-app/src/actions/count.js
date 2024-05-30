import axios from "axios"

export const count= () => {
    return async function oneCountThunk(dispatch) {
        const response = await setTimeout(() => dispatch({type: 'INCREMENT'}), 1000)
        console.log(response) 
    }
    }

