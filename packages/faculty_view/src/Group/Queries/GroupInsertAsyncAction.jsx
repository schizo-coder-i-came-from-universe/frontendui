import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

/**
 * GraphQL mutation for creating a new group entity.
 * 
 * This mutation creates a new group record with the provided name and English name.
 * It returns either the created group data or error information if the insertion fails.
 * 
 * @constant
 * @type {string}
 */
const GroupInsertMutation = createQueryStrLazy(
`
mutation GroupInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: groupInsert(
    group: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...GroupLarge
  }
}
`,
    GroupLargeFragment)

/**
 * An async action for executing a GraphQL mutation to create a new group entity.
 * 
 * This action is created using `createAsyncGraphQLAction` with a predefined `GroupInsertMutation`.
 * It can be dispatched with mutation variables to create a group entity via the GraphQL API.
 * 
 * @constant
 * @type {Function}
 * 
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {string} [mutation_variables.id] - Optional UUID for the new group (will be generated if not provided).
 * @param {string} [mutation_variables.name] - The group name in the default language.
 * @param {string} [mutation_variables.name_en] - The group name in English.
 * 
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 * 
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the group insertion fails due to validation or business logic constraints.
 * 
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   name: "Computer Science Group",
 *   name_en: "Computer Science Group"
 * };
 * 
 * dispatch(GroupInsertAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Insertion failed:", result.msg);
 *     } else {
 *       console.log("Group created successfully:", result);
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error creating group:", error);
 *   });
 */
export const GroupInsertAsyncAction = createAsyncGraphQLAction(GroupInsertMutation)