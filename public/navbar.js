function NavBar(props) {
  const [userInfo, setUserInfo] = React.useState(null);

  if (!window.refreshuser) {
    window.refreshuser = () => {
      let text = window.localStorage['user']
      let user = text ? JSON.parse(text) : null
      setUserInfo(user)
    }
    window.refreshuser()
  }

  React.useEffect(() => {
    if (!userInfo) {
      getProfile((data) => {
        if (data)
          setUserInfo(data)
      });
    }
  }, []);

  function logout() {
    let loginType = window.localStorage['loginType']
    window.localStorage.removeItem('user')
    window.refreshuser()
    if (loginType == 2) {
      auth_ins.logout({ logoutParams: { returnTo: `${location.origin}/logout` } });
    }
    else {
      window.location.href = '/logout'
    }
  }

  return (
    <div id="navbar" className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">DH Sun's BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" >
            <li className={userInfo ? "d-none" : "nav-item"}>
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#/login/">Login</a>
            </li> */}
            <li className={userInfo ? "nav-item" : "d-none"}>
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className={userInfo ? "nav-item" : "d-none"}>
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className={userInfo ? "nav-item" : "d-none"}>
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
            <li className={userInfo ? "nav-item" : "d-none"}>
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="btn float-right" >
            <div className={userInfo ? "d-none" : "d-block"}>
              <a className="nav-link" href="#/login/">Login</a>
            </div>
          </div>
          <div className={userInfo ? "d-block" : "d-none"}>
            <ul className="navbar-nav">
              <li className="nav-item align-self-center mx-auto ">
                <a className="nav-link" href="#/profile/">{userInfo?.name}({userInfo?.email}) </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-light" onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </div >
  );
}