function Instructions() {
  return (
    <div
      style={{
        maxWidth: '472px',
        overflowWrap: 'break-word',
      }}
      className="container transfer"
    >
      <h1>Information</h1>

      <div>
        <p
          style={{
            maxWidth: '410px',
            overflowWrap: 'break-word',
          }}
        >
          {/* ordered lists */}
          <ol>
            <li>
              {' '}
              Create a Signature using the amount and recipient address as data:
              10,0x...{' '}
            </li>
            <li>
              {' '}
              Copy the Signature and paste it in the Signature field in the
              Transfer box to make a transfer{' '}
            </li>
            <li>
              Currently, only works with the following address as they are
              hardcoded:
              <li>0xbea67c33432e201a808623e780ae96d80b6ca506</li>
              <li>0x10978203a444b892b0e3dd42a6e152d05a243d93</li>
              <li>0x6cb9de3f7f2594856dee2309ed738b614f07d225</li>
            </li>
            Note: private keys and public keys can be found in the accounts.json
            in the root directory of the repo.
          </ol>
        </p>
      </div>
    </div>
  );
}

export default Instructions;
