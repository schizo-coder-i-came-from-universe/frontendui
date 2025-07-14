import { useEffect,useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement,AdmissionButton, AdmissionLargeCard } from "../Components"
import { AdmissionReadAsyncAction } from "../Queries"
import { AdmissionPageNavbar } from "./AdmissionPageNavbar"
import {ProgramSelect} from "../Components/ProgramSelect"
import { format } from "date-fns"

/**
 * A page content component for displaying detailed information about an admission entity.
 *
 * This component utilizes AdmissionLargeCard to create a structured layout and displays 
 * the serialized representation of the admission object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionPageContent component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The name or label of the admission entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an admission entity.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionPageContent admission={admissionEntity} />
 */

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
const AdmissionTimeline = ({ admission }) => {
  const events = [
    { label: "📥 Začátek podávání přihlášek", date: admission.applicationStartDate },
    { label: "📤 Konec podávání přihlášek", date: admission.applicationLastDate },
    { label: "📝 Začátek přijímacích zkoušek", date: admission.examStartDate },
    { label: "✅ Konec přijímacích zkoušek", date: admission.examLastDate },
    { label: "💳 Termín platby", date: admission.paymentDate },
    { label: "📄 Termín doložení podmínek", date: admission.conditionDate },
    { label: "⏳ Prodloužený termín podmínek", date: admission.conditionExtendedDate },
  ].filter(e => e.date);

  const today = new Date();
  const todayISO = today.toISOString();

  const allEvents = [
    ...events,
    { label: "📍 Dnes", date: todayISO, isToday: true }
  ];

  const sorted = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ borderLeft: "3px solid #007bff", paddingLeft: "20px", marginTop: "20px" }}>
      <h3 style={{ marginBottom: "1rem" }}>🗓️ Časová osa přijímacího řízení</h3>
      {sorted.map(({ label, date, isToday }, i) => (
        <div key={i} style={{ marginBottom: "15px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-11px",
              top: "4px",
              width: "10px",
              height: "10px",
              backgroundColor: isToday ? "#28a745" : "#007bff",
              borderRadius: "50%",
            }}
          />
          <strong style={isToday ? { color: "#28a745" } : {}}>{label}</strong>
          <br />
          <span style={{ color: "#000" }}>{format(new Date(date), "d. M. yyyy")}</span>
        </div>
      ))}
    </div>
  );
};


