import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import { useTheme } from '../../theme/ThemeContext';

const PremiumTemplate = ({ resumeData, colorTheme }) => {
  const { isDarkMode } = useTheme();
  const { 
    personalInfo, 
    professionalSummary, 
    workExperience, 
    education, 
    skills,
    languages,
    certifications
  } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const generateQRCode = () => {
    if (!personalInfo.portfolio && !personalInfo.linkedIn) return '';
    
    const qrData = personalInfo.portfolio || personalInfo.linkedIn;
    return qrData;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="premium-resume"
      style={{
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333',
        fontFamily: 'var(--main-font)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: isDarkMode ? '0 0 30px rgba(0,0,0,0.3)' : '0 0 30px rgba(0,0,0,0.1)'
      }}
    >
      {/* Header Section */}
      <motion.header
        variants={itemVariants}
        style={{
          background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
          padding: '3rem',
          borderRadius: '0.5rem',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Elements */}
        <div className="geometric-shapes">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                delay: i * 2
              }}
              style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '20%',
                background: `rgba(255,255,255,${0.1 - i * 0.02})`,
                transform: `rotate(${i * 45}deg)`,
                top: `${i * 10}%`,
                right: `${i * 5}%`
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
          {/* Profile Image */}
          {personalInfo.profileImage && (
            <motion.div
              variants={itemVariants}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                flexShrink: 0
              }}
            >
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          )}

          <div>
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}
            >
              {personalInfo.fullName || 'Tu Nombre'}
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              style={{
                fontSize: '1.75rem',
                fontWeight: 300,
                opacity: 0.9
              }}
            >
              {personalInfo.title || 'Tu Título Profesional'}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '2rem',
                flexWrap: 'wrap'
              }}
            >
              {personalInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon={faPhone} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* QR Code */}
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <motion.div
            variants={itemVariants}
            style={{
              position: 'absolute',
              right: '2rem',
              top: '2rem',
              background: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem'
            }}
          >
            <QRCode value={generateQRCode()} size={80} />
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}
      >
        {/* Left Column */}
        <motion.div variants={containerVariants}>
          {/* Professional Summary */}
          {professionalSummary && (
            <motion.section
              variants={itemVariants}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{
                color: colorTheme.primary,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Perfil Profesional
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                {professionalSummary}
              </p>
            </motion.section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <motion.section
              variants={itemVariants}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{
                color: colorTheme.primary,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Experiencia Profesional
              </h3>
              {workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    marginBottom: index < workExperience.length - 1 ? '2rem' : 0,
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    borderLeft: `2px solid ${colorTheme.primary}`
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '-5px',
                    top: '0',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colorTheme.primary
                  }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{exp.position}</h4>
                  <p style={{ color: colorTheme.accent }}>{exp.company}</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>{exp.description}</p>
                </motion.div>
              ))}
            </motion.section>
          )}
        </motion.div>

        {/* Right Column */}
        <motion.div variants={containerVariants}>
          {/* Education */}
          {education.length > 0 && (
            <motion.section
              variants={itemVariants}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{
                color: colorTheme.primary,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Educación
              </h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    marginBottom: index < education.length - 1 ? '2rem' : 0
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{edu.degree}</h4>
                  <p style={{ color: colorTheme.accent }}>{edu.institution}</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.description && (
                    <p style={{ marginTop: '0.5rem' }}>{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </motion.section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <motion.section
              variants={itemVariants}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{
                color: colorTheme.primary,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Habilidades
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    style={{
                      background: colorTheme.primary,
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    {skill.name} {skill.level && `- ${skill.level}`}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <motion.section
              variants={itemVariants}
              style={{
                background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{
                color: colorTheme.primary,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Idiomas
              </h3>
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: index < languages.length - 1 ? '1rem' : 0
                  }}
                >
                  <span>{lang.name}</span>
                  <span style={{
                    background: colorTheme.secondary,
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem'
                  }}>
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </motion.section>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumTemplate; 