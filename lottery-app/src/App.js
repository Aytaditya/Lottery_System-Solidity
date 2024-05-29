/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import web3 from './web3';
import {useEffect, useState} from 'react';
import './App.css';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    const getManager = async () => {
      const manage=await lottery.methods.manager().call();
      setManager(manage);
    
    };
    getManager();
  }, []);
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by <span className='red'>{manager ? manager : "loading..."}</span></p>
    </div>
  );
}

export default App;
