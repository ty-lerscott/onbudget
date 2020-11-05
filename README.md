This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## DATABASE STRUCTURE
users
    <user-id>
        transactions
            [
                {
                    date: time in millisecons
                    amount: Number (Float)
                    description: String
                    categoryId: CategoryId
                }
                ...
            ]
        categories
            [
                {
                    color: hex value
                    name: String
                    isBill: Boolean
                    isDeposit: Boolean
                }
                ...
            ]

Every user must be created with an other category

Using Sentry for error tracking
If solving a sentry bug, include the issue # within the commit