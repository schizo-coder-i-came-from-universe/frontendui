import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

/**
 * GraphQL mutation for deleting an admission record.
 * Requires the admission ID and lastchange timestamp for optimistic locking.
 */
const AdmissionDeleteMutation = createQueryStrLazy(
`
mutation AdmissionDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: admissionDelete(
    admission: {id: $id, lastchange: $lastchange}
  ) {
    ... on AdmissionGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...AdmissionLarge
      }
    }
  }
}
`,
    AdmissionLargeFragment)

/**
 * AdmissionDeleteAsyncAction
 * 
 * An async action for deleting admission records using GraphQL mutation.
 * Uses optimistic locking with lastchange timestamp to prevent concurrent modifications.
 * 
 * @function
 * @param {Object} variables - The mutation variables.
 * @param {string} variables.id - The UUID of the admission to delete.
 * @param {string} variables.lastchange - The lastchange timestamp for optimistic locking.
 * 
 * @returns {Object} Async action object for deletion operation.
 * 
 * @example
 * const { fetch } = useAsyncAction(AdmissionDeleteAsyncAction, {}, { deferred: true });
 * await fetch({ id: "123e4567-e89b-12d3-a456-426614174000", lastchange: "2023-01-01T00:00:00Z" });
 */
export const AdmissionDeleteAsyncAction = createAsyncGraphQLAction(AdmissionDeleteMutation)