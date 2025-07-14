import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentAddAsyncAction } from "../Queries/PaymentAddAsyncAction";

export const PaymentGenerator = ({ paymentInfoId, onPaymentAdded }) => {
  const { fetch, loading } = useAsyncAction(PaymentAddAsyncAction, {}, { deferred: true });

  const handleAddPayment = async () => {
    try {
      const result = await fetch({ paymentInfoId });
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
      style={{
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginLeft: "10px",
      }}
    >
      {loading ? "Přidávám..." : "➕ Přidat žádost"}
    </button>
  );
};