import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

const PaymentAddMutation = `
mutation PaymentAddMutation($paymentInfoId: UUID!) {
  paymentInsert(payment: {paymentInfoId: $paymentInfoId}) {
    ... on PaymentGQLModel {
      __typename
      id
      paymentInfo {
        id
        payments {
          id
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