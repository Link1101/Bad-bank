function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
  )

}

function BalanceMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Check balance again
    </button>
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');

  function handle() {
    let requestInstance = new Request('/api/balance', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "email": email })
    })

    fetch(requestInstance)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          if (data.code && data.code != 200) {
            throw Error(data.msg)
          }
          props.setStatus(`Balance: ${data.balance}`);
          props.setShow(true);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(err.message || 'Load Balance failed')
          console.log('err:', err.text);
        }
      }).catch(err => {
        props.setStatus('Load Balance failed' + err.message)
        console.log('err:', err.message);
      });
  }

  return (<>

    Email<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>
      Check Balance
    </button>

  </>);
}