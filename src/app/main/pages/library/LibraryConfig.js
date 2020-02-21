import React from 'react';

export const LibraryConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/library',
            component: React.lazy(() => import('./Library'))
        }
    ]
};