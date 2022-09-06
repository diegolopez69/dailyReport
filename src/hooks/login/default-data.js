export const defaultData = {
    username: '',
    password: '',
    show_password: false,
}

export const apiAccess = {
    page_api_path: `${process.env.REACT_APP_BASE_API}`,
    token: localStorage.getItem('token'),
}
