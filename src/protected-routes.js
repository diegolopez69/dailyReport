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
    { path: '/user', exact: true, name: 'User', component: User , rol:3},
    { path: '/items', exact: true, name: 'Ítems', component: Items, rol:1},
    { path: '/inventory', exact: true, name: 'Inventory', component: Inventory, rol: 2},
    { path: '/computers', exact: true, name: 'Computers', component: Computers, rol:1 },
    { path: '/classrooms', exact: true, name: 'Classrooms', component: Classrooms, rol:1},
    { path: '/revision', exact: true, name: 'Revision', component: Revision, rol:1 },
    { path: '/reports', exact: true, name: 'Reports', component: Reports, rol:1},
    { path: '/error-403', exact: true, name: 'Error403', component: Error403, rol:1 },
]

export default routes
