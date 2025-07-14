import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { AdmissionPage, UserPage, UserRouterSegment } from '@schizo-coder-i-came-from-universe/uoisfrontend-faculty_view';


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
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
