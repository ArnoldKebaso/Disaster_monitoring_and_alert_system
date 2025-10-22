// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import DisasterAlertFooter from '@components/layout/front-pages/DisasterAlertFooter'
import DisasterAlertHeader from '@components/layout/front-pages/DisasterAlertHeader'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

const FrontLayout = async ({ children }: ChildrenType) => {
  // Vars
  const mode = await getServerMode()

  return (
    <div className={frontLayoutClasses.root}>
      <DisasterAlertHeader mode={mode} />
      {children}
      <DisasterAlertFooter />
    </div>
  )
}

export default FrontLayout
