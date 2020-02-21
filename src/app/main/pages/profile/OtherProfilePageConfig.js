import React from 'react';

export const OtherProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/otherprofile',
            component: React.lazy(() => import('./OtherProfilePage'))
        }
    ]
};
