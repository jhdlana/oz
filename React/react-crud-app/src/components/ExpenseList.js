import React from 'react'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'
import { MdDelete } from 'react-icons/md'


export const ExpenseList = ({initialExpenses, handleDelete, handleEdit, clearItems, expenses }) => {
  return (
    <>
        <ul className='list'>
          {initialExpenses.map(expense => {
            console.log(expense.id)
            console.log('abc')
            return (
              <ExpenseItem key={expense.id} expense={expense}  handleDelete={handleDelete} handleEdit={handleEdit}/>
            )
          })}
        </ul>
        {expenses.length > 0 ? 
          <button className='btn' onClick={clearItems}> 
            목록 지우기
            <MdDelete className='btn-icon'/>
         </button>
          : null  
        }           
      </>
  )
}

export default ExpenseList

// class 컴포넌트
// export default class ExpenseList extends Component {

//   render() {
//     return (
//       <>
//         <ul className='list'>
//           {this.props.initialExpenses.map(expense => {
//             return (
//               <ExpenseItem key={expense.id} expense={expense}  handleDelete={this.props.handleDelete}/>
//             )
//           })}
//         </ul>
//         <button className='btn'>
//             목록 지우기
//         </button>
//       </>
//     )
//   }
// }
