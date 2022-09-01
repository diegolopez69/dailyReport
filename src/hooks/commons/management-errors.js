import { useState } from 'react'

export const useCaptureErrors = () => {
    const [errors, setErrors] = useState([])

    const handleDeleteError = itemId => {
        const items = errors.filter(item => item.errorId !== itemId)
        setErrors(items)
    }

    const errorProps = {
        handleDeleteError,
        errors,
    }

    const managementErrors = (err, location) => {
        if (err) {
            const { status, message } = err.data
            switch (status) {
                case 401:
                    localStorage.clear()
                    window.location.href = `/login`
                    break
                case 403:
                    window.location.href = `/error-403`
                    break
                default:
                    const found = errors.find(({ location: _location }) => _location === location)
                    if (!found) setErrors(errors => [...errors, { status, message, location, errorId: errors.length }])
                    break
            }
        } else {
            setErrors(errors => [
                ...errors,
                {
                    status: 500,
                    message: 'Parace que ha ocurrido un error desconocido :(',
                    errorId: errors.length,
                },
            ])
        }
    }
    return { managementErrors, errorProps }
}
