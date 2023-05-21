import React, { Component } from 'react'
import { connect } from 'react-redux'
import windowSize from 'react-window-size'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Dropdown } from 'react-bootstrap'
import Aux from '../../../../../hooks/_Aux'
import * as actionTypes from '../../../../../store/actions'

class NavLeft extends Component {
    render() {
        const team = localStorage.getItem('team')
        const user = localStorage.getItem('user')
        let iconFullScreen = ['feather']
        iconFullScreen = this.props.isFullScreen
            ? [...iconFullScreen, 'icon-minimize']
            : [...iconFullScreen, 'icon-maximize']

        return (
            <Aux>
                <ul className='navbar-nav mr-auto'>
                    <li>
                        <a href className='full-screen' onClick={this.props.onFullScreen}>
                            <i className={iconFullScreen.join(' ')} />
                        </a>
                    </li>
                    <li className='nav-item'>
                        <div className='b-brand'>
                            <b>
                                <li className='nav-item'>{team || 'Sin equipo '}</li>
                            </b>
                            &nbsp;|&nbsp;{user}
                        </div>
                    </li>
                </ul>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft))
