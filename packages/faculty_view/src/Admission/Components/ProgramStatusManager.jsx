import { useState, useEffect } from "react"
import { ProgramSelect } from "./ProgramSelect"

/**
 * A component for managing program selection and admission status.
 * 
 * @component
 * @param {Object} props - The properties for the ProgramStatusManager component.
 * @param {Object} props.admission - The admission object.
 * @param {Object} props.admission.program - The initial program associated with the admission.
 * @param {boolean} props.isEditMode - Whether the component is in edit mode.
 * @param {Function} props.onProgramChange - Callback function when program changes.
 * 
 * @returns {JSX.Element} A component for program selection and status management.
 */
export const ProgramStatusManager = ({ admission, isEditMode, onProgramChange }) => {
  const [selectedProgram, setSelectedProgram] = useState(admission.program);

  const getProgramOpenStatus = (programId) => {
    const stored = localStorage.getItem(`admission-open-${programId}`);
    return stored === null ? true : stored === "true";
  };

  const handleProgramChange = (program) => {
    if (program) {
      const isAdmissionOpen = getProgramOpenStatus(program.id);
      const updatedProgram = { ...program, isAdmissionOpen };
      setSelectedProgram(updatedProgram);
      onProgramChange?.(updatedProgram);
    }
  };

  const toggleAdmissionStatus = () => {
    if (selectedProgram) {
      const updatedStatus = !selectedProgram.isAdmissionOpen;
      localStorage.setItem(`admission-open-${selectedProgram.id}`, updatedStatus.toString());

      const updatedProgram = {
        ...selectedProgram,
        isAdmissionOpen: updatedStatus,
      };
      setSelectedProgram(updatedProgram);
      onProgramChange?.(updatedProgram);
    }
  };

  useEffect(() => {
    if (admission.program) {
      const isAdmissionOpen = getProgramOpenStatus(admission.program.id);
      const initialProgram = { ...admission.program, isAdmissionOpen };
      setSelectedProgram(initialProgram);
      onProgramChange?.(initialProgram);
    }
  }, [admission.program]);

  return (
    <div>
      <div className="text-primary fw-bold">
        <div className="my-4"></div>
        Vyber studijního programu:
      </div>
      <ProgramSelect
        selectedId={selectedProgram?.id}
        onChange={handleProgramChange}
      />
      <br />
      {selectedProgram && (
        <>
          <div className="fw-bold">
          <div className="my-4"></div>

            Stav přijímacího řízení:{" "}
            <span className={selectedProgram.isAdmissionOpen ? "text-success" : "text-danger"}>
              {selectedProgram.isAdmissionOpen ? "Otevřené" : "Uzavřené"}
            </span>
          </div>
          {isEditMode && (
            <button
              onClick={toggleAdmissionStatus}
              className={`btn fw-bold mb-2 mt-1 ${selectedProgram.isAdmissionOpen ? 'btn-danger' : 'btn-success'}`}
            >
              {selectedProgram.isAdmissionOpen ? "Uzavřít řízení" : "Otevřít řízení"}
            </button>
          )}
        </>
      )}
    </div>
  );
};