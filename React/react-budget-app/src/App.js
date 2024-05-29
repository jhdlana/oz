import './App.css';
// import Budget from './components/Budget';
// import Remaining from './components/Remaining';
// import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import IncomeList from './components/IncomeList';
import AddIncomeForm from './components/AddIncomeForm';
import IncomeTotal from './components/IncomeTotal';
import IncomeRemaining from './components/IncomeRemaining';
import IncomeBudget from './components/IncomeBudget';

function App() {
  return (
    <div className='container'>
      <h1 className='mt-3'>지출 계획</h1>
        <div className='row mt-3'>
          <div className='col-sm'>
            {/* <Budget /> */}
            <IncomeBudget />
          </div>
          <div className='col-sm'>
            {/* <Remaining /> */}
            <IncomeRemaining/>
          </div>
          <div className='col-sm'>
            <IncomeTotal/>
          </div>
        </div>

        <h3 className='mt-3'>지출들</h3>
        <div className='row'>
          <div className='col-sm'>
            <ExpenseList />
          </div>
        </div>

        <h3 className='mt-3'>지출 추가</h3>
        <div className='row mt-3'>
          <div className='col-sm'>
            <AddExpenseForm />
          </div>
        </div>

        <h3 className='mt-3'>수입 목록</h3>
        <div className='row'>
          <div className='col-sm'>
            <IncomeList />
          </div>
        </div>

        <h3 className='mt-3'>수입 추가</h3>
        <div className='row mt-3'>
          <div className='col-sm'>
            <AddIncomeForm />
          </div>
        </div>
    </div>
  );
}

export default App;
