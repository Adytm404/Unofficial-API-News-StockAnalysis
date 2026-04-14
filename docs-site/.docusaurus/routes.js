import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '3f2'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '43f'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '6f5'),
            routes: [
              {
                path: '/endpoints/gainers',
                component: ComponentCreator('/endpoints/gainers', '9ce'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/ipos',
                component: ComponentCreator('/endpoints/ipos', 'ede'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/losers',
                component: ComponentCreator('/endpoints/losers', 'de7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/news',
                component: ComponentCreator('/endpoints/news', 'aee'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/ratings',
                component: ComponentCreator('/endpoints/ratings', '592'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/stocks-by-code',
                component: ComponentCreator('/endpoints/stocks-by-code', '5ad'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/endpoints/trending',
                component: ComponentCreator('/endpoints/trending', '7e0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'b56'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
