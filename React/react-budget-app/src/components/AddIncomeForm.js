import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

const AddIncomeForm = () => {

    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)

    const {dispatch} = useContext(AppContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        const income = {
            id: crypto.randomUUID(),
            name: name,
            cost: cost
        }

        dispatch({
            type: 'ADD_INCOME',
            payload: income
        })

        setName('')
        setCost(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-sm col-lg-4'>
                <label>수입</label>
                <input 
                    required="required"
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                </div> 
                <div>
                    <label>금액</label>
                    <input 
                        required="required"
                        type='number'
                        className='form-control'
                        id='cost'
                        value={cost}
                        onChange={(e) => setCost(e.target.valueAsNumber)} // 입력하게 되면 스트링 값(value)로 들어가게 돼서 Number타입으로 값(value)바꿔주기 === valueAsNumber
                    />
                </div>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <button type='submit' className='btn btn-primary'>
                            추가
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddIncomeForm