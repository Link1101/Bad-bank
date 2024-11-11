const auth_ins = new auth0.Auth0Client({
  domain: 'dev-3s2qwxdm0a0xsm8s.us.auth0.com',
  clientId: 'ZtRs4qlozawCdOu4Jyx2utyc1HFQRM21',
  authorizationParams: {
    redirect_uri: 'http://localhost:3000/callback'
  }
});

function Login(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ?
        <LoginForm setShow={setShow} setStatus={setStatus} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function LoginMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>
      Authenticate again
    </button>
  </>);
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    let req = new Request('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "email": email, password: password })
    })
    fetch(req)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
          window.localStorage['user'] = JSON.stringify(data);
          window.localStorage['loginType'] = 1;
          var btn = document.querySelector('#navbar');
          window.refreshuser()

        } catch (err) {
          props.setStatus(text)
          console.log('err:', text);
        }
      });
  }

  const auth0_login = async function () {
    await auth_ins.loginWithRedirect();
  }


  return (<>

    Email<br />
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


      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>


      <button type="submit"
        className="btn btn-light ml-4"
        onClick={auth0_login}>Auth0 Login</button>

  </>)
}