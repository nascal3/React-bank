import './App.css';
import {useReducer, useState} from "react";

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
      <div className="App">
          <strong>Balance: </strong>{state.balance}
          <div>
              <input
                  onChange={(e) => setAmount(e.target.value)} type='text'
                  value={amount}
              />
          </div>
          <div>
              <button onClick={() => dispatch({type: 'deposit', payload: Number(amount)})} >Deposit</button>
              <button onClick={()=> dispatch({type: 'withdraw', payload: Number(amount)})} >Withdraw</button>
          </div>
      </div>
  )

}

export default App;
