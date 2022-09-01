import React from 'react'

const navBadge = props => {
    let navBadges = false
    if (props.items.badge) {
        const badgeClass = ['label', 'pcoded-badge', props.items.badge.type]

        navBadges = <span className={badgeClass.join(' ')}>{props.items.badge.title}sss</span>
    }
    return navBadges
}

export default navBadge
