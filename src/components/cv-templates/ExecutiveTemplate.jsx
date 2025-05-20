import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'

const ExecutiveTemplate = ({ resumeData }) => {
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
    <div className="executive-resume" style={{ fontFamily: '"Times New Roman", Times, serif', color: '#333' }}>
      {/* Header with dark background */}
      <header style={{ 
        backgroundColor: '#1c1c1c', 
        color: 'white', 
        padding: '2rem',
        marginBottom: '1rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '400', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              marginBottom: '0.25rem'
            }}>
              {personalInfo.fullName || 'Tu Nombre'}
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              fontWeight: '300', 
              letterSpacing: '1px',
              margin: 0
            }}>
              {personalInfo.title || 'Tu Título Profesional'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            {personalInfo.email && (
              <div style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ marginRight: '0.5rem' }}>{personalInfo.email}</span>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ marginRight: '0.5rem' }}>{personalInfo.phone}</span>
                <FontAwesomeIcon icon={faPhone} />
              </div>
            )}
            {personalInfo.location && (
              <div style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ marginRight: '0.5rem' }}>{personalInfo.location}</span>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Professional Summary */}
        {professionalSummary && (
          <section style={{ 
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#1c1c1c',
              marginBottom: '1rem',
              fontWeight: '400',
              borderLeft: '4px solid #1c1c1c',
              paddingLeft: '0.75rem'
            }}>
              Perfil Ejecutivo
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              textAlign: 'justify',
              fontStyle: 'italic'
            }}>
              {professionalSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section style={{ 
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#1c1c1c',
              marginBottom: '1.5rem',
              fontWeight: '400',
              borderLeft: '4px solid #1c1c1c',
              paddingLeft: '0.75rem'
            }}>
              Trayectoria Profesional
            </h2>
            
            {workExperience.map((exp, index) => (
              <div key={index} style={{ marginBottom: index < workExperience.length - 1 ? '1.5rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 2 }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      marginBottom: '0.25rem', 
                      color: '#1c1c1c'
                    }}>
                      {exp.company}
                    </h3>
                    <p style={{ 
                      fontSize: '1rem', 
                      fontWeight: '400', 
                      fontStyle: 'italic',
                      margin: 0
                    }}>
                      {exp.position}
                    </p>
                  </div>
                  <div style={{ 
                    flex: 1, 
                    textAlign: 'right', 
                    fontSize: '0.9rem', 
                    color: '#666',
                    fontWeight: '400'
                  }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: '1.6', 
                  color: '#444',
                  margin: 0,
                  paddingLeft: '1rem',
                  borderLeft: '1px solid #ddd'
                }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ 
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#1c1c1c',
              marginBottom: '1.5rem',
              fontWeight: '400',
              borderLeft: '4px solid #1c1c1c',
              paddingLeft: '0.75rem'
            }}>
              Formación Académica
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {education.map((edu, index) => (
                <div key={index} style={{ width: '100%', marginBottom: index < education.length - 1 ? '1rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 2 }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        marginBottom: '0.25rem', 
                        color: '#1c1c1c'
                      }}>
                        {edu.institution}
                      </h3>
                      <p style={{ 
                        fontSize: '1rem', 
                        fontWeight: '400', 
                        fontStyle: 'italic',
                        margin: 0
                      }}>
                        {edu.degree}
                      </p>
                    </div>
                    <div style={{ 
                      flex: 1, 
                      textAlign: 'right', 
                      fontSize: '0.9rem', 
                      color: '#666',
                      fontWeight: '400'
                    }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.description && (
                    <p style={{ 
                      fontSize: '0.95rem', 
                      color: '#444',
                      margin: '0.5rem 0 0 0'
                    }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column layout for the rest */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 60%', paddingRight: '2rem' }}>
            {/* Skills */}
            {skills.length > 0 && (
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.3rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  color: '#1c1c1c',
                  marginBottom: '1rem',
                  fontWeight: '400',
                  borderLeft: '4px solid #1c1c1c',
                  paddingLeft: '0.75rem'
                }}>
                  Competencias Profesionales
                </h2>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  margin: '0 -0.5rem'
                }}>
                  {skills.map((skill, index) => (
                    <div key={index} style={{ 
                      padding: '0.25rem 0.75rem',
                      margin: '0 0.5rem 0.75rem 0',
                      borderRadius: '2px',
                      fontSize: '0.9rem',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      display: 'inline-block'
                    }}>
                      {skill.name}
                      {skill.level && <span style={{ color: '#777', fontSize: '0.8rem' }}> ({skill.level})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Links */}
            <section>
              <h2 style={{ 
                fontSize: '1.3rem', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                color: '#1c1c1c',
                marginBottom: '1rem',
                fontWeight: '400',
                borderLeft: '4px solid #1c1c1c',
                paddingLeft: '0.75rem'
              }}>
                Contacto Profesional
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {personalInfo.linkedIn && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faLink} style={{ marginRight: '0.5rem', color: '#1c1c1c' }} />
                    <span style={{ color: '#333' }}>{personalInfo.linkedIn}</span>
                  </div>
                )}
                
                {personalInfo.portfolio && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '0.5rem', color: '#1c1c1c' }} />
                    <span style={{ color: '#333' }}>{personalInfo.portfolio}</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div style={{ flex: '1 1 40%' }}>
            {/* Languages */}
            {languages.length > 0 && (
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.3rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  color: '#1c1c1c',
                  marginBottom: '1rem',
                  fontWeight: '400',
                  borderLeft: '4px solid #1c1c1c',
                  paddingLeft: '0.75rem'
                }}>
                  Idiomas
                </h2>
                
                <div>
                  {languages.map((lang, index) => (
                    <div key={index} style={{ 
                      marginBottom: '0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: index < languages.length - 1 ? '1px dotted #ddd' : 'none',
                      paddingBottom: index < languages.length - 1 ? '0.5rem' : 0
                    }}>
                      <span style={{ fontWeight: '500' }}>{lang.name}</span>
                      <span style={{ color: '#666' }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 style={{ 
                  fontSize: '1.3rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  color: '#1c1c1c',
                  marginBottom: '1rem',
                  fontWeight: '400',
                  borderLeft: '4px solid #1c1c1c',
                  paddingLeft: '0.75rem'
                }}>
                  Certificaciones
                </h2>
                
                <div>
                  {certifications.map((cert, index) => (
                    <div key={index} style={{ marginBottom: index < certifications.length - 1 ? '1rem' : 0 }}>
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>
                        {cert.name}
                        {cert.year && <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.9rem' }}> ({cert.year})</span>}
                      </p>
                      {cert.organization && (
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                          {cert.organization}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveTemplate 