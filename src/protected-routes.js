import React from 'react'
import $ from 'jquery'
window.jQuery = $
window.$ = $
global.jQuery = $

const Error403 = React.lazy(() => import('./App/components/error403'))
const User =  React.lazy(() => import('./components/user'))
const Items = React.lazy(() => import('./components/items'))
const Inventory = React.lazy(() => import('./components/inventory'))
const Computers = React.lazy(() => import('./components/computers'))
const Revision = React.lazy(() => import('./components/revision'))
const Classrooms = React.lazy(() => import('./components/classrooms'))
const Reports = React.lazy(() => import('./components/reports'))

const routes = [
    { path: '/user', exact: true, name: 'User', component: User },
    { path: '/items', exact: true, name: 'Ítems', component: Items },
    { path: '/inventory', exact: true, name: 'Inventory', component: Inventory },
    { path: '/computers', exact: true, name: 'Computers', component: Computers },
    { path: '/classrooms', exact: true, name: 'Classrooms', component: Classrooms },
    { path: '/revision', exact: true, name: 'Revision', component: Revision },
    { path: '/reports', exact: true, name: 'Reports', component: Reports },
    { path: '/error-403', exact: true, name: 'Error403', component: Error403 },
]

export default routes
