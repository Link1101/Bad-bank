function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ?
        <DepositForm setShow={setShow} setStatus={setStatus} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Deposit again
    </button>
  </>);
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState('');

  function handle() {
    let req = new Request('/api/depoist', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ amount: amount })
    })

    function success(data) {
      props.setStatus(`Balance: ${data.balance}`);
      props.setShow(true);
    }

    function error(message) {
      props.setStatus(message || 'Deposit failed')
      console.log('err:', message);
    }

    fetch2(req, success, error)
  }

  return (<>

    {/* Email<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email} onChange={e => setEmail(e.currentTarget.value)} /><br /> */}

    Amount<br />
    <input type="number"
      className="form-control"
      placeholder="Enter amount"
      value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>Deposit</button>

  </>);
}