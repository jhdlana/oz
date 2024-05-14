import { useState } from "react";
import './App.css'
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";


const App = () => {

  // class 컴포넌트 constructor()
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     expenses: [
  //       {id : 1, charge: '콜라', amount: 2000},
  //       {id : 2, charge: '빵', amount: 1000},
  //       {id : 3, charge: '맥북', amount: 20000},
  //     ]
  //   }
  // }

  // initialExpenses = [
  //   {id : 1, charge: '콜라', amount: 2000},
  //   {id : 2, charge: '빵', amount: 1000},
  //   {id : 3, charge: '맥북', amount: 20000},
  // ]

  const [expenses, setExpenses] = useState([
          {id : 1, charge: '콜라', amount: 2000},
          {id : 2, charge: '빵', amount: 1000},
          {id : 3, charge: '맥북', amount: 20000},
  ])

  // charge는 state 상태값을 나타냄, setCharge는 charge의 setter함수 의미
  const [charge, setCharge] = useState("") //("")는 state의 초기 상태를 나타냄 ("")=== 빈칸을 의미
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState('')


  const [edit, setEdit] = useState(false)


  const [alert, setAlert] = useState({show: false})

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id)
    const {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setId(id)
    setEdit(true)
  }

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleDelete = (id) => {
    // class 컨테이너 : const newExpenses = this.initialExpenses.filter(initialExpenses =>  initialExpenses.id !== id)
    const newExpenses = expenses.filter(expenses =>  expenses.id !== id)

    // class 컨테이너 : this.setState({expenses: newExpenses})
    setExpenses(newExpenses)
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다."})

    console.log('newExpenses',newExpenses)
  }

  const clearItems = () => {
    setExpenses([])
  }

  const handleSubmit = (e) => {
    e.preventDefault() // 제출 버튼 누를때마다 refresh(새로고침) 되는것을 방지
    if(charge !== "" && amount > 0) {

      if(edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item;
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: "success", text:"아이템이 수정되었습니다."})

      } else {
        const newExpense = {id: crypto.randomUUID(), charge, amount}

        const newExpenses = [...expenses, newExpense]
  
        setExpenses(newExpenses)

        handleAlert({type: "success", text: "아이템이 생성되었습니다."})
      }
     
      setCharge("")
      setAmount(0)
      
      
    } else {
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며 amount 값은 0보다 커야합니다."})
    }
  }

  const handleAlert = ({ type, text}) => {
    setAlert({ show: true, type, text})
    setTimeout(() => {
      setAlert({show: false})
    } , 7000)
  }

    return (
      <main className="main-container">
        <div className="sub-container">
          {alert.show ? <Alert type ={alert.type} text={alert.text}/> : null}
          <h1>장바구니</h1>

          <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
            { /* Expense Form */}
            <ExpenseForm charge = {charge} handleCharge={handleCharge}
            amount={amount} handleAmount={handleAmount}
            handleSubmit={handleSubmit} edit={edit}/>
          </div>

          <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
            { /* Expense List */}
            <ExpenseList initialExpenses={expenses}  handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} expenses={expenses}/>
          </div>

          <div style={{display:'flex', justifyContent: 'start', marginTop: '1rem'}}>
            <p style={{fontSize: '2rem'}}>
              총합계:
              <span>
                {expenses.reduce((acc, cur) => {
                  return (acc += cur.amount)
                }, 0)} 원
              </span>
            </p>
          </div>
        </div>
      </main>
    )
}

export default App;