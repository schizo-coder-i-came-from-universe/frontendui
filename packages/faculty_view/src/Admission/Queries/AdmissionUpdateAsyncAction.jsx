import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

/**
 * GraphQL mutation for updating admission records.
 * Updates the state of an admission application.
 * 
 * @param {string} id - UUID of the admission to update
 * @param {string} lastchange - DateTime timestamp for optimistic locking
 * @param {string} stateId - UUID of the new state to assign to the admission
 * 
 * @returns {Object} The updated admission object with AdmissionLarge fragment fields
 * 
 * @example
 * // Update admission state
 * const result = await AdmissionUpdateAsyncAction({
 *   id: "12345678-1234-1234-1234-123456789abc",
 *   lastchange: "2023-12-07T10:30:00Z",
 *   stateId: "87654321-4321-4321-4321-cba987654321"
 * });
 */
const AdmissionUpdateMutation = createQueryStrLazy(`
mutation AdmissionUpdate($id: UUID!, $lastchange: DateTime!, $stateId: UUID) {
    result: admissionUpdate(admission: {id: $id, lastchange: $lastchange, stateId: $stateId}) {
        ... on AdmissionGQLModel {
            ...AdmissionLarge
        }
    }
}
`, AdmissionLargeFragment)

/**
 * Async action creator for updating admission records.
 * Provides a Redux-compatible action creator for admission state updates.
 * 
 * @function
 * @param {Object} variables - The GraphQL variables
 * @param {string} variables.id - UUID of the admission to update
 * @param {string} variables.lastchange - DateTime timestamp for optimistic locking
 * @param {string} variables.stateId - UUID of the new state to assign
 * @returns {Function} Redux action creator function
 */
export const AdmissionUpdateAsyncAction = createAsyncGraphQLAction(AdmissionUpdateMutation)