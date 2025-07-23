import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

/**
 * GraphQL mutation for creating a new user entity.
 * 
 * This mutation creates a new user in the system with optional ID and name fields.
 * Returns the created user data or error information if the insertion fails.
 */
const UserInsertMutation = createQueryStrLazy(
`
mutation UserInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: userInsert(
    user: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...UserLarge
  }
}
`,
    UserLargeFragment)

/**
 * An async action for executing a GraphQL mutation to create user entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `UserInsertMutation` query.
 * It can be dispatched with mutation variables to create a new user entity in the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {UUID} [mutation_variables.id] - Optional unique identifier for the user entity. If not provided, will be auto-generated.
 * @param {string} [mutation_variables.name] - The name of the user in the default language.
 * @param {string} [mutation_variables.name_en] - The English name of the user.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the user insertion fails due to validation errors or database constraints.
 *
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   name: "John Doe", 
 *   name_en: "John Doe" 
 * };
 *
 * dispatch(UserInsertAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Insertion failed:", result.msg);
 *     } else {
 *       console.log("User created successfully:", result);
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error creating user:", error);
 *   });
 */
export const UserInsertAsyncAction = createAsyncGraphQLAction(UserInsertMutation)