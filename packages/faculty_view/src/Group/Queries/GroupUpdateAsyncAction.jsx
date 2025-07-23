import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

/**
 * GraphQL mutation for updating an existing group entity.
 * 
 * This mutation updates a group record identified by its ID and lastchange timestamp.
 * It allows modification of the group's name and English name. Returns either the 
 * updated group data or error information if the update fails.
 * 
 * @constant
 * @type {string}
 */
const GroupUpdateMutation = createQueryStrLazy(
`
mutation GroupUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: groupUpdate(
    group: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on GroupGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }      
    }
    ...GroupLarge
  }
}
`, GroupLargeFragment)

/**
 * An async action for executing a GraphQL mutation to update an existing group entity.
 * 
 * This action is created using `createAsyncGraphQLAction` with a predefined `GroupUpdateMutation`.
 * It can be dispatched with mutation variables to update a group entity via the GraphQL API.
 * 
 * @constant
 * @type {Function}
 * 
 * @param {Object} mutation_variables - The variables for the GraphQL mutation.
 * @param {string} mutation_variables.id - The unique identifier of the group to update.
 * @param {string} mutation_variables.lastchange - The last modification timestamp for optimistic concurrency control.
 * @param {string} [mutation_variables.name] - The updated group name in the default language.
 * @param {string} [mutation_variables.name_en] - The updated group name in English.
 * 
 * @returns {Function} A dispatchable async action that performs the GraphQL mutation, applies middleware, and dispatches the result.
 * 
 * @throws {Error} If `mutation_variables` is not a valid JSON object.
 * @throws {Error} If the group update fails due to validation, concurrency conflicts, or business logic constraints.
 * 
 * @example
 * // Example usage:
 * const mutationVariables = { 
 *   id: "12345678-1234-1234-1234-123456789abc",
 *   lastchange: "2023-10-15T10:30:00Z",
 *   name: "Updated Computer Science Group",
 *   name_en: "Updated Computer Science Group"
 * };
 * 
 * dispatch(GroupUpdateAsyncAction(mutationVariables))
 *   .then((result) => {
 *     if (result.failed) {
 *       console.error("Update failed:", result.msg);
 *       console.log("Current entity state:", result.Entity);
 *     } else {
 *       console.log("Group updated successfully:", result);
 *     }
 *   })
 *   .catch((error) => {
 *     console.error("Error updating group:", error);
 *   });
 */
export const GroupUpdateAsyncAction = createAsyncGraphQLAction(GroupUpdateMutation)