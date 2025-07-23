import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const AdmissionLinkFragment = createQueryStrLazy(
`
fragment AdmissionLink on AdmissionGQLModel {
  __typename
  id
  name
  lastchange
  
}

`)


export const AdmissionMediumFragment = createQueryStrLazy(
`
fragment AdmissionMedium on AdmissionGQLModel {
  ...AdmissionLink
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
`, AdmissionLinkFragment)

/**
 * AdmissionLargeFragment
 * 
 * GraphQL fragment for complete admission information.
 * Currently extends AdmissionMediumFragment without additional fields.
 * Can be extended in the future for more detailed admission data.
 */
export const AdmissionLargeFragment = createQueryStrLazy(
`
fragment AdmissionLarge on AdmissionGQLModel {
  ...AdmissionMedium
}
`, AdmissionMediumFragment)
  