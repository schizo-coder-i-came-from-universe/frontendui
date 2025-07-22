import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const AdmissionLinkFragment = createQueryStrLazy(
`
fragment AdmissionLink on AdmissionGQLModel {
  __typename
  id
  name
  lastchange
  stateId

  program {
    id
    name
    licencedGroup {
      id
      name
    }
  }
  
  conditionDate
  examLastDate
  examStartDate
  paymentDate
  applicationLastDate
  applicationStartDate
  conditionExtendedDate
  endDate
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
      amount
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
  