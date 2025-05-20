import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Image } from 'react-bootstrap'

const ModernTemplate = ({ resumeData, colorTheme = { primary: '#4361ee', secondary: '#3f37c9', accent: '#4895ef' } }) => {
  const { 
    personalInfo, 
    professionalSummary, 
    workExperience, 
    education, 
    skills,
    languages,
    certifications
  } = resumeData

  return (
    <div className="modern-resume" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* Header */}
      <header style={{ marginBottom: '1.5rem', borderBottom: `2px solid ${colorTheme.primary}`, paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          {personalInfo.profileImage && (
            <div style={{ marginRight: '1.5rem' }}>
              <img 
                src={personalInfo.profileImage} 
                alt="Foto de perfil"
                style={{ 
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${colorTheme.primary}`
                }}
              />
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '2.5rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '700' }}>
              {personalInfo.fullName || 'Tu Nombre'}
            </h1>
            <h2 style={{ fontSize: '1.5rem', color: colorTheme.primary, marginBottom: '1rem', fontWeight: '500' }}>
              {personalInfo.title || 'Tu Título Profesional'}
            </h2>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
              <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          
          {personalInfo.portfolio && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Professional Summary */}
        {professionalSummary && (
          <section>
            <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              Resumen Profesional
            </h3>
            <p style={{ lineHeight: '1.6', color: '#495057', textAlign: 'justify' }}>
              {professionalSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              Experiencia Laboral
            </h3>
            {workExperience.map((exp, index) => (
              <div key={index} style={{ marginBottom: index < workExperience.length - 1 ? '1rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#212529', marginBottom: '0.2rem' }}>
                    {exp.position}
                  </h4>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '500', color: '#495057', marginBottom: '0.5rem' }}>
                  {exp.company}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', textAlign: 'justify' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              Educación
            </h3>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: index < education.length - 1 ? '1rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#212529', marginBottom: '0.2rem' }}>
                    {edu.degree}
                  </h4>
                  <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '500', color: '#495057', marginBottom: '0.5rem' }}>
                  {edu.institution}
                </p>
                {edu.description && (
                  <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1 }}>
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Habilidades
                </h3>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                  {skills.map((skill, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 500 }}>{skill.name}</span>
                      {skill.level && <span style={{ color: '#6c757d', fontStyle: 'italic' }}> - {skill.level}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Idiomas
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
                  {languages.map((lang, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faLanguage} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
                      <span>{lang.name} - <span style={{ color: '#6c757d' }}>{lang.level}</span></span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section style={{ marginTop: languages.length > 0 ? '1.5rem' : 0 }}>
                <h3 style={{ fontSize: '1.2rem', color: colorTheme.primary, borderBottom: '1px solid #dee2e6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Certificaciones
                </h3>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                  {certifications.map((cert, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontWeight: 500 }}>{cert.name}</span>
                        {cert.year && <span style={{ color: '#6c757d' }}> ({cert.year})</span>}
                      </div>
                      {cert.organization && (
                        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                          {cert.organization}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernTemplate 