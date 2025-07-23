import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

/**
 * GraphQL mutation for inserting a new admission record.
 */
const AdmissionInsertMutation = createQueryStrLazy(
`
mutation AdmissionInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: admissionInsert(
    admission: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...AdmissionLarge
  }
}
`,
    AdmissionLargeFragment)

/**
 * AdmissionInsertAsyncAction
 * 
 * An async action for creating new admission records using GraphQL mutation.
 * 
 * @function
 * @param {Object} variables - The mutation variables.
 * @param {string} [variables.id] - Optional UUID for the new admission.
 * @param {string} [variables.name] - The name of the admission.
 * @param {string} [variables.name_en] - The English name of the admission.
 * 
 * @returns {Object} Async action object for insertion operation.
 * 
 * @example
 * const { fetch } = useAsyncAction(AdmissionInsertAsyncAction, {}, { deferred: true });
 * await fetch({ name: "Computer Science", name_en: "Computer Science" });
 */
export const AdmissionInsertAsyncAction = createAsyncGraphQLAction(AdmissionInsertMutation)