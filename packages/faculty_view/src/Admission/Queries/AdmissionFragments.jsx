import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const AdmissionLinkFragment = createQueryStrLazy(
`
fragment AdmissionLink on AdmissionGQLModel {
  __typename
  id
  lastchange
  program {
    id
    name
  }
  
  examLastDate
  examStartDate
  paymentInfo {
    __typename
    id
    lastchange
    amount
    accountNumber
    SWIFT
    IBAN
  }
  conditionDate
  conditionExtendedDate
  requestExtraDateDate
}

`)


export const AdmissionMediumFragment = createQueryStrLazy(
`
fragment AdmissionMedium on AdmissionGQLModel {
  ...AdmissionLink
}
`, AdmissionLinkFragment)

export const AdmissionLargeFragment = createQueryStrLazy(
`
fragment AdmissionLarge on AdmissionGQLModel {
  ...AdmissionMedium
}
`, AdmissionMediumFragment)
  