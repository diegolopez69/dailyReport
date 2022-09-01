export const defaultData = {
    user: '',
    password: '',
    show_password: false,
}

export const apiAccess = {
    page_api_path: `${process.env.REACT_APP_BASE_API}/v1/security`,
    token: localStorage.getItem('token'),
}
