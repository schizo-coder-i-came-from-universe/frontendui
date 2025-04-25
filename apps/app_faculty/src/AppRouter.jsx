import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { UserPage, UserRouterSegment } from '@schizo-coder-i-came-from-universe/uoisfrontend-faculty_view';


export const Routes = [
  UserRouterSegment,
  {
    path: `/skibidi`,
    element: <UserPage />,
  }
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
