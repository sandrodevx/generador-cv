import { forwardRef } from 'react'
import ModernTemplate from './ModernTemplate'
import ProfessionalTemplate from './ProfessionalTemplate'
import CreativeTemplate from './CreativeTemplate'
import ExecutiveTemplate from './ExecutiveTemplate'

const ResumePreview = forwardRef(({ resumeData, template, colorTheme }, ref) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} colorTheme={colorTheme} />
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} colorTheme={colorTheme} />
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} colorTheme={colorTheme} />
      case 'executive':
        return <ExecutiveTemplate resumeData={resumeData} colorTheme={colorTheme} />
      default:
        return <ModernTemplate resumeData={resumeData} colorTheme={colorTheme} />
    }
  }

  return (
    <div ref={ref} className="resume-preview-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      {renderTemplate()}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview 