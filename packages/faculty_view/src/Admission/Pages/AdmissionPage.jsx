import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement,AdmissionButton, AdmissionLargeCard } from "../Components"
import { AdmissionReadAsyncAction } from "../Queries"
import { AdmissionPageNavbar } from "./AdmissionPageNavbar"

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

const AdmissionPageContent = ({admission}) => {
    const {fetch} = useAsyncAction(AdmissionUpdateAsyncAction, {}, {deferred: true})
    // State to hold user-inputted amount
    const [newAmount, setNewAmount] = useState(admission.paymentInfo.amount || 0)

    return (<>
        <AdmissionPageNavbar admission={admission} />
        <AdmissionLargeCard admission={admission}>
            {/* Admission {JSON.stringify(admission)} */}
            <br />
            {/* ID programu : {admission.program.id} */}
            <br />
            Jmeno programu: {admission.program.name}
            <br />
            Datum zacatku prijimaciho rizeni: {admission.examStartDate}
            <br />
            Datum ukonceni: {admission.examLastDate}
            <br />
            <br />
            <div style={{ color: 'red', fontWeight: 'bold' }}>
            Informace k platbe: 
            </div>
            <br />
            Castka: {admission.paymentInfo.amount}
            <br />
            Cislo uctu: {admission.paymentInfo.accountNumber}
            <br />
            SWIFT: {admission.paymentInfo.SWIFT}
            <br />
            IBAN: {admission.paymentInfo.IBAN}
            <br />
            <br />
            Datum podani zadosti: {admission.conditionDate}
            <br />
            Prodlouzeni: {admission.conditionExtendedDate}
            <br />
            Datum podani zadosti o prodlouzeni: {admission.requestExtraDateDate}
            <br />
            Pocet podanych zadosti:
            <br />
            {/* Input for new amount */}
            <label>
                    Nová částka:
                    <input 
                        type="number" 
                        value={newAmount} 
                        onChange={(e) => setNewAmount(parseFloat(e.target.value) || 0)} 
                        style={{ marginLeft: '10px', padding: '5px', fontSize: '14px' }}
                    />
                </label>

                <br /><br />

                <button 
                    onClick={() => fetch({
                        amount: newAmount,
                        id: admission.paymentInfo.id,
                        lastchange: admission.paymentInfo.lastchange
                    })} 
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    💾 Aktualizovat platbu
                </button>
            {/* <AdmissionButton operation="U" admission={admission} className="btn btn-primary">Upravit</AdmissionButton> */}
            {/* <StateMachnineManagement admission={admission} /> */}
        </AdmissionLargeCard>
    </>)
}

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
const AdmissionPageContentLazy = ({admission}) => {
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
        {entity && <AdmissionPageContent admission={entity}  onChange={handleChange} onBlur={handleBlur} />}
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
export const AdmissionPage = () => {
    const {id} = useParams()
    const admission = {id}
    return <AdmissionPageContentLazy admission={admission} />
}



