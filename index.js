const express = require('express');
const http = require('http');
const path = require('path');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
const dal = require('./dal.js');
const app = express();

const PORT = process.env.PORT || 3000

const SESSION_SECRET = 'session-secret'

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
    preflightContinue: true,
    exposedHeaders: ["Access-Control-Allow-Credentials"],
};

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(SESSION_SECRET));

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));

// Auth0 Logout
app.get('/logout', function (req, res) {
    console.log('callback');
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/#/login`);
        }
    });
});

// Auth0 Login Redirect Callback
app.get('/callback', function (req, res) {
    console.log('callback');
    res.redirect(`/#${req.url}`)
});

// Create Account
app.post('/api/create', function (req, res) {
    let data = req.body
    dal.find(data.email).
        then((users) => {
            // if user exists, return error message
            if (users.length > 0) {
                console.log('User already in exists');
                res.status(500).send('User already in exists');
            }
            else {
                // else create user
                if (data.name == null | data.name == undefined || data.name.length < 1) {
                    var num = GetRandomNum(10000000, 99999999);
                    data.name = `Customer_${num}`

                }
                dal.create(data.name, data.email, data.password).
                    then((user) => {
                        console.log(user)
                        let res_data = { email: data.email, name: data.name, balance: data.balance }
                        console.log(res_data);
                        res.send(res_data);
                    });
            }

        });
});

// UserName & Password Login
app.post('/api/login', function (req, res) {
    let data = req.body
    dal.find(data.email).
        then((users) => {
            // if user exists, return error message
            if (data.loginType == 1 && users.length < 1) {
                res.status(500).send('Either the email address or the password was entered incorrectly.');
            }
            else {
                // Oauth2 Login Type
                if (data.loginType == 1 && users[0].password != data.password) {
                    return res.status(500).send('Either the email address or the password was entered incorrectly.');
                }

                console.log(data)
                req.session.user = data;
                res.send(data);
            }
        });
});

//Get User Profile & Balance
app.post('/api/profile', function (req, res) {
    let email = req.session?.user?.email
    if (!email || email.length < 1)
        return res.status(401).send('Require login');
    dal.find(email).
        then((users) => {
            if (users.length < 1) {
                res.status(500).send("The user doesn't existing.");
            }
            else {
                let res_data = { email: users[0].email, name: users[0].name, balance: users[0].balance }
                res.send(res_data);
            }
        });
});

//Update user name and balance
app.post('/api/update', function (req, res) {
    let email = req.session?.user?.email
    if (!email || email.length < 1)
        return res.status(401).send('Require login');
    reqData = req.body
    dal.find(email).
        then((users) => {
            if (users.length < 1) {
                res.status(500).send("The user doesn't existing.");
            }
            else if (Number(reqData.balance) < 0) {
                res.send({ code: 500, msg: "The balance cannot be less than zero." });
            }
            else {
                dal.update2(email, reqData.name, Number(reqData.balance)).
                    then((response) => {
                        console.log(response);
                        res.send(response);
                    });
            }
        });
});

// Get User Account balance
app.post('/api/balance', function (req, res) {
    let email = req.session?.user?.email
    if (!email || email.length < 1)
        return res.status(401).send('Require login');
    dal.find(email).
        then((users) => {
            if (users.length < 1) {
                res.send({ code: 500, msg: "The account doesn't existing." });
            } else {
                console.log(users[0]);
                res.send(users[0]);
            }
        })
});

// Bank account with depoist amount.
app.post('/api/depoist', function (req, res) {
    let email = req.session?.user?.email
    if (!email || email.length < 1)
        return res.status(401).send('Require login');

    let data = req.body;
    var amount = Number(data.amount);

    dal.find(email).
        then((users) => {
            if (users.length < 1) {
                return res.send({ code: 500, msg: "The account doesn't existing." });
            }
            else {
                dal.update(email, amount).
                    then((response) => {
                        console.log(response);
                        res.send(response);
                    });
            }
        });
});

// Bank account with draw amount.
app.post('/api/withDraw', function (req, res) {
    let email = req.session?.user?.email
    if (!email || email.length < 1)
        return res.status(401).send('Require login');
    let data = req.body;
    var amount = Number(data.amount);
    dal.find(email).
        then((users) => {
            if (users.length < 1) {
                res.send({ code: 500, msg: "The account doesn't existing." });
            }
            else {
                if (users[0].balance < amount) {
                    return res.send({ code: 500, msg: "You have insufficient balance in your account." });
                }
                let finalAmount = -1 * amount
                dal.update(email, finalAmount).
                    then((response) => {
                        console.log(response);
                        res.send(response);
                    });
            }
        });
});

// Get all user account
app.get('/api/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


var httpServer = http.createServer(app);

httpServer.listen(PORT, function () {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});