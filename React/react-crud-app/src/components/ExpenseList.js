import React, {Component} from 'react'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'


export const ExpenseList = (props) => {
  return (
    <>
        <ul className='list'>
          {props.initialExpenses.map(expense => {
            return (
              <ExpenseItem key={expense.id} expense={expense}  handleDelete={props.handleDelete}/>
            )
          })}
        </ul>
        <button className='btn'>
            목록 지우기
        </button>
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
