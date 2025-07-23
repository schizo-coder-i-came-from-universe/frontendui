import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

/**
 * GraphQL mutation for updating an existing user entity.
 * 
 * This mutation updates a user in the system using their ID and lastchange timestamp
 * for optimistic concurrency control. Updates name fields and returns the updated 
 * user data or error information if the update fails.
 */
const UserUpdateMutation = createQueryStrLazy(
`
mutation UserUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: userUpdate(
    user: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on UserGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }      
    }
    ...UserLarge
  }
}
`, UserLargeFragment)

/**
 * An async action for executing a GraphQL mutation to update user entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `UserUpdateMutation` query.
 * It can be dispatched with mutation variables to update a specific user entity in the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {UUID} mutation_variables.id - The unique identifier for the user entity to update.
 * @param {DateTime} mutation_variables.lastchange - The timestamp of the last change for optimistic concurrency control.
 * @param {string} [mutation_variables.name] - The updated name of the user in the default language.
 * @param {string} [mutation_variables.name_en] - The updated English name of the user.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the user update fails due to validation errors, database constraints, or optimistic locking conflicts.
 *
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   id: "12345678-1234-1234-1234-123456789abc", 
 *   lastchange: "2023-12-01T10:00:00Z",
 *   name: "Jane Smith",
 *   name_en: "Jane Smith"
 * };
 *
 * dispatch(UserUpdateAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Update failed:", result.msg);
 *     } else {
 *       console.log("User updated successfully:", result);
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error updating user:", error);
 *   });
 */
export const UserUpdateAsyncAction = createAsyncGraphQLAction(UserUpdateMutation)