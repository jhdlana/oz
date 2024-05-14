import React from 'react'
import './ExpenseItem.css'
import { MdDelete, MdEdit } from 'react-icons/md'


const ExpenseItem = ({expense, handleDelete, handleEdit}) => {
  return (
    <li className='item'>
        <div className='info'>
            <span className='expense'>{expense.charge}</span>
            <span className='amout'>{expense.amount}</span>
        </div>
        <div>
            <button 
              className='edit-btn'
              onClick={() => handleEdit(expense.id)}
            >
                <MdEdit />
            </button>
            <button className='clear-btn'
              onClick={() => {
                handleDelete(expense.id)
              }}
            >
                <MdDelete />
            </button>
        </div>
      </li>
  )
}

export default ExpenseItem

// class 컴포넌트
// export default class ExpenseItem extends Component {
//   render() {
//     return (
//       <li className='item'>
//         <div className='info'>
//             <span className='expense'>{this.props.expense.charge}</span>
//             <span className='amout'>{this.props.expense.amount}</span>
//         </div>
//         <div>
//             <button className='edit-btn'>
//                 <MdEdit />
//             </button>
//             <button className='clear-btn'
//               onClick={() => {
//                 this.props.handleDelete(this.props.expense.id)
//               }}
//             >
//                 <MdDelete />
//             </button>
//         </div>
//       </li>
//     )
//   }
// }
