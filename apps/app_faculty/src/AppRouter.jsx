import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { AdmissionMediumCard, AdmissionRouterSegment, AdmissionReadPageAsyncAction } from '@hrbolek/uoisfrontend-admissions';
import { AdmissionPage} from '@hrbolek/uoisfrontend-admissions';



export const Routes = [
  {
    path: "/admissions/:id",
    element: <AdmissionPage/>,
  },
  AdmissionRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
