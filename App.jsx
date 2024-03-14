import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {v4 as uuidv4} from 'uuid'

function App() {
  //const [expense,setexpense] =useState([{title:"food",amount:-200},{title:"Salary",amount:+100000}])
   const [expense,setexpense] =useState([])
  const [newtitle,setnewtitle]=useState('');
  const [newamount,setnewamount]=useState('');
const [apiData,setApi]=useState([]);

useEffect(()=>{
  fetch("http://localhost:2525/api/expenses")
  .then((res)=>res.json())
  .then((data)=>setexpense(data));
},[]);

console.log({expense})
  
  const calctotal=()=>{
    return expense.reduce((total,expense)=>total+expense.amount,0);
  }
  const addexpense=()=>{
    const newexpense={
      id:uuidv4(),
      title:newtitle,
      amount:parseFloat(newamount)
    }
    setexpense([...expense,newexpense]);
    setnewtitle('');
    setnewamount('');
    fetch("http://localhost:2525/api/expenses", {
   method: "POST",
   headers: {
      "Content-Type": "application/json",
   },
   body: JSON.stringify({ title: newtitle, amount: parseFloat(newamount) }),
  })
  .then((res) => res.json())
  .then((data) => setexpense([...expense, data]));
  }
 
  
  const deleteexpense=(id)=>{
    // const updateexpense=[...expense];
    // updateexpense.splice(index,1);
    // setexpense(updateexpense);
    fetch("http://localhost:2525/api/expenses/$(id)",{
      method:"DELETE",
    }).then(()=>setexpense(expense.filter((expense)=>expense_id!==id)));
  };
  return (
    <>
    <div class='div1'>
    <div>
    <h1>Expense Tracker</h1>
     <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {expense.map((expense,index)=>(
          <tr key={index}>
            <td>{expense.title}</td>
            <td style={{ color: expense.amount < 0 ? 'red' : 'yellow' }}>{expense.amount}</td>
            <td><button onClick={()=>{deleteexpense(expense_id)}}>Delete</button></td>
          </tr>
        ))}
        <tr class="heading">
          <td><b>Total</b></td>
          <td><b>{calctotal()}</b></td>
        </tr>
      </tbody>
     </table></div>
     <div>
      <br />
      <h2>Add Expenses</h2>
      <input type="text" value={newtitle} onChange={(e)=>setnewtitle(e.target.value)} placeholder='Title'/>
      <input type="number" value={newamount} onChange={(e)=>setnewamount(e.target.value)} placeholder='Amount'/> <br />
      <button onClick={addexpense}>ADD</button>
     </div></div>
    </>
  )
}

export default App
