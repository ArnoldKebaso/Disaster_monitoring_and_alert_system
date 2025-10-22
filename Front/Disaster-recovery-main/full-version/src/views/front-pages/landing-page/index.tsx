'use client'

// React Imports
import { useEffect } from 'react'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import DisasterAlertHomePage from './DisasterAlertHomePage'
import { useSettings } from '@core/hooks/useSettings'

const LandingPageWrapper = ({ mode }: { mode: Mode }) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <DisasterAlertHomePage mode={mode} />
}

export default LandingPageWrapper
