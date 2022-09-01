import { toast } from 'react-toastify'

export const alertMessage = (res, toggle, refresh, refresh2) => {
    if (res) {
        const { result, message } = res
        if (result) {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            toggle && toggle()
            refresh && refresh()
            refresh2 && refresh2()
        } else {
            toast.warning(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            })
        }
    } else {
        toast.warning('Error interno, puede informar este error a soporte informático!.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
        })
    }
}
