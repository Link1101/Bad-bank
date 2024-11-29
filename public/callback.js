async function CallBack() {
    console.log('callback')
    const redirectResult = await auth_ins.handleRedirectCallback();
    console.log(redirectResult)
    const user = await auth_ins.getUser();

    console.log(user);

    window.localStorage['user'] = JSON.stringify(user);
    window.localStorage['loginType'] = 2;
    window.refreshuser()

    let req = new Request('/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": user.email, name: user.name, "loginType": 2 })
    })

    fetch2(req, (data) => { window.location.href = '/' })
}