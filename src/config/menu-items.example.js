export default {
    items: [
        {
            id: 'user',
            title: 'User section',
            type: 'groupUser',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'revision',
                    title: 'Revisión',
                    type: 'item',
                    url: '/revision',
                    icon: 'feather icon-flag',
                },
                {
                    id: 'items',
                    title: 'Ítems',
                    type: 'item',
                    url: '/items',
                    icon: 'feather icon-flag',
                },
                {
                    id: 'reports',
                    title: 'Reportes',
                    type: 'item',
                    url: '/reports',
                    icon: 'feather icon-clipboard',
                }
            ],
        },
        {
            id: 'moderator',
            title: 'Moderator section',
            type: 'groupModerator',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'inventory',
                    title: 'Inventario',
                    type: 'item',
                    url: '/inventory',
                    icon: 'feather icon-flag',
                },            
                {
                    id: 'classrooms',
                    title: 'Aulas',
                    type: 'item',
                    url: '/classrooms',
                    icon: 'feather icon-check-square',
                },
                {
                    id: 'computers',
                    title: 'Ordenadores',
                    type: 'item',
                    url: '/computers',
                    icon: 'feather icon-bookmark',
                },
            ],
        },
        {
            id: 'admin',
            title: 'Admin section',
            type: 'groupAdmin',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'users',
                    title: 'Usuarios',
                    type: 'item',
                    url: '/user',
                    icon: 'feather icon-users',
                },
            ],
        }
    ],
    
}
