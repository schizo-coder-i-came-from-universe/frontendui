import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

/**
 * GraphQL mutation for deleting a user entity.
 * 
 * This mutation deletes a user from the system using their ID and lastchange timestamp
 * for optimistic concurrency control. Returns error information if the deletion fails.
 */
const UserDeleteMutation = createQueryStrLazy(
`
mutation UserDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: userDelete(
    user: {id: $id, lastchange: $lastchange}
  ) {
    ... on UserGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }
    }
  }
}
`,
    UserLargeFragment)

/**
 * An async action for executing a GraphQL mutation to delete user entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `UserDeleteMutation` query.
 * It can be dispatched with mutation variables to delete a specific user entity from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {UUID} mutation_variables.id - The unique identifier for the user entity to delete.
 * @param {DateTime} mutation_variables.lastchange - The timestamp of the last change for optimistic concurrency control.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the user deletion fails due to validation errors or database constraints.
 *
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   id: "12345678-1234-1234-1234-123456789abc", 
 *   lastchange: "2023-12-01T10:00:00Z" 
 * };
 *
 * dispatch(UserDeleteAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Deletion failed:", result.msg);
 *     } else {
 *       console.log("User deleted successfully");
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error deleting user:", error);
 *   });
 */
export const UserDeleteAsyncAction = createAsyncGraphQLAction(UserDeleteMutation)