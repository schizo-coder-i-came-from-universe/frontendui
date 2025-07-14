import { useEffect,useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement,AdmissionButton, AdmissionLargeCard} from "../Components"
import { PaymentGenerator } from "../Components/PaymentGenerator"
import { AdmissionReadAsyncAction } from "../Queries"
import AdmissionUpdateAsyncAction from "../Queries/PaymentInfoUpdateAsyncAction"
import { AdmissionPageNavbar } from "./AdmissionPageNavbar"
import { AdmissionTimeline } from "../Components/AdmissionTimeline"
import { ProgramStatusManager } from "../Components/ProgramStatusManager"

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
    
    // Handler for program changes from ProgramStatusManager
    const handleProgramChange = (program) => {
      setSelectedProgram(program);
    };

    // Function to handle payment update
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);

    
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
            <br />
          <div className="my-1"></div>
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
          <div className="my-1"></div>
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
            <ProgramStatusManager 
              admission={admission}
              isEditMode={isEditMode}
              onProgramChange={handleProgramChange}
            />
          </div>

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