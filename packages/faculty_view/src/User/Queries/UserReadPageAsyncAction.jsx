import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

/**
 * GraphQL query for fetching paginated user entities.
 * 
 * This query retrieves a page of user entities from the system with support for
 * pagination and filtering. Returns user data matching the specified criteria.
 */
const UserReadPageQuery = createQueryStrLazy(
`
query UserReadPageQuery($skip: Int, $limit: Int, $where: UserWhereInputFilter) {
  result: userPage(skip: $skip, limit: $limit, where: $where) {
    ...UserLarge
  }
}
`, 
    UserLargeFragment)

/**
 * An async action for executing a GraphQL query to read paginated user entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `UserReadPageQuery` query.
 * It can be dispatched with query variables to fetch a paginated list of user entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {number} [query_variables.skip] - Number of records to skip for pagination (default: 0).
 * @param {number} [query_variables.limit] - Maximum number of records to return per page.
 * @param {UserWhereInputFilter} [query_variables.where] - Filter conditions to apply to the user query.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage - fetch first 10 users:
 * const queryVariables = { 
 *   skip: 0, 
 *   limit: 10 
 * };
 *
 * dispatch(UserReadPageAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched users:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching users:", error);
 *   });
 *
 * @example
 * // Example usage - fetch users with filtering:
 * const queryVariables = { 
 *   skip: 0, 
 *   limit: 20,
 *   where: { name: { _ilike: "%john%" } }
 * };
 *
 * dispatch(UserReadPageAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Filtered users:", result);
 *   });
 */
export const UserReadPageAsyncAction = createAsyncGraphQLAction(UserReadPageQuery)