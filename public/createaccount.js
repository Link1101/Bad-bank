function CreateAccount(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setStatus={setStatus} setShow={setShow} /> :
        <CreateMsg setStatus={setStatus} setShow={setShow} />}
    />
  )
}

function CreateMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    console.log(name, email, password);
    let req = new Request('/api/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "name": name, "email": email, password: password })
    })

    fetch(req)
      .then(response => {
        if (response.status == 200) {
          props.setShow(true);
          props.setStatus('Create Success!');
        }
        else {
          props.setShow(true);
          response.text().then(x => {
            props.setStatus(x);
          })
        }
      }).catch(err => {
        props.setStatus(string(err))
        props.setShow(true);
      })
  }

  return (<>
    Name<br />
    <input type="input"
      className="form-control"
      placeholder="Enter name"
      value={name}
      onChange={e => setName(e.currentTarget.value)} /><br />

    Email address<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br />
    Password<br />
    <input type="password"
      className="form-control"
      placeholder="Enter password"
      value={password}
      onChange={e => setPassword(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={() => handle()}>Create Account</button>

  </>);
}