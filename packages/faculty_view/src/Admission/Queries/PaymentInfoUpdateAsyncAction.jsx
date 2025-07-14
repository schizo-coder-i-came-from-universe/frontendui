import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared"

const AdmissionUpdateAsyncAction = createAsyncGraphQLAction(`
mutation paymentInfoUpdate($id: UUID!, $lastchange: DateTime!, $accountNumber: String, $specificSymbol: String, $constantSymbol: String, $IBAN: String, $SWIFT: String, $amount: Float) {
  paymentInfoUpdate(paymentInfo: {id: $id, lastchange: $lastchange, accountNumber: $accountNumber, specificSymbol: $specificSymbol, constantSymbol: $constantSymbol, IBAN: $IBAN, SWIFT: $SWIFT, amount: $amount}) {
    ... on PaymentInfoGQLModel {
      __typename	
      id
      amount
    }
    ... on PaymentInfoGQLModelUpdateError {
      msg
      failed
      input
    }
  }
}    
`)

export default AdmissionUpdateAsyncAction