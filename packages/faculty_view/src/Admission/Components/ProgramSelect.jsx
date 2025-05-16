import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramPageAsyncAction } from "../Queries/ProgramQuery";



export const ProgramSelect = ({ selectedId, onChange }) => {
  const { loading, error, entity } = useAsyncAction(ProgramPageAsyncAction, {});
  
  
  if (loading) return <div>Loading programs...</div>;
  if (error) return <div>Error loading programs</div>;
  if (!entity || !entity.programPage) return <div>No programs found</div>;

  const programs = entity?.programPage || entity?.result?.programPage || [];
  
  return (
    <select value={selectedId} onChange={e => onChange(e.target.value)}>
      <option value="">-- select a program --</option>
      {programs.map(program => (
        <option key={program.id} value={program.id}>
          {program.name}
        </option>
      ))}
    </select>
  );
};

