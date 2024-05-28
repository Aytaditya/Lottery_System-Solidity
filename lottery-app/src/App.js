/* eslint-disable react-hooks/exhaustive-deps */
import web3 from './web3';
import {useEffect,useState} from 'react';
import './App.css';

function App() {
  const [accounts,setAccounts]=useState([]); // state to store accounts
  useEffect(() => {
    const getAccounts=async()=>{
      const accounts=await web3.eth.getAccounts();
      console.log(accounts);
      setAccounts(accounts);
    }
    getAccounts();
  }, [])
  return (
    <div>
        {accounts[0]}
    </div>
  );
}

export default App;
