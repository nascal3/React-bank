import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useReducer, useState} from "react";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Nav from "./Nav";

function App() {
    function reducer(state, action) {
        resetAmount()
        const map = {
            withdraw: {
                ...state,
                balance: state.balance - action.payload
            },
            deposit: {
                ...state,
                balance: state.balance + action.payload
            }
        }

        return map[action.type]
    }
    function resetAmount() {
        setAmount(()=>0)
    }

    const [amount, setAmount] = useState(0);
    const [state, dispatch] = useReducer(reducer, { balance: 0});

  return (
      <>
          <div className="App">
              <strong>Balance: </strong>{state.balance}
              <div>
                  <input
                      onChange={(e) => setAmount(e.target.value)} type='text'
                      value={amount}
                  />
              </div>
              <div>
                  <button onClick={() => dispatch({type: 'deposit', payload: Number(amount)})}>Deposit</button>
                  <button onClick={() => dispatch({type: 'withdraw', payload: Number(amount)})}>Withdraw</button>
              </div>
          </div>
          <BrowserRouter>
              <Nav></Nav>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<h1>404</h1>} />
              </Routes>
          </BrowserRouter>
      </>

  )

}

export default App;
