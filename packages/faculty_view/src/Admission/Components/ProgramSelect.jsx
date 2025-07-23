import { useEffect, useState } from "react";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramPageAsyncAction } from "../Queries/ProgramQuery";

/**
 * ProgramSelect Component
 * 
 * A select dropdown component that fetches and displays a list of programs.
 * Users can select a program, and the component calls onChange with the selected program object.
 * 
 * @component
 * @param {Object} props - The props for the ProgramSelect component.
 * @param {string} props.selectedId - The currently selected program ID.
 * @param {Function} props.onChange - Callback function called when a program is selected.
 * @param {Object} props.onChange.program - The selected program object.
 * 
 * @returns {JSX.Element} A select element with program options or loading/error states.
 * 
 * @example
 * <ProgramSelect 
 *   selectedId="program-123" 
 *   onChange={(program) => console.log('Selected program:', program)} 
 * />
 */
export const ProgramSelect = ({ selectedId, onChange }) => {
  const { fetch, loading, error, entity } = useAsyncAction(
    ProgramPageAsyncAction,
    {},
    { deferred: true }
  );

  const [programs, setPrograms] = useState([]); // Local state to store programs

  useEffect(() => {
    fetch()
      .then((res) => {
        console.log("Fetch successful:", res);
        
        // Extract programs from the response (handle both possible structures)
        const fetchedPrograms = 
          res?.programPage ||      // Case 1: Direct `programPage` in root
          res?.data?.programPage;  // Case 2: Nested under `data`
        
        if (fetchedPrograms) {
          // Add mock open/closed state
          const programsWithStatus = fetchedPrograms.map((p) => ({
              ...p,
            isAdmissionOpen: true, // or false, or derive from real data
          }));
          setPrograms(programsWithStatus);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [fetch]);

  console.log("Current entity state:", entity); // Should still log for debugging
  console.log("Local programs state:", programs); // Log local state

  if (loading) return <div>Loading programs...</div>;
  if (error) return <div>Error loading programs</div>;
  if (!programs.length) return <div>No programs found</div>;

  return (
    <select
      className="form-select"
      value={selectedId}
      onChange={(e) => {
        const selectedId = e.target.value;
        const selectedProgram = programs.find((p) => p.id === selectedId);
        onChange(selectedProgram); // now sends full object
      }}
    >

      <option value="">-- select a program --</option>
      {programs.map((program) => (
        <option key={program.id} value={program.id}>
          {program.name}
        </option>
      ))}
    </select>
  );

};