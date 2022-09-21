import { useState } from 'react'
import { postLogin } from '../../data/login/post'

export const useActions = ({ data, setData, apiAccess }) => {
    const [responseLogin, setResponseLogin] = useState({})
    const { show_password } = data

    const tryLogin = async e => {
        e.preventDefault()
        setResponseLogin({ result: true, message: 'Ingresando...' })

        localStorage.clear()
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', data.username)
        localStorage.setItem('team', 'EXAMPLE')
        window.location.href = '/example'

        await postLogin({ apiAccess, data }) //llamada api
            .then(response => {
                if (response) {
                    const { user, token, redirect, equipo } = response
                }
            })
            .catch(error => {
                if (error) {
                    setResponseLogin(error.data)
                } else {
                    console.log('API ERROR: ', error)
                    setResponseLogin({ status: false, message: 'No hay comunicación con los servicios :(' })
                }
            })
    }

    const showPassword = () => {
        setData({ ...data, show_password: !show_password })
    }

    return {
        tryLogin,
        responseLogin,
        showPassword,
    }
}
