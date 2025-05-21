import React, { forwardRef } from 'react'
import ModernTemplate from './ModernTemplate'
import ProfessionalTemplate from './ProfessionalTemplate'
import CreativeTemplate from './CreativeTemplate'
import ExecutiveTemplate from './ExecutiveTemplate'
import PremiumTemplate from './PremiumTemplate'

const ResumePreview = forwardRef(({ resumeData, template, colorTheme }, ref) => {
  const templates = {
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
    premium: PremiumTemplate
  }

  const SelectedTemplate = templates[template] || ModernTemplate

  return (
    <div ref={ref} className="resume-preview-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <SelectedTemplate resumeData={resumeData} colorTheme={colorTheme} />
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview 