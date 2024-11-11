function Profile() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Profile"
      status={status}
      body={show ?
        <ProfileForm setShow={setShow} setStatus={setStatus} /> :
        <ProfileMsg setShow={setShow} setStatus={setStatus} />}
    />
  )
}

function ProfileMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Check Profile again
    </button>
  </>);
}

function ProfileForm(props) {

  const [profile, setProfile] = React.useState({});

  function getProfile(email) {
    let requestInstance = new Request('/api/Profile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "email": email })
    })

    return fetch(requestInstance)
      .then(response => response.text())
      .then(text => {
        const data = JSON.parse(text);
        setProfile(data)
      })
  }

  function handle() {
    let req = new Request('/api/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ "email": profile.email, "name": profile.name, balance: profile.balance })
    })

    fetch(req)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          if (data.code && data.code != 200) {
            throw Error(data.msg)
          }
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(err.message || 'Update failed')
          console.log('err:', err.text);
        }
      }).catch(err => {
        props.setStatus('Update failed' + err.message)
        console.log('err:', err.message);
      });
  }

  React.useEffect(() => {
    async function fetchData() {
      if (profile && profile.email)
        return profile
      let text = window.localStorage['user']
      let user = text ? JSON.parse(text) : {}
      let loginType = window.localStorage['loginType']
      if (loginType == 2) {
        // Maybe No User for Auth0
        return setProfile(user)
      }
      getProfile(user.email);
    }
    fetchData();
  }, []);

  return (<>
    <form>
      <div className="form-group">
        <div className="form-group">
          <label htmlFor="inputEmail">   Email:</label>
          <input type="text" disabled className="form-control" id="inputEmail" value={profile?.email || ''} placeholder="Email" />
        </div>
        <label htmlFor="inputName">Name:</label>
        <input type="label" className="form-control" value={profile?.name || ''} onChange={e => setProfile({ ...profile, name: e.currentTarget.value })} placeholder="Name" />
      </div>
      <div className="form-group">
        <label htmlFor="inputBalance">   Balance:</label>
        <input type="text" className="form-control" id="inputBalance" value={profile?.balance || ''} onChange={e => setProfile({ ...profile, balance: e.currentTarget.value })} placeholder="Balance" />
      </div>
      <button type="submit" onClick={handle} className="btn btn-primary">Update</button>
    </form>
  </>);
}