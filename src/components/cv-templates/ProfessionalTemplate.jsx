import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Image } from 'react-bootstrap'

const ProfessionalTemplate = ({ resumeData, colorTheme = { primary: '#4361ee', secondary: '#3f37c9', accent: '#4895ef' } }) => {
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
    <div className="professional-resume" style={{ fontFamily: 'Georgia, serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', borderBottom: `1px solid ${colorTheme.secondary}`, paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        {personalInfo.profileImage && (
          <div style={{ marginBottom: '1.2rem' }}>
            <img 
              src={personalInfo.profileImage} 
              alt="Foto de perfil"
              style={{ 
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${colorTheme.primary}`,
                padding: '3px',
                backgroundColor: '#fff'
              }}
            />
          </div>
        )}
        <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '0.5rem', color: '#000' }}>
          {personalInfo.fullName || 'Tu Nombre'}
        </h1>
        <h2 style={{ fontSize: '1.2rem', color: colorTheme.primary, fontWeight: 'normal', marginBottom: '1rem' }}>
          {personalInfo.title || 'Tu Título Profesional'}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.portfolio && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
          
          {personalInfo.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '0.5rem', color: colorTheme.primary }} />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Left Column */}
        <div style={{ width: '70%' }}>
          {/* Professional Summary */}
          {professionalSummary && (
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Perfil Profesional
              </h3>
              <p style={{ textAlign: 'justify', color: '#555' }}>
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Experiencia Profesional
              </h3>
              {workExperience.map((exp, index) => (
                <div key={index} style={{ marginBottom: index < workExperience.length - 1 ? '1.5rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: colorTheme.secondary, marginBottom: 0 }}>
                      {exp.position}
                    </h4>
                    <span style={{ fontSize: '0.9rem', color: '#777', fontStyle: 'italic' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 'normal', color: '#555', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                    {exp.company}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: 0, textAlign: 'justify' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Formación Académica
              </h3>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: index < education.length - 1 ? '1.5rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: colorTheme.secondary, marginBottom: 0 }}>
                      {edu.degree}
                    </h4>
                    <span style={{ fontSize: '0.9rem', color: '#777', fontStyle: 'italic' }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#555', marginBottom: '0.5rem' }}>
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: 0 }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '30%' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', borderLeft: `3px solid ${colorTheme.accent}` }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Competencias
              </h3>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                {skills.map((skill, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#333' }}>{skill.name}</span>
                    {skill.level && <span style={{ color: '#777', fontStyle: 'italic', fontSize: '0.9rem' }}> ({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section style={{ marginBottom: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', borderLeft: `3px solid ${colorTheme.accent}` }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Idiomas
              </h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
                {languages.map((lang, index) => (
                  <li key={index} style={{ marginBottom: '0.7rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{lang.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#777' }}>{lang.level}</div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', borderLeft: `3px solid ${colorTheme.accent}` }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: `1px solid ${colorTheme.accent}`, paddingBottom: '0.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: colorTheme.primary }}>
                Certificaciones
              </h3>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                {certifications.map((cert, index) => (
                  <li key={index} style={{ marginBottom: '0.7rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{cert.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#777' }}>
                      {cert.organization}
                      {cert.year && <span> ({cert.year})</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalTemplate 