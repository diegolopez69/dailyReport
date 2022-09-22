import React from 'react'

import Aux from '../../../../hooks/_Aux'
// import { useFetchNavigation } from '../../../../hooks/menu/index'
import menu from '../../../../config/menu-items.example'

const Breadcrumb = props => {
    // const { menu } = useFetchNavigation()
    const { items } = menu
    let title = 'Página'

    
    items.forEach(({ children }) => {
        const findTitle = children.find(item => item.url === props.location.pathname)
        if (findTitle) {
            const { title: newTitle } = findTitle
            title = newTitle
        }
    })

    document.title = `${process.env.REACT_APP_APP_NAME} | `+ title

    return (
        <Aux>
            <div className='page-header'>
                <div className='page-block'>
                    <div className='row align-items-center'>
                        <div className='page-header-title ml-3'>
                            <h4 className='mb-4 strong text-muted'>{title}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default Breadcrumb
