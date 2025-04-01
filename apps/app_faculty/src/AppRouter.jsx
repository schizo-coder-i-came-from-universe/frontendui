import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { AdmissionMediumCard, AdmissionRouterSegment, AdmissionReadPageAsyncAction } from '@hrbolek/uoisfrontend-admissions';

const Admissions = () => {
   const { loading, error, entity, dispatchResult } = useAsyncAction(AdmissionReadPageAsyncAction, {});

   if (loading) return <p>Loading</p>;

  console.log(dispatchResult);

  return (
    <div>
      {dispatchResult.data.result.map((admission, i) => (
        <AdmissionMediumCard key={i} admission={{ id: admission.id, name: i }} />
      ))}
    </div>
   );
};

export const Routes = [
  {
    path: "/admissions/admissions",
    element: <Admissions />,
  },
  AdmissionRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
