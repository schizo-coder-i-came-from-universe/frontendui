import { useEffect,useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement,AdmissionButton, AdmissionLargeCard} from "../Components"
import { PaymentGenerator } from "../Components/PaymentGenerator"
import { AdmissionReadAsyncAction } from "../Queries"
import AdmissionUpdateAsyncAction from "../Queries/PaymentInfoUpdateAsyncAction"
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

// This component displays a timeline of important dates related to the admission process.
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
  // Today's date in ISO format
  const today = new Date();
  const todayISO = today.toISOString();

  const allEvents = [
    ...events,
    { label: "📍 Dnes", date: todayISO, isToday: true }
  ];

  const sorted = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
//format the date to a more readable format
  return (
    <div className="border-start border-primary border-3 ps-4 mt-4">
      <h3 className="mb-3">🗓️ Časová osa přijímacího řízení</h3>
      {sorted.map(({ label, date, isToday }, i) => (
        <div key={i} className="mb-3 position-relative">
          <div
            className={`position-absolute rounded-circle ${isToday ? 'bg-success' : 'bg-primary'}`}
            style={{
              left: "-11px",
              top: "4px",
              width: "10px",
              height: "10px",
            }}
          />
          <strong className={isToday ? 'text-success' : ''}>{label}</strong>
          <br />
          <span className="text-dark">{format(new Date(date), "d. M. yyyy")}</span>
        </div>
      ))}
    </div>
  );
};

// This component serves as the main content area for the admission page, displaying detailed information about a specific admission entity.
export const AdmissionPageContent = ({
    admission, isEditMode
  }) => {
    
    // State to hold the selected program, initialized with the admission's program
    const [selectedProgram, setSelectedProgram] = useState(admission.program);

    // State to hold user-inputted amount
    const {fetch} = useAsyncAction(AdmissionUpdateAsyncAction, {}, {deferred: true})
    const [newAmount, setNewAmount] = useState(admission.paymentInfo.amount || 0)
    
    // State to track payment count for UI updates
    const [paymentCount, setPaymentCount] = useState(admission.paymentInfo.payments?.length || 0)
    
    // Handler for when a new payment is added
    const handlePaymentAdded = (newPayment) => {
      setPaymentCount(prevCount => prevCount + 1)
    }
    
  

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
    // Effect to initialize selectedProgram with the admission's program
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
        <div className="d-flex align-items-start" style={{ gap: "40px" }}>
          {/* Left side: main content */}
          <div className="flex-grow-1">
            ID programu : {selectedProgram?.id}
            <br />
            Jmeno programu: {selectedProgram?.name}
            <br />
            <div className="my-4"></div>
            <div>Částka: {admission.paymentInfo.amount}</div>
            <div
            onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            className="text-danger fw-bold mb-1"
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Informace k platbě {showPaymentDetails ? "▲" : "▼"}
          </div>
          {showPaymentDetails && (
            <div style={{ marginBottom: "10px" }}>
              Číslo účtu: {admission.paymentInfo.accountNumber}
              <br />
              SWIFT: {admission.paymentInfo.SWIFT}
              <br />
              IBAN: {admission.paymentInfo.IBAN}
              <br />
            </div>)}

            Pocet podanych zadosti: {admission.paymentInfo.payments.length}
            {isEditMode && (
              <PaymentGenerator 
                paymentInfoId={admission.paymentInfo.id}
                onPaymentAdded={handlePaymentAdded}
              />
            )}
            <div className="my-5"></div>
            {isEditMode &&
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
            </label>}
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
              className="btn btn-primary fw-bold"
            >
              💾 Aktualizovat platbu
            </button>}
            <br />
            <div className="text-primary fw-bold">
            <div className="my-4"></div>
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
    <div className="fw-bold">
      Stav přijímacího řízení:{" "}
      <span className={selectedProgram.isAdmissionOpen ? "text-success" : "text-danger"}>
        {selectedProgram.isAdmissionOpen ? "Otevřené" : "Uzavřené"}
      </span>
    </div>
    {isEditMode && 
    <button
      onClick={toggleAdmissionStatus}
      className={`btn fw-bold mb-2 mt-1 ${selectedProgram.isAdmissionOpen ? 'btn-danger' : 'btn-success'}`}
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