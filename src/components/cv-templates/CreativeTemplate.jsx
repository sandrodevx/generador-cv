import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faLink, faStar } from '@fortawesome/free-solid-svg-icons'

const CreativeTemplate = ({ resumeData, colorTheme = { primary: '#4cc9f0', secondary: '#4361ee', accent: '#3a0ca3' } }) => {
  const { 
    personalInfo, 
    professionalSummary, 
    workExperience, 
    education, 
    skills,
    languages,
    certifications
  } = resumeData

  // Función para renderizar estrellas según el nivel de habilidad
  const renderSkillLevel = (level) => {
    let value = 3
    
    switch(level) {
      case 'Principiante':
        value = 1
        break
      case 'Intermedio':
        value = 2
        break
      case 'Avanzado':
        value = 4
        break
      case 'Experto':
        value = 5
        break
      default:
        value = 3
    }
    
    return Array(5).fill(0).map((_, index) => (
      <FontAwesomeIcon 
        key={index} 
        icon={faStar} 
        style={{ 
          color: index < value ? colorTheme.accent : '#e9ecef',
          fontSize: '0.8rem',
          marginRight: '3px'
        }} 
      />
    ))
  }

  return (
    <div className="creative-resume" style={{ fontFamily: '"Montserrat", sans-serif', background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)' }}>
      {/* Header with colored background */}
      <header style={{ 
        background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary}, ${colorTheme.accent})`,
        color: 'white',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '2rem'
      }}>
        {/* Profile Image */}
        {personalInfo.profileImage && (
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid rgba(255,255,255,0.2)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 2
          }}>
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.fullName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        <div style={{ flex: 1 }}>
          {/* Círculos decorativos */}
          <div style={{ 
            position: 'absolute', 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.1)', 
            top: '-50px', 
            right: '-50px',
            zIndex: 1
          }}></div>
          <div style={{ 
            position: 'absolute', 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.1)', 
            bottom: '-30px', 
            left: '10%',
            zIndex: 1
          }}></div>
        
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', position: 'relative', zIndex: 2 }}>
            {personalInfo.fullName || 'Tu Nombre'}
          </h1>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '300', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
            {personalInfo.title || 'Tu Título Profesional'}
          </h2>
        
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '0.5rem' }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', position: 'relative', zIndex: 2 }}>
            {personalInfo.portfolio && (
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '0.5rem' }} />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
            
            {personalInfo.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faLink} style={{ marginRight: '0.5rem' }} />
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {professionalSummary && (
        <section style={{ 
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            fontSize: '1.3rem', 
            color: colorTheme.accent, 
            marginBottom: '1rem',
            position: 'relative',
            paddingBottom: '0.5rem'
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Sobre Mí</span>
            <span style={{ 
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              width: '50px', 
              height: '3px', 
              background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
              borderRadius: '10px' 
            }}></span>
          </h3>
          <p style={{ lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
            {professionalSummary}
          </p>
        </section>
      )}

      {/* Two-column layout for the main content */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Column */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colorTheme.accent, 
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Experiencia Profesional</span>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '50px', 
                  height: '3px', 
                  background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
                  borderRadius: '10px' 
                }}></span>
              </h3>
              
              {workExperience.map((exp, index) => (
                <div key={index} style={{ 
                  marginBottom: index < workExperience.length - 1 ? '2rem' : 0,
                  position: 'relative',
                  paddingLeft: '20px',
                }}>
                  {/* Timeline dot */}
                  <div style={{ 
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#f72585',
                    zIndex: 1
                  }}></div>
                  
                  {/* Timeline line */}
                  {index < workExperience.length - 1 && (
                    <div style={{ 
                      position: 'absolute',
                      left: '4px',
                      top: '16px',
                      width: '2px',
                      bottom: '-10px',
                      backgroundColor: '#e9ecef',
                      zIndex: 0
                    }}></div>
                  )}
                  
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '0.3rem' }}>
                    {exp.position}
                  </h4>
                  <p style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.9rem', 
                    color: '#777', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ fontWeight: '500' }}>{exp.company}</span>
                    <span style={{ fontStyle: 'italic' }}>{exp.startDate} - {exp.endDate}</span>
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
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
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colorTheme.accent, 
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Formación Académica</span>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '50px', 
                  height: '3px', 
                  background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
                  borderRadius: '10px' 
                }}></span>
              </h3>
              
              {education.map((edu, index) => (
                <div key={index} style={{ 
                  marginBottom: index < education.length - 1 ? '1.5rem' : 0,
                  position: 'relative',
                  paddingLeft: '20px'
                }}>
                  {/* Timeline dot */}
                  <div style={{ 
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#4cc9f0',
                    zIndex: 1
                  }}></div>
                  
                  {/* Timeline line */}
                  {index < education.length - 1 && (
                    <div style={{ 
                      position: 'absolute',
                      left: '4px',
                      top: '16px',
                      width: '2px',
                      bottom: '-10px',
                      backgroundColor: '#e9ecef',
                      zIndex: 0
                    }}></div>
                  )}
                  
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '0.3rem' }}>
                    {edu.degree}
                  </h4>
                  <p style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.9rem', 
                    color: '#777', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ fontWeight: '500' }}>{edu.institution}</span>
                    <span style={{ fontStyle: 'italic' }}>{edu.startDate} - {edu.endDate}</span>
                  </p>
                  {edu.description && (
                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colorTheme.accent, 
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Habilidades</span>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '50px', 
                  height: '3px', 
                  background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
                  borderRadius: '10px' 
                }}></span>
              </h3>
              
              {skills.map((skill, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: '500', color: '#333' }}>{skill.name}</span>
                    <div>
                      {renderSkillLevel(skill.level)}
                    </div>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    backgroundColor: '#e9ecef',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      height: '100%', 
                      background: 'linear-gradient(to right, #4cc9f0, #f72585)',
                      width: skill.level === 'Experto' ? '100%' : 
                             skill.level === 'Avanzado' ? '80%' : 
                             skill.level === 'Intermedio' ? '60%' : 
                             skill.level === 'Principiante' ? '40%' : '70%',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colorTheme.accent, 
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Idiomas</span>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '50px', 
                  height: '3px', 
                  background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
                  borderRadius: '10px' 
                }}></span>
              </h3>
              
              {languages.map((lang, index) => (
                <div key={index} style={{ 
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0.8rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                  border: '1px solid #e9ecef'
                }}>
                  <span style={{ fontWeight: '500', color: '#333' }}>{lang.name}</span>
                  <span style={{ 
                    backgroundColor: '#4361ee',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>{lang.level}</span>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ 
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colorTheme.accent, 
                marginBottom: '1.5rem',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Certificaciones</span>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '50px', 
                  height: '3px', 
                  background: `linear-gradient(to right, ${colorTheme.primary}, ${colorTheme.secondary})`, 
                  borderRadius: '10px' 
                }}></span>
              </h3>
              
              {certifications.map((cert, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '0 0 1rem 0', borderBottom: index < certifications.length - 1 ? '1px dashed #e9ecef' : 'none' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#333', marginBottom: '0.3rem' }}>
                    {cert.name}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: 0 }}>
                    <span>{cert.organization}</span>
                    {cert.year && <span> • {cert.year}</span>}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreativeTemplate 