export default {
    items: [
        {
            id: 'example',
            title: 'New section',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'example1',
                    title: 'Inventario',
                    type: 'item',
                    url: '/inventory',
                    icon: 'feather icon-clipboard',
                },
                {
                    id: 'example2',
                    title: 'Chromebooks',
                    type: 'item',
                    url: '/chromebooks',
                    icon: 'feather icon-monitor',
                },
                {
                    id: 'example3',
                    title: 'Revisión de aulas',
                    type: 'item',
                    url: '/check-classroom',
                    icon: 'feather icon-check-square',
                },
                {
                    id: 'example4',
                    title: 'Reserva de aulas',
                    type: 'item',
                    url: '/book-classroom',
                    icon: 'feather icon-bookmark',
                },
                {
                    id: 'example5',
                    title: 'Reportes',
                    type: 'item',
                    url: '/reports',
                    icon: 'feather icon-flag',
                },
                {
                    id: 'example6',
                    title: 'Usuarios',
                    type: 'item',
                    url: '/example',
                    icon: 'feather icon-users',
                },
            ],
        },
    ],
}
