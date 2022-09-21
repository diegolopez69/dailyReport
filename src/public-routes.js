import React from 'react'

const LogIn = React.lazy(() => import('./components/login'))
const SignUp = React.lazy(() => import('./components/signup'))

const route = [
    { path: '/login', exact: true, name: 'Signin 1', component: LogIn },
    { path: '/signup', exact: true, name: 'SignUp 1', component: SignUp }
]


export default route
