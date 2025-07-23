import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared"

/**
 * GraphQL mutation for updating payment information records.
 * Updates banking and payment details including account numbers, symbols, and amounts.
 * 
 * @param {string} id - UUID of the payment info to update
 * @param {string} lastchange - DateTime timestamp for optimistic locking
 * @param {string} [accountNumber] - Bank account number (optional)
 * @param {string} [specificSymbol] - Specific symbol for payment identification (optional)
 * @param {string} [constantSymbol] - Constant symbol for payment categorization (optional)
 * @param {string} [IBAN] - International Bank Account Number (optional)
 * @param {string} [SWIFT] - SWIFT/BIC code for international transfers (optional)
 * @param {number} [amount] - Payment amount as a float value (optional)
 * 
 * @returns {Object} Either a PaymentInfoGQLModel with updated details or a PaymentInfoGQLModelUpdateError
 * @returns {string} returns.id - UUID of the payment info (on success)
 * @returns {number} returns.amount - Updated payment amount (on success)
 * @returns {string} returns.msg - Error message (on failure)
 * @returns {boolean} returns.failed - Failure flag (on failure)
 * 
 * @example
 * // Update payment info with banking details
 * const result = await PaymentInfoUpdateAsyncAction({
 *   id: "12345678-1234-1234-1234-123456789abc",
 *   lastchange: "2023-12-07T10:30:00Z",
 *   accountNumber: "123456789/0100",
 *   IBAN: "CZ6508000000192000145399",
 *   amount: 1500.50
 * });
 * 
 * @example
 * // Handle update errors
 * const result = await PaymentInfoUpdateAsyncAction({
 *   id: "invalid-id",
 *   lastchange: "2023-12-07T10:30:00Z"
 * });
 * if (result.failed) {
 *   console.error('Payment info update failed:', result.msg);
 * }
 */
const PaymentInfoUpdateAsyncAction = createAsyncGraphQLAction(`
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

/**
 * Async action creator for updating payment information records.
 * Provides a Redux-compatible action creator for payment info updates.
 * 
 * @function
 * @param {Object} variables - The GraphQL variables
 * @param {string} variables.id - UUID of the payment info to update
 * @param {string} variables.lastchange - DateTime timestamp for optimistic locking
 * @param {string} [variables.accountNumber] - Bank account number
 * @param {string} [variables.specificSymbol] - Specific symbol for payment identification
 * @param {string} [variables.constantSymbol] - Constant symbol for payment categorization
 * @param {string} [variables.IBAN] - International Bank Account Number
 * @param {string} [variables.SWIFT] - SWIFT/BIC code
 * @param {number} [variables.amount] - Payment amount
 * @returns {Function} Redux action creator function
 */
export default PaymentInfoUpdateAsyncAction