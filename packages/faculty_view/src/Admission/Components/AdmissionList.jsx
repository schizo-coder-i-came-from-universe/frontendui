import { AdmissionMediumCard } from "./AdmissionMediumCard";

/**
 * AdmissionList Component
 * 
 * Renders a list of admission items that have a licensed group in their program.
 * Each admission is displayed using an AdmissionMediumCard component.
 * 
 * @component
 * @param {Object} props - The props for the AdmissionList component.
 * @param {Array<Object>} props.admissions - Array of admission objects to display.
 * @param {Object} props.admissions[].id - Unique identifier for the admission.
 * @param {Object} props.admissions[].program - Program object associated with the admission.
 * @param {boolean} props.admissions[].program.licencedGroup - Flag indicating if the program has a licensed group.
 * @param {Function} props.refreshAdmissions - Callback function to refresh the admissions list.
 * @param {boolean} props.isEditMode - Flag indicating if the list is in edit mode.
 * 
 * @returns {JSX.Element} A div containing the admission list with a header and filtered admission cards.
 * 
 * @example
 * const admissions = [
 *   { id: 1, program: { licencedGroup: true }, name: "Computer Science" },
 *   { id: 2, program: { licencedGroup: false }, name: "Mathematics" }
 * ];
 * 
 * <AdmissionList 
 *   admissions={admissions} 
 *   refreshAdmissions={() => console.log('Refresh')} 
 *   isEditMode={false} 
 * />
 */
export const AdmissionList = ({admissions, refreshAdmissions, isEditMode}) => {

  return (
    <div>
      <h3>Otevřené řízení na fakultu</h3>
        {admissions.map((admission) => (
            admission.program.licencedGroup && (
              <div key={admission.id}>
                <AdmissionMediumCard admission={admission} onRefresh={refreshAdmissions} isEditMode={isEditMode} />
              </div>
            )
          ))}
    </div>
  );
};