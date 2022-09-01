import React from 'react'
import Forbidden from '../../assets/images/user/perro.png'
// import sad from '../../assets/images/other-images/sad.png'

const Error403 = () => {
    return (
        <>
            <div className='page-wrapper text-center'>
                <img className='img-100 dog-error' src={Forbidden} alt='' />
                <div className='error-wrapper'>
                    <div className='container'>
                        <div className='error-heading'>
                            <h2 className='headline text-primary'>{'403'}</h2>
                        </div>
                        <div className='col-md-8 offset-md-2'>
                            <h5 className='text-muted'>
                                {'El acceso a esta página está restringido, es necesario solicitar permisos.'}
                            </h5>
                        </div>
                        <div>
                            <button
                                className='btn btn-primary pill'
                                onClick={() => {
                                    window.history.back()
                                    window.history.back()
                                }}
                            >
                                {'Regresar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error403
