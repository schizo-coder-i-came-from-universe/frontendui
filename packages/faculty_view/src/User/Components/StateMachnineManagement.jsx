import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"

/**
 * GraphQL mutation action for inserting state machines
 * Creates a new state machine with the provided name
 */
const InsertStateMachineAsyncAction = createAsyncGraphQLAction(
    `mutation statemachineinsert($name: String!) {
  statemachineInsert(statemachine: {name: $name}) {
    __typename
    ...on InsertError {
      failed
      msg
      input
    }
    ...StateMachineMedium
  }
}

fragment StateMachineMedium on StateMachineGQLModel {
  id
  name
}`
)

/**
 * State Machine Management Component
 * 
 * A React component that provides functionality for managing state machines.
 * Allows inserting multiple test state machines and displays the operation status.
 * 
 * @component
 * @returns {JSX.Element} A div containing state machine management interface
 * 
 * @example
 * ```jsx
 * <StateMachnineManagement />
 * ```
 * 
 * Features:
 * - Insert 5 test state machines at once
 * - Loading state indication
 * - Error handling and display
 * - Success confirmation with entity data
 */
export const StateMachnineManagement = () => {
    const { loading, error, entity, fetch } = useAsyncAction(InsertStateMachineAsyncAction, {name: "Test"}, {deffered: true})
    const Insert5 = () => {
        for(let i = 0; i < 5; i++) {
            fetch({name: "Test" + i})
        }
    }
    return ( 
    <div>
        Tlacitko< br />
        Tlacitko <br />
        <button onClick={Insert5}>Insert</button><br />
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {entity && <div>Inserted: {JSON.stringify(entity)}</div>}
    </div>)
}