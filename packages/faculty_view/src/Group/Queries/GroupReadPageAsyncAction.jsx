import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

/**
 * GraphQL query for fetching a paginated list of group entities.
 * 
 * This query retrieves multiple group records with pagination support and optional filtering.
 * It returns an array of groups matching the specified criteria.
 * 
 * @constant
 * @type {string}
 */
const GroupReadPageQuery = createQueryStrLazy(
`
query GroupReadPageQuery($skip: Int, $limit: Int, $where: GroupWhereInputFilter) {
  result: groupPage(skip: $skip, limit: $limit, where: $where) {
    ...GroupLarge
  }
}
`, 
    GroupLargeFragment)

/**
 * An async action for executing a GraphQL query to fetch a paginated list of group entities.
 * 
 * This action is created using `createAsyncGraphQLAction` with a predefined `GroupReadPageQuery`.
 * It can be dispatched with query variables to fetch multiple group entities with pagination
 * and filtering support via the GraphQL API.
 * 
 * @constant
 * @type {Function}
 * 
 * @param {Object} [query_variables] - The variables for the GraphQL query.
 * @param {number} [query_variables.skip=0] - Number of records to skip for pagination.
 * @param {number} [query_variables.limit=10] - Maximum number of records to return.
 * @param {Object} [query_variables.where] - Filter conditions for the query.
 * 
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 * 
 * @throws {Error} If `query_variables` is not a valid JSON object.
 * 
 * @example
 * // Example usage - fetch first 20 groups:
 * const queryVariables = { 
 *   skip: 0, 
 *   limit: 20 
 * };
 * 
 * dispatch(GroupReadPageAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched groups:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching groups:", error);
 *   });
 * 
 * @example
 * // Example usage with filtering:
 * const queryVariables = { 
 *   skip: 0, 
 *   limit: 10,
 *   where: { name: { _contains: "Computer" } }
 * };
 * 
 * dispatch(GroupReadPageAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Filtered groups:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching filtered groups:", error);
 *   });
 */
export const GroupReadPageAsyncAction = createAsyncGraphQLAction(GroupReadPageQuery)