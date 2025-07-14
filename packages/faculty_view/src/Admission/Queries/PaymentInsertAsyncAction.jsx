import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

// Create a new PaymentInfo with a payment ID
const PaymentInsertMutation = `
mutation PaymentInsertMutation($id: UUID!, $accountNumber: String, $specificSymbol: String, $constantSymbol: String, $IBAN: String, $SWIFT: String, $amount: Float) {
  paymentInfoInsert(paymentInfo: {id: $id, accountNumber: $accountNumber, specificSymbol: $specificSymbol, constantSymbol: $constantSymbol, IBAN: $IBAN, SWIFT: $SWIFT, amount: $amount}) {
    ... on PaymentInfoGQLModel {
      __typename
      id
      payments {
        id
      }
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`;

export const PaymentInsertAsyncAction = createAsyncGraphQLAction(PaymentInsertMutation);