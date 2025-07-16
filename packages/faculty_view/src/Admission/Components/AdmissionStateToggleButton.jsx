import React from 'react'
import { Button } from 'react-bootstrap'
import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
import { AdmissionUpdateAsyncAction } from '../Queries/AdmissionUpdateAsyncAction'

const open = 'ece19b93-39de-41c2-93ae-efbb5f125a67'
const closed = 'fce5bc69-f1e8-4150-a20a-ee1a9503af0b'

export const AdmissionStateToggleButton = ({ admission }) => {
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
    } catch (error) {
      console.error('Error updating admission state:', error)
    }
  }

  return (
    <Button
      variant={buttonVariant}
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? 'Ukládám...' : buttonText}
    </Button>
  )
}