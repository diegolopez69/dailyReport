import React from 'react'
import { connect } from 'react-redux'

import NavLeft from './NavLeft'
import NavRight from './NavRight'
import Aux from '../../../../hooks/_Aux'
import * as actionTypes from '../../../../store/actions'
import logoKronos from '../../../../assets/images/logo_kronos.svg'

const NavBar = props => {
    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', props.headerBackColor]
    if (props.headerFixedLayout) {
        headerClass = [...headerClass, 'headerpos-fixed']
    }

    let toggleClass = ['mobile-menu']
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on']
    }

    return (
        <Aux>
            <header className={headerClass.join(' ')}>
                <div className='m-header'>
                    <a className={toggleClass.join(' ')} id='mobile-collapse1' href onClick={props.onToggleNavigation}>
                        <span />
                    </a>
                    <a href className='b-brand'>
                        {/* <div className='b-bg'>
                            <i className='feather icon-clock' />
                        </div> */}
                        <img className='logo-kronos' src={logoKronos} alt='Logo' />
                        <span className='b-title'>{process.env.REACT_APP_APP_NAME}</span>
                    </a>
                </div>
                <a className='mobile-menu' id='mobile-header' href>
                    <i className='feather icon-more-horizontal' />
                </a>
                <div className='collapse navbar-collapse'>
                    <NavLeft />
                    <NavRight rtlLayout={props.rtlLayout} />
                </div>
            </header>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        rtlLayout: state.rtlLayout,
        headerBackColor: state.headerBackColor,
        headerFixedLayout: state.headerFixedLayout,
        collapseMenu: state.collapseMenu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
