import Web3 from 'web3';
import Web3Modal from 'web3modal';
import store from 'store';
import { setWeb3, setAddress } from 'store/actions.js';

export const web3Modal = async () => {
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: 'ropsten', // optional
    cacheProvider: false, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  store.dispatch(setWeb3(web3));
  let currentAccount = null;
  // Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    console.log('accountChanged', accounts);
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
      store.dispatch(setAddress(null));
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      store.dispatch(setAddress(currentAccount));
    }
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    // Ropsten = 0x3
    if (chainId !== '0x3') {
      alert('Please change to Ropsten testnet');
      store.dispatch(setWeb3(null));
    }
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    console.log('connect', info);
  });

  // Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    console.log('disconnect', error);
  });
};
