import React from 'react'
import $ from 'jquery'
window.jQuery = $
window.$ = $
global.jQuery = $

const Error403 = React.lazy(() => import('./App/components/error403'))
const Example = React.lazy(() => import('./components/example'))
const Chromebooks = React.lazy(() => import('./components/chromebooks'))
const Inventory = React.lazy(() => import('./components/inventory'))
const Check = React.lazy(() => import('./components/check-classroom'))
const Book = React.lazy(() => import('./components/book-classroom'))
const Reports = React.lazy(() => import('./components/reports'))






const routes = [
    { path: '/example', exact: true, name: 'Example', component: Example },
    { path: '/inventory', exact: true, name: 'Inventory', component: Inventory },
    { path: '/chromebooks', exact: true, name: 'Chromebooks', component: Chromebooks },
    { path: '/check-classroom', exact: true, name: 'Check', component: Check },
    { path: '/book-classroom', exact: true, name: 'Book', component: Book },
    { path: '/reports', exact: true, name: 'Reports', component: Reports },
    { path: '/error-403', exact: true, name: 'Error403', component: Error403 },
]

export default routes
