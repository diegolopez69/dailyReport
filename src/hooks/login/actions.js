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
            console.log(data);
            if (response) {
                const { username, token, email, equipo, roles } = response

                    console.log(roles.length);
                    localStorage.setItem('user',username)
                    localStorage.setItem('email', email)
                    localStorage.setItem('rol', roles.length)
                    localStorage.setItem('team', "equipo")
                    localStorage.setItem('token', response.accessToken)
                    window.location.href = '/revision'
                }
            })
        .catch(error => {
            if (error) {
                console.log("eRROR", error);
                setResponseLogin( {status: false, message: error.data.message })
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
