import axios from 'axios'

export const postLogin = async ({ apiAccess, data }) => {
    const { page_api_path } = apiAccess
    const { user, password } = data

    return await axios
        .post(`http://localhost:3000/api/auth/signin`, {
            user,
            password,
        })
        .then(({ data }) => {
            return data
        })
        .catch(({ response }) => {
            throw response
        })
}
