/**
 * @fileoverview Application Router Configuration
 * @description Defines the routing structure for the Faculty Application using React Router
 */

import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { AdmissionPage, UserPage, UserRouterSegment, DataGenerator} from '@schizo-coder-i-came-from-universe/uoisfrontend-faculty_view';
;

/**
 * Application Routes Configuration
 * @type {Array<Object>}
 * @description Defines all available routes in the Faculty Application
 * @property {string} path - The URL path for the route
 * @property {JSX.Element} element - The React component to render for the route
 */
export const Routes = [
  {
    path: `/admission/user/view/:id`,
    element: <UserPage />,
  },
  {path: '/admission/admission/view/:id',
  element: <AdmissionPage isEditMode={false}/>,
  },
  {path: '/admission/admission/write/:id',
    element: <AdmissionPage isEditMode={true}/>,
    },
    {path: '/admission/GenerateData',
      element: <DataGenerator/>,
      },
]

/**
 * Browser Router Instance
 * @type {Router}
 * @description Creates the browser router with the defined routes
 * @note Alternative configurations commented out for different base paths
 */
// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

/**
 * Application Router Component
 * @component
 * @description Provides routing functionality for the Faculty Application
 * using React Router's RouterProvider with the configured routes
 * @returns {JSX.Element} RouterProvider component with configured routes
 * @example
 * ```jsx
 * <AppRouter />
 * ```
 */
export const AppRouter = () => <RouterProvider router={router} />
