import React from 'react'
import Aux from '../../../../../hooks/_Aux'
import logoKronos from '../../../../../assets/images/logo_kronos.svg'

const navLogo = props => {
    let toggleClass = ['mobile-menu']
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on']
    }

    return (
        <Aux>
            <div className='navbar-brand header-logo'>
                
                <a href className={toggleClass.join(' ')} id='mobile-collapse' onClick={props.onToggleNavigation}>
                    <span />
                </a>
                <a href className='b-brand'>
                    {/* <img className='logo-kronos-nav-logo' src={logoKronos} alt='Logo' /> */}
                    <i className='feather icon-bar-chart-2 auth-icon' />
                    <span className='b-title'>{process.env.REACT_APP_APP_NAME}</span>
                </a>
            </div>
        </Aux>
    )
}

export default navLogo
