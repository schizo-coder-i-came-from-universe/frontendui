import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

const PaymentAddMutation = `
mutation PaymentAddMutation($paymentInfoId: UUID!, $amount: Float) {
  paymentInsert(payment: {paymentInfoId: $paymentInfoId, amount: $amount}) {
    ... on PaymentGQLModel {
      __typename
      id
      amount
      paymentInfo {
        id
        payments {
          id
          amount
        }
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

export const PaymentAddAsyncAction = createAsyncGraphQLAction(PaymentAddMutation);