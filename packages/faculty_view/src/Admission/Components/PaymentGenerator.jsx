import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentAddAsyncAction } from "../Queries/PaymentAddAsyncAction";

/**
 * PaymentGenerator Component
 * 
 * A button component that generates a new payment for an admission.
 * It randomly assigns an amount (70% chance of 400, 30% chance of null) and
 * calls the onPaymentAdded callback when successful.
 * 
 * @component
 * @param {Object} props - The props for the PaymentGenerator component.
 * @param {string} props.paymentInfoId - The payment info ID to associate with the new payment.
 * @param {Function} props.onPaymentAdded - Callback function called when payment is successfully added.
 * @param {Object} props.onPaymentAdded.payment - The newly created payment object.
 * 
 * @returns {JSX.Element} A button element with payment generation functionality.
 * 
 * @example
 * <PaymentGenerator 
 *   paymentInfoId="payment-info-123" 
 *   onPaymentAdded={(payment) => console.log('Payment added:', payment)} 
 * />
 */
export const PaymentGenerator = ({ paymentInfoId, onPaymentAdded }) => {
  const { fetch, loading } = useAsyncAction(PaymentAddAsyncAction, {}, { deferred: true });

  // This function is called when the user clicks the "Add Payment" button
  const handleAddPayment = async () => {
    try {
      // Generate amount with 50/50 chance of being 400
      const amount = Math.random() < 0.7 ? 400 : null;
      
      const result = await fetch({ paymentInfoId, amount });
      if (result && result.paymentInsert && result.paymentInsert.__typename === "PaymentGQLModel") {
        onPaymentAdded(result.paymentInsert);
      }
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <button
      onClick={handleAddPayment}
      disabled={loading}
      className="btn btn-success fw-bold"
    >
      {loading ? "Přidávám..." : "➕ Přidat žádost"}
    </button>
  );
};