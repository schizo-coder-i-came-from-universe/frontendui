import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * GraphQL query for fetching a paginated list of admissions.
 */
const AdmissionListQuery = createQueryStrLazy(
`
query AdmissionListQuery {
  result: admissionPage {
    id
    name
    __typename
  }
}
`)

/**
 * AdmissionListAsyncAction
 * 
 * An async action for fetching a paginated list of admission records.
 * Returns basic admission information (id, name, __typename).
 * 
 * @function
 * @returns {Object} Async action object for list operation.
 * 
 * @example
 * const { fetch, entity } = useAsyncAction(AdmissionListAsyncAction);
 * // entity.result will contain the admission list
 */
export const AdmissionListAsyncAction = createAsyncGraphQLAction(AdmissionListQuery)