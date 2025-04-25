import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachnineManagement, AdmissionButton, AdmissionLargeCard } from "../Components"
import { AdmissionReadAsyncAction } from "../Queries"
import { AdmissionPageNavbar } from "./AdmissionPageNavbar"

/**
 * A page content component for displaying detailed information about an Admission entity.
 *
 * This component utilizes `AdmissionLargeCard` to create a structured layout and displays 
 * the serialized representation of the `Admission` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionPageContent component.
 * @param {Object} props.Admission - The object representing the Admission entity.
 * @param {string|number} props.Admission.id - The unique identifier for the Admission entity.
 * @param {string} props.Admission.name - The name or label of the Admission entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an Admission entity.
 *
 * @example
 * // Example usage:
 * const AdmissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionPageContent Admission={AdmissionEntity} />
 */
const AdmissionPageContent = ({Admission}) => {
    return (<>
            <StateMachnineManagement Admission={Admission} />
            <pre>{JSON.stringify(Admission, null, 2)}</pre> 
    </>)
}

/**
 * A lazy-loading component for displaying content of an Admission entity.
 *
 * This component is created using `createLazyComponent` and wraps `AdmissionPageContent` to provide
 * automatic data fetching for the `Admission` entity. It uses the `AdmissionReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `Admission` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.Admission - The identifier of the Admission entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `Admission` entity data and displays it
 * using `AdmissionPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const AdmissionId = "12345";
 *
 * <AdmissionPageContentLazy Admission={AdmissionId} />
 */
const AdmissionPageContentLazy = ({Admission}) => {
    const { error, loading, entity, fetch } = useAsyncAction(AdmissionReadAsyncAction, Admission)
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
        {entity && <AdmissionPageContent Admission={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an Admission entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `Admission` object, and passes it to the `AdmissionPageContentLazy` component.
 * The `AdmissionPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the Admission entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/Admission/:id" element={<AdmissionPage />} />
 *
 * // Navigating to "/Admission/12345" will render the page for the Admission entity with ID 12345.
 */
export const TestPage = () => {
    const Admission = {id: "995a0dd2-3697-4e40-ae68-5bc3d9fe8c81"}
    return <AdmissionPageContentLazy Admission={Admission} />
}