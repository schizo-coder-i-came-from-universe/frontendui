import React, { useState, useEffect } from 'react';
const open = 'ece19b93-39de-41c2-93ae-efbb5f125a67'
const closed = 'fce5bc69-f1e8-4150-a20a-ee1a9503af0b'
import {AdmissionStateToggleButton} from './AdmissionStateToggleButton.jsx'
import {PaymentGenerator} from './PaymentGenerator.jsx'
/**
 * A component that displays medium-level content for an admission entity.
 *
 * This component renders a label "AdmissionMediumContent" followed by a serialized representation of the `admission` object
 * and any additional child content. It is designed to handle and display information about an admission entity object.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionMediumContent component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The name or label of the admission entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `admission` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionMediumContent admission={admissionEntity}>
 *   <p>Additional information about the entity.</p>
 * </AdmissionMediumContent>
 */
export const AdmissionMediumContent = ({admission, children, onRefresh,isEditMode}) => {
    console.log(admission)
    
    // Local state to track payments for real-time updates
    const [payments, setPayments] = useState(admission.paymentInfo.payments);
    
    // Update local state when admission prop changes
    useEffect(() => {
        setPayments(admission.paymentInfo.payments);
    }, [admission.paymentInfo.payments]);
    
    const handlePaymentAdded = (newPayment) => {
        console.log("New payment added:", newPayment);
        // Update local payments state immediately
        setPayments(prevPayments => [...prevPayments, newPayment]);
    };

    const paidApplicationsCount = payments.filter(payment => payment.amount).length;
    console.log(admission.program.licencedGroup)
    return (
        <>
                {/* {admission.name} */}
                {/* {admission.id} */}
                {/* Status: {new Date() < new Date(admission.endDate) ? "Open" : "Closed"} */}
                {/* Status real: {admission.stateId} */}
                Status: <span className={`fs-5 fw-semibold ${admission.stateId === open ? "text-success" : admission.stateId === closed ? "text-danger" : "text-secondary"}`}>
                    {admission.stateId === open ? "Otevřené" : admission.stateId === closed ? "Zavřené" : "Unknown"}
                </span>
                <br/>
                {payments.length} Podaných přihlášek ({paidApplicationsCount} zaplacených)
                <br/>
                {/* {admission.program.licencedGroup.name} */}
                <br/>
                {isEditMode &&
                <div className="d-flex justify-content-between align-items-center">
                    <AdmissionStateToggleButton admission={admission} onRefresh={onRefresh} />
                    <PaymentGenerator 
                        paymentInfoId={admission.paymentInfo.id} 
                        onPaymentAdded={handlePaymentAdded}
                    />
                </div>
                }
            {children}
            
        </>
        )
}
