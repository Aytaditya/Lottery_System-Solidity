const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
const {Web3} = require('web3');
const {abi,bytecode} = require('./compile');

dotenv.config(); // to use the environment variables

const provider = new HDWalletProvider(
    process.env.MNOMONS,"https://sepolia.infura.io/v3/4a0c53a5e4d34ddfa9725982d54c25b5"
)

const web3 = new Web3(provider); // instance of web3

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from account', accounts[0]);
        //console.log(process.env.MNOMONS);

        const result = await new web3.eth.Contract(abi)
            .deploy({ data: bytecode })
            .send({ from: accounts[0], gas: '2000000' });

        console.log(abi);
        console.log('Contract deployed to', result.options.address);
        
    } catch (error) {
        console.error('Error deploying contract:', error);
    } finally {
        provider.engine.stop(); // Ensure the provider is properly stopped
    }
};

deploy();// call the deploy function