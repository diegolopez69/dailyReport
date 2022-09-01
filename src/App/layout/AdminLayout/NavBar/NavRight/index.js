import React from 'react'
import { Dropdown } from 'react-bootstrap'

import Aux from '../../../../../hooks/_Aux'

import Avatar1 from '../../../../../assets/images/user/avatar-2.jpg'
// import Notifications from './notifications/index'

const NavRight = props => {
    const closeSession = () => {
        localStorage.clear()
        window.location.href = `/login`
    }

    return (
        <Aux>
            <ul className='navbar-nav ml-auto'>
                {/* <li>
                    <Notifications {...props} />
                </li>
                | */}
                <li>
                    <Dropdown alignRight={!props.rtlLayout} className='drp-user'>
                        <Dropdown.Toggle variant={'link'} id='dropdown-basic'>
                            <i className='icon feather icon-settings' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className='profile-notification'>
                            <div className='pro-head'>
                                <img src={Avatar1} className='img-radius' alt='User Profile' />
                                <span>{localStorage.getItem('user')}</span>
                                <a
                                    href='login'
                                    className='dud-logout cursor'
                                    title='Cerrar sesión'
                                    onClick={closeSession}
                                >
                                    <i className='feather icon-log-out' />
                                </a>
                            </div>
                            {/* <ul className='pro-body'>
                                <li>
                                    <div
                                        className='dropdown-item cursor'
                                        onClick={closeSession}
                                        onMouseOver={() => console.log('LOL')}
                                    >
                                        <i className='feather icon-log-out' />
                                        &nbsp; Cerrar sesión
                                    </div>
                                </li>
                            </ul> */}

                            <ul className='pro-body'>
                                <li>
                                    <a href className='dropdown-item'>
                                        <i className='feather icon-user' /> Mi perfil
                                    </a>
                                </li>
                                {/* <li>
                                    <a href className='dropdown-item'>
                                        <i className='feather icon-mail' /> Notificaciones
                                    </a>
                                </li> */}
                                <li>
                                    <a href className='dropdown-item'>
                                        <i className='feather icon-settings' />
                                        Configuraciones
                                    </a>
                                </li>
                                <li>
                                    <a href className='dropdown-item'>
                                        <i className='feather icon-alert-triangle' /> Informar un error
                                    </a>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </Aux>
    )
}

export default NavRight
