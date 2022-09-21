import React from 'react'
import $ from 'jquery'
window.jQuery = $
window.$ = $
global.jQuery = $

const Error403 = React.lazy(() => import('./App/components/error403'))

const Example = React.lazy(() => import('./components/example'))
const User = React.lazy(() => import('./components/user'))

const routes = [
    { path: '/example', exact: true, name: 'Example', component: Example },
    { path: '/user', exact: true, name: 'User', component: User },
    { path: '/error-403', exact: true, name: 'Error403', component: Error403 },
]

export default routes
