import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * GraphQL mutation for adding a new payment record.
 * Creates a new payment entry associated with payment information.
 * 
 * @param {string} paymentInfoId - UUID of the payment info to associate with this payment
 * @param {number} amount - Payment amount as a float value
 * 
 * @returns {Object} Either a PaymentGQLModel with payment details or an InsertError
 * @returns {string} returns.id - UUID of the created payment (on success)
 * @returns {number} returns.amount - Payment amount (on success)
 * @returns {Object} returns.paymentInfo - Associated payment info with all payments
 * @returns {string} returns.msg - Error message (on failure)
 * @returns {boolean} returns.failed - Failure flag (on failure)
 * 
 * @example
 * // Add a new payment
 * const result = await PaymentAddAsyncAction({
 *   paymentInfoId: "12345678-1234-1234-1234-123456789abc",
 *   amount: 500.00
 * });
 * 
 * @example
 * // Handle potential errors
 * const result = await PaymentAddAsyncAction({
 *   paymentInfoId: "invalid-id",
 *   amount: -100
 * });
 * if (result.failed) {
 *   console.error('Payment creation failed:', result.msg);
 * }
 */
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

/**
 * Async action creator for adding payment records.
 * Provides a Redux-compatible action creator for payment insertion.
 * 
 * @function
 * @param {Object} variables - The GraphQL variables
 * @param {string} variables.paymentInfoId - UUID of the payment info
 * @param {number} variables.amount - Payment amount
 * @returns {Function} Redux action creator function
 */
export const PaymentAddAsyncAction = createAsyncGraphQLAction(PaymentAddMutation);