# BAD BANK DEMO

## Requirements

![image](https://github.com/user-attachments/assets/0e03bcf6-1857-415a-8624-6c3b27b09b5f)

## Tech Stack

- **ReactJS** [ReactJS](https://react.dev/)
- **Material UI:** [Material UI](https://mui.com/material-ui) library
- **Bootstrap** [Bootstrap UI](https://mui.com/material-ui)
- **Server:** [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **OAuth2.0:** [Auth0](https://auth0.com/)

## System Design

![System Design](/docs/design.png)

## SetUp

- Config the Auth0 public/login.js

  ``` js
  domain: 'dev-******.us.auth0.com',
  clientId: 'ZtRs4ql*******yx2utyc1HFQRM21',
  authorizationParams: {
    redirect_uri: '<http://localhost:3000/callback>'
  }
  ```

- Config the MongoDB

## Running Application

- Navigate into project directory `cd frontend`
- `npm install`
- `npm start`
- Access "<http://localhost:3000>"
