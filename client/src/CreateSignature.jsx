import { useState } from 'react';
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
function CreateSignature() {
  const [privateKey, setPrivateKey] = useState('');
  const [data, setData] = useState('');
  const [signature, setSignature] = useState('');
  const setValue = (setter) => (evt) => setter(evt.target.value);
  const createSig = async (evt) => {
    evt.preventDefault();
    try {
      // remove spaces from data
      const messageBytes = new TextEncoder().encode(data);
      const msgHash = keccak256(messageBytes);
      const sig = await secp.sign(msgHash, privateKey);
      // @audit is this correct?
      const sigHex = sig.reduce(
        (acc, val) => acc + val.toString(16).padStart(2, '0'),
        ''
      );
      setSignature(sigHex);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form
      style={{
        maxWidth: '472px',
        overflowWrap: 'break-word',
      }}
      className="container transfer"
      onSubmit={createSig}
    >
      <h1>Create Digital Signature</h1>
      <label>
        Private Key
        <input
          placeholder="Private Key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
          type="password"
        ></input>
      </label>

      <label>
        Data
        <input
          placeholder="separated by commas, e.g. 1,2,3"
          value={data}
          onChange={setValue(setData)}
        ></input>
      </label>
      <div>
        <p
          style={{
            maxWidth: '410px',
            overflowWrap: 'break-word',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            Signature:
          </span>{' '}
          {signature}
        </p>
      </div>
      <input type="submit" className="button" value="Create Signature" />
    </form>
  );
}

export default CreateSignature;
