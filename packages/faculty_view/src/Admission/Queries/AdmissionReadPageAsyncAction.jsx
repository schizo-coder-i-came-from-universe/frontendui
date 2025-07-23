import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

/**
 * GraphQL query for fetching paginated admission records with detailed information.
 */
const AdmissionReadPageQuery = createQueryStrLazy(
`
query AdmissionReadPageQuery($skip: Int, $limit: Int, $where: AdmissionInputFilter) {
  result: admissionPage(skip: $skip, limit: $limit, where: $where) {
    ...AdmissionLarge
  }
}
`, 
    AdmissionLargeFragment)

/**
 * AdmissionReadPageAsyncAction
 * 
 * An async action for fetching paginated admission records with full details.
 * Supports pagination and filtering parameters.
 * 
 * @function
 * @param {Object} variables - The query variables.
 * @param {number} [variables.skip] - Number of records to skip for pagination.
 * @param {number} [variables.limit] - Maximum number of records to return.
 * @param {Object} [variables.where] - Filter conditions for admission records.
 * 
 * @returns {Object} Async action object for paginated read operation.
 * 
 * @example
 * const { fetch, entity } = useAsyncAction(AdmissionReadPageAsyncAction, {}, { deferred: true });
 * await fetch({ skip: 0, limit: 10, where: { stateId: "active" } });
 */
export const AdmissionReadPageAsyncAction = createAsyncGraphQLAction(AdmissionReadPageQuery)