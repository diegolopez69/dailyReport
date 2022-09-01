import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import '../../node_modules/font-awesome/scss/font-awesome.scss'

import Loader from './layout/Loader'
import Aux from '../hooks/_Aux'
import ScrollToTop from './layout/ScrollToTop'
import routes from '../public-routes'
import { ToastContainer } from 'react-toastify'

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader,
})

const App = () => {
    const menu = routes.map((route, index) => {
        return route.component ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => <route.component {...props} />}
            />
        ) : null
    })

    return (
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        {menu}
                        <Route path='/' component={AdminLayout} />
                    </Switch>
                    <ToastContainer />
                </Suspense>
            </ScrollToTop>
        </Aux>
    )
}

export default App
