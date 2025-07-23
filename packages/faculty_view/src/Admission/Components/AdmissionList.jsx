import { useEffect, useState } from "react";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { LoadingSpinner, ErrorHandler } from "@hrbolek/uoisfrontend-shared";
import { AdmissionLink } from "./AdmissionLink";
import { AdmissionMediumCard } from "./AdmissionMediumCard";

export const AdmissionList = ({admissions, refreshAdmissions}) => {

  return (
    <div>
      <h3>Otevřené řízení na fakultu</h3>
        {admissions.map((admission) => (
            <div key={admission.id}>
              <AdmissionMediumCard admission={admission} onRefresh={refreshAdmissions} />
              {/* <strong>ID:</strong> {admission.id} - <strong>Name:</strong> <Admissiondivnk admission={admission} /> */}
            </div>
          ))}
    </div>
  );
};