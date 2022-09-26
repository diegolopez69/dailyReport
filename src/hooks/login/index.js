import { useState } from 'react'
import { apiAccess, defaultData } from './default-data'
import { useActions } from './actions'

export const useFetchInitLogin = () => {
    const [data, setData] = useState(defaultData)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const Actions = useActions({ data, setData, apiAccess })
    
    return { data, Actions, handleInputChange }
}
