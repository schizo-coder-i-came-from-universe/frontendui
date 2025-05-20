import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const AdmissionLinkFragment = createQueryStrLazy(
`
fragment AdmissionLink on AdmissionGQLModel {
  __typename
  id
  lastchange
  state{
    __typename
    id
    name
  }
  program {
    id
    name
  }
  
  conditionDate
  examLastDate
  examStartDate
  paymentDate
  applicationLastDate
  applicationStartDate
  conditionExtendedDate
  paymentInfo {
    __typename
    id
    lastchange
    amount
    accountNumber
    SWIFT
    IBAN
    payments{
      id
      }
  }
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
  