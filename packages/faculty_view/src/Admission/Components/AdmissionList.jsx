import { AdmissionMediumCard } from "./AdmissionMediumCard";

export const AdmissionList = ({admissions, refreshAdmissions, isEditMode}) => {

  return (
    <div>
      <h3>Otevřené řízení na fakultu</h3>
        {admissions.map((admission) => (
            <div key={admission.id}>
              <AdmissionMediumCard admission={admission} onRefresh={refreshAdmissions} isEditMode={isEditMode} />
              {/* <strong>ID:</strong> {admission.id} - <strong>Name:</strong> <Admissiondivnk admission={admission} /> */}
            </div>
          ))}
    </div>
  );
};