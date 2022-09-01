import React from 'react'

const NotifyNews = ({ item, defaultIcons }) => {
    const { descripcion, icono, titulo } = item

    return (
        <li className='notification'>
            <div className='media'>
                <img className='img-radius' src={defaultIcons[icono] || defaultIcons.default} alt='Img' />
                <div className='media-body'>
                    <p>
                        <strong>{titulo}</strong>
                        <span className='n-time text-muted cursor'>
                            <i className='icon feather icon-info m-r-5' />
                        </span>
                    </p>
                    <p>{descripcion}</p>
                </div>
            </div>
        </li>
    )
}

export default NotifyNews
