const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'authentication-register-v2',
                'title': 'Register v2',
                'type' : 'item',
                'url'  : '/pages/auth/register'
            }
        ]
    }
];

export default navigationConfig;
