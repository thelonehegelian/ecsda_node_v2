import Wallet from './Wallet';
import Transfer from './Transfer';
import './App.scss';
import { useState } from 'react';
import CreateSignature from './CreateSignature';
import Instructions from './Instructions';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <CreateSignature />
      <Instructions />
    </div>
  );
}

export default App;
