import React from 'react'

import './../../assets/scss/style.scss'
import Aux from '../../hooks/_Aux'
import background from '../../assets/images/background.jpg'
import { useFetchInitLogin } from '../../hooks/login'
import logoKronos from '../../assets/images/logo_kronos.svg'

const Login = () => {
    const FetchInitLogin = useFetchInitLogin()
    const { handleInputChange, Actions, data } = FetchInitLogin
    const { tryLogin, responseLogin, showPassword } = Actions
    const { message, result } = responseLogin

    const { show_password } = data

    return (
        <Aux>
            <div
                className='auth-wrapper'
                style={{
                    backgroundImage: `url(${background})`,
                }}
            >
                <form className='needs-validation' onSubmit={tryLogin}>
                    <div className='auth-content'>
                        <div className='card '>
                            <div className='card-body text-center'>
                                <div className='mb-3'>
                                    {/* <i className='feather icon-clock auth-icon' /> */}
                                    <img className='logo-kronos' src={logoKronos} alt='Logo' />
                                </div>
                                <h4 className='mb-4 text-muted strong'>{process.env.REACT_APP_APP_NAME}</h4>
                                <div className='input-group mb-3'>
                                    <input
                                        required
                                        type='text'
                                        name='username'
                                        className={`form-control btn-pill ${!result && message && 'is-invalid'}`}
                                        placeholder='Usuario'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='input-group mb-3'>
                                    <input
                                        required
                                        type={show_password ? 'text' : 'password'}
                                        name='password'
                                        className={`form-control btn-pill ${!result && message && 'is-invalid'}`}
                                        placeholder='Contraseña'
                                        onChange={handleInputChange}
                                        autocomplete='on'
                                    />
                                </div>
                                <div className='mb-3 ml-2 text-center'>
                                    {show_password ? (
                                        <>
                                            <li className='fa fa-eye-slash'></li>&nbsp;&nbsp;
                                            <spam onClick={showPassword} className='cursor'>
                                                Ocultar contraseña
                                            </spam>
                                        </>
                                    ) : (
                                        <>
                                            <li className='fa fa-eye'></li>&nbsp;&nbsp;
                                            <spam onClick={showPassword} className='cursor'>
                                                Mostrar contraseña
                                            </spam>
                                        </>
                                    )}
                                </div>
                                {message && <p className={`text-${result ? 'success' : 'danger'}`}>{message}</p>}
                                <button className='col-12 btn btn-primary shadow-1 mb-2 mt-2 btn-md btn-pill'>
                                    Acceder
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Aux>
    )
}

export default Login
