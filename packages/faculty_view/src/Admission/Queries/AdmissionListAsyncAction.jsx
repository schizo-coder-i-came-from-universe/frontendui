import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

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

export const AdmissionListAsyncAction = createAsyncGraphQLAction(AdmissionListQuery)