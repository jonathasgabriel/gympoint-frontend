# gympoint-frontend
A complete Gym management application that enables registered customers to check in the gym and submit help orders through a react-native mobile App. Gym administrators have a reactjs web application for managing customers, enrollments, plans, and help orders.

This client is implemented in  **ReactJS**, consumes the backend API available at [gympoint-backend](https://github.com/jonathasgabriel/gympoint-backend) and is used by gym administrators only. The react-native mobile application is used by customers and is available at [gympoint-mobile](https://github.com/jonathasgabriel/gympoint-mobile).

## features
- User login
- Customer creation/edition/deletion
- Plan creation/edition/deletion
- Enrollment creation/edition/deletion
- Help order answer

## some of the leveraged techs/libs/tools
- Axios
- ESLint, Prettier, EditorConfig
- Styled components
- Reactotron
- React toastify
- React redux
- Redux saga
- React date picker
- React select (async select)

## how to run

- You need to have the backend API running in order to be able to use this client. Please refer to [gympoint-backend](https://github.com/jonathasgabriel/gympoint-backend) for further instructions
- In the root directory, run `yarn` to resolve node packages and then `yarn start` to start the application (it will be available at [gympoint-localhost](http://localhost:3000/))
