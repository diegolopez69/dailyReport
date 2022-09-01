import React from 'react'

const Signin1 = React.lazy(() => import('./components/login'))

const route = [{ path: '/login', exact: true, name: 'Signin 1', component: Signin1 }]

export default route
