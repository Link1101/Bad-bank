# API Interface

## List of endpoints

| Endpoints                  | Note                              |
| -------------------------- | --------------------------------- |
| [/logout](#logout)         | Auth0 logout redirect             |
| [/callback](#callback)     | Auth0 Login redirect callback.    |
| [/api/create](#create)     | Create Account                    |
| [/api/login](#login)       | Login with user name and password |
| [/api/profile](#profile)   | Get User Profile                  |
| [/api/update](#update)     | Update user name and balance      |
| [/api/balance](#balance)   | Get user balance                  |
| [/api/depoist](#depoist)   | Deposite the amount               |
| [/api/withdraw](#withdraw) | Withdraw account                  |
| [/api/all](#all)           | Get all user information          |

## Details

* <span id = "logout">Auth0 logout redirect</span>
  * EndPoint：/logout
  * Method：Get
  * Response Type：Redirect
  * Sample：<http://localhost:3000/logout>
  * Remark：Auth0 Logout redirect callback.

---

* <span id = "callback">Auth0 Login redirect callback.</span>
  * EndPoint：/callback
  * Method：Get
  * Response Type：Redirect
  * Sample：<http://localhost:3000/callback?code=sdfsdf&status=&&&&&>
  * Remark：Auth0 Login redirect callback.
  * Params：code & status

---

* <span id = "create">Create Account</span>

  * EndPoint：/api/create
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000//api/create>
  * Remark：Create Account with user name and password.
  * Request JSON：

    ```json
      {
          "name": 'Tony',
          "email": '<tony@gmail.com>',
          'password':'xds@20234'
      }
    ```

  * Response JSON：

    ```json
             {
                _id: 940807897987908
                 "name": 'Tony',
                 "email": '<tony@gmail.com>',
                 "balance":0
             }
    ```

---

* <span id = "login">Login with user name and password</span>

  * EndPoint：/api/login
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/login>
  * Remark：Login with user name and password.
  * Request JSON：

     ```json
      {
          "email": '<tony@gmail.com>',
          'password':'xds@20234'
      }
    ```

  * Response JSON：

    ```json
      {
          "name": 'Tony',
          "email": '<tony@gmail.com>'
      }
    ```

---

* <span id = "profile">Get User Profile  </span>

  * EndPoint：/api/profile
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/profile>
  * Remark：Get User Profile.
  * Response JSON：

    ```json
      {
          "name": 'Tony',
          "email": '<tony@gmail.com>',
          "balance":0
      }

    ```

---

* <span id = "update">Update user name and balance </span>

  * EndPoint：/api/update
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/update>
  * Remark：Update user name and balance.
  * Request JSON：

    ```json
      {
            "name": 'Tony',
            "balance":2000
      }
      ```

* Response JSON：

    ```json
      {
          "name": 'Tony',
          "email": '<tony@gmail.com>',
          "balance":2000
      }
    ```

---

* <span id = "balance">Get user balance   </span>

  * EndPoint：/api/balance
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/balance>
  * Remark：Get user balance.

  * Response JSON：

    ```json
      {
          "name": 'Tony',
          "email": '<tony@gmail.com>',
          "balance":2000
      }
    ```

---

* <span id = "depoist">Deposite the amount</span>

  * EndPoint：/api/depoist
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/depoist>
  * Remark：Deposite the amount.
  * Request JSON：

    ```json
      {
            "amount": "200"
      }
    ```

  * Response JSON：

    ```json
            {
              "name": "she2",
              "email": "she2",
              "balance": 425351
            }
    ```

---

* <span id = "withdraw">Withdraw account </span>

  * EndPoint：/api/withdraw
  * Method：POST
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/withdraw>
  * Remark：Deposite the amount.
  * Request JSON：

    ```json
        {
              "amount": "200"
        }
    ```

  * Response JSON：

    ```json
             {
                "name": "she2",
                "email": "she2",
                "balance": 423351
             }
    ```

---

* <span id = "all">Get all user information     </span>

  * EndPoint：/api/all
  * Method：GET
  * Content-Type：application/json; charset=utf-8
  * Sample：<http://localhost:3000/api/all>
  * Remark：Get all user information    .
  * Response JSON：

    ```json
      [
          {
              "_id": "67308b367c87f349cadb877c",
              "name": "jhn",
              "email": "jhn",
              "password": "jhn",
              "balance": 0
          }
      ]

    ```

---
