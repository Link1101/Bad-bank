
function fetch2(req, success, err) {
    fetch(req).then(res => {
        if (res.status == 401) {
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('loginType')
            if (!location.href.startsWith("/#/login"))
                window.location.href = "/#/login"
            if(window.refreshuser)
                window.refreshuser()
        }
        res.text().then(text => {
            const data = JSON.parse(text);
            if (data.code && data.code != 200) {
                if (err) {
                    err(data?.msg)
                    return
                }
            }
            if (success) success(data)
        })

    }).catch(err => {
        console.log(err)
        if (err) err(err.message)
    })
}

function getProfile(success) {

    let req = new Request('/api/Profile', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    fetch2(req, success)
}