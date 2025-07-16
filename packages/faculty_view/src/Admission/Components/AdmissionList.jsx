import { useEffect, useState } from "react";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { LoadingSpinner, ErrorHandler } from "@hrbolek/uoisfrontend-shared";
import { AdmissionReadPageAsyncAction } from "../Queries/AdmissionReadPageAsyncAction";
import { AdmissionLink } from "./AdmissionLink";
import { AdmissionMediumCard } from "./AdmissionMediumCard";

export const AdmissionList = () => {
  const { fetch, loading, error, dispatchResult } = useAsyncAction(
    AdmissionReadPageAsyncAction,
    {}
  );

  const refreshAdmissions = () => {
    fetch({});
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorHandler errors={error} />;

  const admissions = dispatchResult?.data.result || [];

  return (
    <div>
      <h3>Admission Pages</h3>
        {admissions.map((admission) => (
            <div key={admission.id}>
              <AdmissionMediumCard admission={admission} onRefresh={refreshAdmissions} />
              {/* <strong>ID:</strong> {admission.id} - <strong>Name:</strong> <Admissiondivnk admission={admission} /> */}
            </div>
          ))}
    </div>
  );
};