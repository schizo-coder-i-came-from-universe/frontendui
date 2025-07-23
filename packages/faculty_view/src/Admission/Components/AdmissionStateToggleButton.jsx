import React from 'react'
import { Button } from 'react-bootstrap'
import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
import { AdmissionUpdateAsyncAction } from '../Queries/AdmissionUpdateAsyncAction'

const open = 'ece19b93-39de-41c2-93ae-efbb5f125a67'
const closed = 'fce5bc69-f1e8-4150-a20a-ee1a9503af0b'

/**
 * AdmissionStateToggleButton Component
 * 
 * A toggle button that allows switching between open and closed states for an admission.
 * The button displays appropriate text and styling based on the current state.
 * 
 * @component
 * @param {Object} props - The props for the AdmissionStateToggleButton component.
 * @param {Object} props.admission - The admission object to toggle state for.
 * @param {string} props.admission.id - Unique identifier for the admission.
 * @param {string} props.admission.stateId - Current state ID of the admission.
 * @param {string} props.admission.lastchange - Last change timestamp for optimistic locking.
 * @param {Function} [props.onRefresh] - Optional callback function to refresh data after state change.
 * 
 * @returns {JSX.Element} A Bootstrap Button component with toggle functionality.
 * 
 * @example
 * const admission = {
 *   id: "123",
 *   stateId: "ece19b93-39de-41c2-93ae-efbb5f125a67",
 *   lastchange: "2023-01-01T00:00:00Z"
 * };
 * 
 * <AdmissionStateToggleButton 
 *   admission={admission} 
 *   onRefresh={() => console.log('Refreshing data')} 
 * />
 */
export const AdmissionStateToggleButton = ({ admission, onRefresh }) => {
  const { loading, fetch } = useAsyncAction(AdmissionUpdateAsyncAction, {}, { deferred: true })

  const currentStateId = admission.stateId || open // Default to 'open' if no stateId
  const isOpen = currentStateId === open
  const nextStateId = isOpen ? closed : open
  const buttonText = isOpen ? 'Zavřít' : 'Otevřít'
  const buttonVariant = isOpen ? 'danger' : 'success'

  const handleToggle = async () => {
    try {
      await fetch({
        id: admission.id,
        lastchange: admission.lastchange,
        stateId: nextStateId
      })
      // Refresh the admission list after successful state change
      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error('Error updating admission state:', error)
    }
  }

  return (
    <Button
      variant={buttonVariant}
      size="me"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? 'Ukládám...' : buttonText}
    </Button>
  )
}