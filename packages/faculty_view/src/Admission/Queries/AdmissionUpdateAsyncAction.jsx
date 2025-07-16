import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionUpdateMutation = createQueryStrLazy(`
mutation AdmissionUpdate($id: UUID!, $lastchange: DateTime!, $stateId: UUID) {
    result: admissionUpdate(admission: {id: $id, lastchange: $lastchange, stateId: $stateId}) {
        ... on AdmissionGQLModel {
            ...AdmissionLargeFragment
        }
    }
}
`, AdmissionLargeFragment)

export const AdmissionUpdateAsyncAction = createAsyncGraphQLAction(AdmissionUpdateMutation)