export const AdmissionPageContent = ({
    admission, isEditMode
  }) => {
    // Store selected program in state
    const [selectedProgram, setSelectedProgram] = useState(admission.program);

    // State to hold user-inputted amount
    const {fetch} = useAsyncAction(AdmissionUpdateAsyncAction, {}, {deferred: true})
    const [newAmount, setNewAmount] = useState(admission.paymentInfo.amount || 0)
    

    // Load status from localStorage (fallback to true)
    const getProgramOpenStatus = (programId) => {
      const stored = localStorage.getItem(`admission-open-${programId}`);
      return stored === null ? true : stored === "true";
    };
    // Function to handle program change
    const handleProgramChange = (program) => {
      if (program) {
        const isAdmissionOpen = getProgramOpenStatus(program.id);
        setSelectedProgram({ ...program, isAdmissionOpen });
      }
    };
    const toggleAdmissionStatus = () => {
      if (selectedProgram) {
        const updatedStatus = !selectedProgram.isAdmissionOpen;
        localStorage.setItem(`admission-open-${selectedProgram.id}`, updatedStatus.toString());
    
        setSelectedProgram((prev) => ({
          ...prev,
          isAdmissionOpen: updatedStatus,
        }));
      }
    };
    // Function to handle payment update
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);

    //Function to handle opening and closing admission, redundant with the toggleAdmissionStatus
    //const [isAdmissionOpen, setIsAdmissionOpen] = useState(admission.isOpen ?? true);

    
    return (
      <>
        <AdmissionPageNavbar admission={admission} />
        <AdmissionLargeCard admission={admission}>
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          {/* Left side: main content */}
          <div style={{ flex: 1 }}>
            ID programu : {selectedProgram?.id}
            <br />
            Jmeno programu: {selectedProgram?.name}
            <br />



            <br />
            <div
            onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            style={{
              color: "red",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              marginBottom: "5px",
            }}
          >
            Informace k platbě {showPaymentDetails ? "▲" : "▼"}
          </div>

          {showPaymentDetails && (
            <div style={{ marginBottom: "10px" }}>
              Částka: {admission.paymentInfo.amount}
              <br />
              Číslo účtu: {admission.paymentInfo.accountNumber}
              <br />
              SWIFT: {admission.paymentInfo.SWIFT}
              <br />
              IBAN: {admission.paymentInfo.IBAN}
              <br />
            </div>)}

            Pocet podanych zadosti: {admission.paymentInfo.payments.length}
            <br />

            <br />
            <label>
              Nová částka:
                <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(parseFloat(e.target.value) || 0)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  fontSize: "14px",
                }}
              />
            </label>
            <br />
            <br />
            {isEditMode &&
            <button
              onClick={() =>
                fetch({
                  amount: newAmount,
                  id: admission.paymentInfo.id,
                  lastchange: admission.paymentInfo.lastchange,
                })
              }
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              💾 Aktualizovat platbu
            </button>}
            <br />
            <div style={{ color: "blue", fontWeight: "bold" }}>
              Vyber studijního programu:
            </div>
            <ProgramSelect
              selectedId={selectedProgram.id}
              onChange={handleProgramChange}
            />
          </div>
          <br />
          {selectedProgram && (
  <>
    <div style={{ fontWeight: "bold" }}>
      Stav přijímacího řízení:{" "}
      <span style={{ color: selectedProgram.isAdmissionOpen ? "green" : "red" }}>
        {selectedProgram.isAdmissionOpen ? "Otevřené" : "Uzavřené"}
      </span>
    </div>
    {isEditMode && 
    <button
      onClick={toggleAdmissionStatus}
      style={{
        backgroundColor: selectedProgram.isAdmissionOpen ? "red" : "green",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        marginBottom: "10px",
        marginTop: "5px",
      }}
    >
      {selectedProgram.isAdmissionOpen ? "Uzavřít řízení" : "Otevřít řízení"}
    </button>}
  </>
)}

          {/* Right side: timeline */}
          <div style={{ width: "320px", minWidth: "250px" }}>
            <AdmissionTimeline admission={admission} />
          </div>
        </div>
      </AdmissionLargeCard>
      </>
    );
  };

/**
 * A lazy-loading component for displaying content of an admission entity.
 *
 * This component is created using createLazyComponent and wraps AdmissionPageContent to provide
 * automatic data fetching for the admission entity. It uses the AdmissionReadAsyncAction to fetch
 * the entity data and dynamically injects it into the wrapped component as the admission prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.admission - The identifier of the admission entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the admission entity data and displays it
 * using AdmissionPageContent, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const admissionId = "12345";
 *
 * <AdmissionPageContentLazy admission={admissionId} />
 */
const AdmissionPageContentLazy = ({admission, isEditMode}) => {
    const { error, loading, entity, fetch } = useAsyncAction(AdmissionReadAsyncAction, admission)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <AdmissionPageContent admission={entity} isEditMode={isEditMode} onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an admission entity.
 *
 * This component extracts the id parameter from the route using useParams,
 * constructs an admission object, and passes it to the AdmissionPageContentLazy component.
 * The AdmissionPageContentLazy component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the admission entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/admission/:id" element={<AdmissionPage />} />
 *
 * // Navigating to "/admission/12345" will render the page for the admission entity with ID 12345.
 */
export const AdmissionPage = ({isEditMode}) => {
    const {id} = useParams()
    const admission = {id}
    return <AdmissionPageContentLazy isEditMode={isEditMode} admission={admission} />
}