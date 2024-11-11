async function CallBack() {
    console.log('callback')
    const redirectResult = await auth_ins.handleRedirectCallback();
    console.log(redirectResult)
    const user = await auth_ins.getUser();

    console.log(user);

    window.localStorage['user'] = JSON.stringify(user);
    window.localStorage['loginType'] = 2;
    window.refreshuser()
    window.location.href = '/'
}