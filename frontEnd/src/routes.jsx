import App from './App.jsx';
import ErrorPage from './components/ErrorPage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Authenticated from './components/Authenticated.jsx'

const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/signup',
        element: <Signup/>,
        errorElement: <ErrorPage/>,
    },
    {
        element: <Authenticated/>,
        children: [
            {
                path: '/home',
                element: <Home/>,
            }
        ]
    }
]

export default routes;