import React from 'react'
import Alert from '@mui/material/Alert'

const ERRORS = ({ errorProps }) => {
    const { errors, handleDeleteError } = errorProps

    return (
        <>
            {errors.map(({ message, status, location, errorId }) => {
                if (typeof message === 'object') {
                    return message.map(({ msg, param }) => {
                        return (
                            <div className='mb-2'>
                                <Alert
                                    severity={typeof message === 'object' ? 'warning' : 'error'}
                                    onClose={() => handleDeleteError(errorId)}
                                >
                                    {`${msg} ${param} - Por favor verifique que no haya borrado campos importantes!`}
                                </Alert>
                            </div>
                        )
                    })
                } else {
                    return (
                        <div className='mb-2'>
                            <Alert
                                severity={typeof message === 'object' ? 'warning' : 'error'}
                                onClose={() => handleDeleteError(errorId)}
                            >
                                {`Error: ${message ? message : 'Desconocido'}. CODE: ${status && status}. REF: ${
                                    location ? location : 'No identificada'
                                }`}
                            </Alert>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default ERRORS
