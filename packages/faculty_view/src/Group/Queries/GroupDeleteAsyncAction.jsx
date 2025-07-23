import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

/**
 * GraphQL mutation for deleting a group entity.
 * 
 * This mutation deletes a group record identified by its ID and lastchange timestamp.
 * It returns error information if the deletion fails, including the entity data.
 * 
 * @constant
 * @type {string}
 */
const GroupDeleteMutation = createQueryStrLazy(
`
mutation GroupDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: groupDelete(
    group: {id: $id, lastchange: $lastchange}
  ) {
    ... on GroupGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }
    }
  }
}
`,
    GroupLargeFragment)

/**
 * An async action for executing a GraphQL mutation to delete a group entity.
 * 
 * This action is created using `createAsyncGraphQLAction` with a predefined `GroupDeleteMutation`.
 * It can be dispatched with mutation variables to delete a group entity via the GraphQL API.
 * 
 * @constant
 * @type {Function}
 * 
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {string} mutation_variables.id - The unique identifier of the group to delete.
 * @param {string} mutation_variables.lastchange - The last modification timestamp for optimistic concurrency control.
 * 
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 * 
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the group deletion fails due to validation or business logic constraints.
 * 
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   id: "12345678-1234-1234-1234-123456789abc",
 *   lastchange: "2023-10-15T10:30:00Z"
 * };
 * 
 * dispatch(GroupDeleteAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Deletion failed:", result.msg);
 *     } else {
 *       console.log("Group deleted successfully");
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error deleting group:", error);
 *   });
 */
export const GroupDeleteAsyncAction = createAsyncGraphQLAction(GroupDeleteMutation)