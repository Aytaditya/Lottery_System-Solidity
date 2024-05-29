/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import web3 from './web3';
import { useEffect, useState } from 'react';
import './App.css';
import lottery from './lottery';
import {Toaster} from 'react-hot-toast';
import {toast} from 'react-hot-toast';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');

  const [value, setValue] = useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(value<1){
      toast.error("Please enter a amount more than 1 ether")
      return
    }
    console.log(value);

    const accounts = await web3.eth.getAccounts(); // to get the accounts
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    });

    toast.success("Entered the lottery successfully")
    setValue("")
  }

  const pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    toast.success("Winner has been picked")
  }



  useEffect(() => {
    const getManager = async () => {
      const manage = await lottery.methods.manager().call();
      setManager(manage);

      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);

      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);

    };
    getManager();
    
  }, []);


  return (
    <>
    <Toaster />
      <div className='main'>
        <img src="/block.png" alt="blockchain logo" />
        <h2>Lottery Contract</h2>
      </div>
      <div className='container'>
        <div className="upper-layer">
          <p>This contract is managed by <span className='red'>{manager ? manager : "Loading..."}</span></p>
          <p>There are currently <span className='red'>{players.length}</span> people entered in the lottery</p>
          <p>Current balance is <span className='red'>{web3.utils.fromWei(balance, 'ether')}</span> ether</p>
        </div>
        <div className='lower-layer'>
          <div className='heading'>
            <h3>Want to try your Luck?</h3>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='spacing'>
              <label htmlFor="">Amount of Ether to Enter :</label>
              <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
              </div>
              <div className="bttn">
              <button className='btn' type='submit'>Enter Lottery</button>
              </div>
            </form>
          </div>
          <hr className='style'/>
          <div>
            <div className="heading">
              <h3>Pick a Winner?</h3>
            </div>
            <div className="bttn">
              <button className='btn' onClick={pickWinner}>Pick a Winner</button>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
