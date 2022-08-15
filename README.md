### NBT Testing Dashboard App
This projects includes a sample single page application to utilize in technical challenges for hiring.

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app) and it uses hard coded
API from the address [http://localhost:3009](http://localhost:3009). 
Please make sure before that the API is running.


### Scope 
Intention of the application to provide a dashboard for NBT testing.
This project includes intentional bugs to challenge the candidates.

Application consist of the following sections:

- Login
- Dashboard Page
- Company Listing
- Company Details
  - Company Projects
    - Project Edit
    - Project Create
  - Company Users
    - User Details
- Company Edit
- Company Create

There are two users in the application:
- User with the admin rights, that can add and remove things.
  - email: `admin@test.com`
  - password: `Oufo@i8a`
- User with the read only rights, that can only see the dashboard.
  - email: `user@test.com`
  - password: `Joh:fai4`: 

### Setup

Please clone or take a copy of the repository and navigate to the `project` directory, and execute 
the following commands.

```shell
npm install
npm start


Compiled successfully!

You can now view nbt-testing-dashboard-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://xxx.xxx.xxx.xxx:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.

```

The application start serving from the address [http://localhost:3000](http://localhost:3000).
You can visit and see the application in the browser.
