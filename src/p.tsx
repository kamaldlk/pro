/* eslint-disable import/no-anonymous-default-export */
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        name: 'Project',
        path: '/project',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: 'Reacent projects',
            icon: <CrownFilled />,
            routes: [
              {
                name: 'Batch Email Management for Projects and Rockshell application',
                path: 'sub-sub-page1',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                name: 'Project assets to implement in olam sector - Nigeria',
                path: 'sub-sub-page2',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                name: 'UI components and guidelines Mind map - 3rd sector',
                path: 'sub-sub-page3',
                icon: <CrownFilled />,
                component: './Welcome',
              },
            ],
          },
          {
            path: '/list/sub-page',
            name: 'Reacent invoices',
            icon: <CrownFilled />,
            routes: [
              {
                name: 'Batch Email Management for Projects and Rockshell application',
                path: 'sub-sub-page1',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                name: 'Project assets to implement in olam sector - Nigeria',
                path: 'sub-sub-page2',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                name: 'UI components and guidelines Mind map - 3rd sector',
                path: 'sub-sub-page3',
                icon: <CrownFilled />,
                component: './Welcome',
              },
            ],
          }
        ],
      }
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [
    {
      title: "Projects",
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      url: "/projects",
      desc: "Create UI that is shared across routes"
    }, {
      title: "Work Space",
      url: "/workspace",
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Calendar",
      url: "/calendar",
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Invoices",
      url: "/invoices",
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Clients",
      url: "/clients",
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Deployment",
      url: "/deployment",
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Reports",
      url: "/reports",
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Organization",
      url: "/organization",
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
      desc: "Create UI that is shared across routes"
    }, {
      title: "Settings",
      url: "/settings",
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
      desc: "Create UI that is shared across routes"
    }
  ],
};
