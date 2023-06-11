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
                    icon: 'feather icon-check-square',
                },
                {
                    id: 'items',
                    title: 'Ítems',
                    type: 'item',
                    url: '/items',
                    icon: 'feather icon-cpu',
                },
                {
                    id: 'reports',
                    title: 'Reportes',
                    type: 'item',
                    url: '/reports',
                    icon: 'feather icon-pie-chart',
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
                    icon: 'feather icon-clipboard',
                },            
                {
                    id: 'classrooms',
                    title: 'Aulas',
                    type: 'item',
                    url: '/classrooms',
                    icon: 'feather icon-book',
                },
                {
                    id: 'computers',
                    title: 'Ordenadores',
                    type: 'item',
                    url: '/computers',
                    icon: 'feather icon-monitor',
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
