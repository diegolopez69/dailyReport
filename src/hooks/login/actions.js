import { useState } from 'react'
import { postLogin } from '../../data/login/post'
import { AgGridReact } from 'ag-grid-react';
export const useActions = ({ data, setData, apiAccess }) => {
    const [responseLogin, setResponseLogin] = useState({})
    const { show_password } = data

    const tryLogin = async e => {
        e.preventDefault()
        setResponseLogin({ result: true, message: 'Ingresando...' })
        localStorage.clear()
        
        await postLogin({ apiAccess, data })
        .then(response => {
           
            if (response) {
                const { user, token, redirect, equipo } = response
                    localStorage.setItem('user', data.username)
                    localStorage.setItem('team', 'EXAMPLE')
                    localStorage.setItem('token', response.accessToken)
                    window.location.href = '/reports'
                }
            })
            .catch(error => {
                localStorage.setItem('user','ROOT')
                localStorage.setItem('team', 'EXAMPLE')
                localStorage.setItem('token', 'holas')
                window.location.href = '/reports'
                if (error) {
                    setResponseLogin(error.data)
                } else {
                    console.log('API ERROR: ', error)
                    setResponseLogin({ status: false, message: 'No hay comunicación con los servidores.' })
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
