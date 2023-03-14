const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  '0xbea67c33432e201a808623e780ae96d80b6ca506': 100,
  '0x10978203a444b892b0e3dd42a6e152d05a243d93': 50,
  '0x6cb9de3f7f2594856dee2309ed738b614f07d225': 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  let signatureIsValid = false;
  const { sender, recipient, amount, signature } = req.body;
  // @todo - validate the signature length
  const msg = `${amount},${recipient}`;
  const msgHash = toHex(keccak256(Buffer.from(msg)));

  const v = parseInt(signature.slice(0, 2), 16) - 48; // Subtract 48 to convert ASCII to integer

  const publicKey = secp.recoverPublicKey(msgHash, signature, v);
  // verify that the sender address and the address recovered from the public key match
  const address = `0x${toHex(publicKey.slice(-20))}`;

  console.log('address', address);
  console.log('sender', sender);

  // compare address to sender
  if (address === sender) {
    signatureIsValid = secp.verify(signature, msgHash, publicKey);
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else if (!signatureIsValid) {
    res.status(400).send({ message: 'Invalid signature!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
