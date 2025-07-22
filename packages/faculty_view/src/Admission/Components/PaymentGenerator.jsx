import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentAddAsyncAction } from "../Queries/PaymentAddAsyncAction";

// This component is used to generate a new payment ID for an admission
export const PaymentGenerator = ({ paymentInfoId, onPaymentAdded }) => {
  const { fetch, loading } = useAsyncAction(PaymentAddAsyncAction, {}, { deferred: true });

  // This function is called when the user clicks the "Add Payment" button
  const handleAddPayment = async () => {
    try {
      // Generate amount with 50/50 chance of being 400
      const amount = Math.random() < 1 ? 400 : null;
      
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
      className="btn btn-success fw-bold ms-2"
    >
      {loading ? "Přidávám..." : "➕ Přidat žádost"}
    </button>
  );
};