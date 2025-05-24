import { useState } from 'react'
import { Row, Col, Form, Card, Tab, Nav, Button, Image, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faBriefcase, 
  faGraduationCap, 
  faTools, 
  faLanguage, 
  faCertificate, 
  faPalette, 
  faCamera, 
  faTrashAlt, 
  faSliders,
  faRobot
} from '@fortawesome/free-solid-svg-icons'
import TemplateSelector from './TemplateSelector'
import AdvancedCustomization from './AdvancedCustomization'
import AIAssistant from '../AI/AIAssistant'
import { validatePersonalInfo, getErrorMessage } from '../../utils/validation'
import toast from 'react-hot-toast'

// Obtener el tamaño máximo de archivo desde variables de entorno
const MAX_UPLOAD_SIZE = parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '1048576')

const ResumeForm = ({ resumeData, onUpdate, activeTemplate, setActiveTemplate, colorTheme, onColorChange }) => {
  const [key, setKey] = useState('personal')
  const [imageError, setImageError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [showAI, setShowAI] = useState(false)
  const [aiSection, setAISection] = useState('')
  const [customization, setCustomization] = useState({
    mainFont: 'Roboto',
    headingFont: 'Montserrat',
    sectionSpacing: 2.5,
    headingWeight: '600'
  })

  const handleInputChange = (section, field, value) => {
    const newData = { ...resumeData }
    if (section === 'personalInfo') {
      newData.personalInfo = { ...newData.personalInfo, [field]: value }
      
      // Validar información personal en tiempo real
      const errors = validatePersonalInfo(newData.personalInfo)
      setValidationErrors(prev => ({ ...prev, personalInfo: errors }))
    } else {
      newData[section] = value
    }
    onUpdate(newData)
  }

  const handleArrayItemChange = (section, index, field, value) => {
    const newData = { ...resumeData }
    newData[section] = [...newData[section]]
    newData[section][index] = { ...newData[section][index], [field]: value }
    onUpdate(newData)
  }

  const addItem = (section, defaultItem) => {
    const newData = { ...resumeData }
    newData[section] = [...(newData[section] || []), defaultItem]
    onUpdate(newData)
  }

  const removeItem = (section, index) => {
    const newData = { ...resumeData }
    newData[section] = newData[section].filter((_, i) => i !== index)
    onUpdate(newData)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño del archivo
      if (file.size > MAX_UPLOAD_SIZE) {
        setImageError(`El archivo es demasiado grande. El tamaño máximo es ${MAX_UPLOAD_SIZE / 1024 / 1024} MB.`);
        return;
      }
      
      setImageError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...resumeData };
        newData.personalInfo.profileImage = reader.result;
        onUpdate(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    const newData = { ...resumeData };
    newData.personalInfo.profileImage = null;
    onUpdate(newData);
  };

  const handleCustomizationChange = (newCustomization) => {
    setCustomization(newCustomization);
    // Apply customization changes to the document
    document.documentElement.style.setProperty('--main-font', newCustomization.mainFont);
    document.documentElement.style.setProperty('--heading-font', newCustomization.headingFont);
    document.documentElement.style.setProperty('--section-spacing', `${newCustomization.sectionSpacing}rem`);
    document.documentElement.style.setProperty('--heading-weight', newCustomization.headingWeight);
  };

  // Funciones del Asistente de IA
  const openAI = (section) => {
    setAISection(section)
    setShowAI(true)
  }

  const handleAIContent = (content) => {
    if (aiSection === 'summary') {
      handleInputChange('professionalSummary', '', content)
      toast.success('Resumen profesional generado con IA')
    } else if (aiSection === 'experience') {
      // Añadir o actualizar la descripción de la experiencia actual
      const newData = { ...resumeData }
      if (newData.workExperience.length === 0) {
        newData.workExperience.push({ 
          company: '', 
          position: '', 
          startDate: '', 
          endDate: '', 
          description: content 
        })
      } else {
        const lastIndex = newData.workExperience.length - 1
        newData.workExperience[lastIndex].description = content
      }
      onUpdate(newData)
      toast.success('Descripción de experiencia generada con IA')
    } else if (aiSection === 'skills') {
      // Convertir el contenido en array de habilidades
      const skillsArray = content.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      handleInputChange('skills', '', skillsArray)
      toast.success('Habilidades generadas con IA')
    }
  }

  return (
    <>
      <Card className="shadow-sm form-section">
        <Card.Body>
          <Tab.Container id="form-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Row>
              <Col md={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="personal">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Información Personal
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="experience">
                      <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                      Experiencia Laboral
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="education">
                      <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                      Educación
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="skills">
                      <FontAwesomeIcon icon={faTools} className="me-2" />
                      Habilidades
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="languages">
                      <FontAwesomeIcon icon={faLanguage} className="me-2" />
                      Idiomas
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="certifications">
                      <FontAwesomeIcon icon={faCertificate} className="me-2" />
                      Certificaciones
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="templates">
                      <FontAwesomeIcon icon={faPalette} className="me-2" />
                      Plantillas
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="advanced">
                      <FontAwesomeIcon icon={faSliders} className="me-2" />
                      Personalización Avanzada
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="personal">
                    <h4 className="section-header">Información Personal</h4>
                    
                    <div className="mb-4 text-center">
                      <div className="profile-image-container mb-3">
                        {resumeData.personalInfo.profileImage ? (
                          <div className="position-relative d-inline-block">
                            <Image 
                              src={resumeData.personalInfo.profileImage} 
                              roundedCircle 
                              className="profile-image-preview"
                            />
                            <Button 
                              variant="danger" 
                              size="sm" 
                              className="position-absolute remove-image-btn"
                              onClick={removeProfileImage}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </div>
                        ) : (
                          <div className="profile-image-placeholder">
                            <FontAwesomeIcon icon={faUser} className="placeholder-icon" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Form.Label htmlFor="profile-image-upload" className="btn btn-outline-primary">
                          <FontAwesomeIcon icon={faCamera} className="me-2" />
                          {resumeData.personalInfo.profileImage ? 'Cambiar foto' : 'Añadir foto de perfil'}
                        </Form.Label>
                        <Form.Control 
                          type="file" 
                          id="profile-image-upload" 
                          className="d-none"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <p className="text-muted small mt-2">Recomendado: formato cuadrado, máx {MAX_UPLOAD_SIZE / 1024 / 1024} MB</p>
                        
                        {imageError && (
                          <Alert variant="danger" className="mt-2 small">
                            {imageError}
                          </Alert>
                        )}
                      </div>
                    </div>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre Completo</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Ej. María Rodríguez" 
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Título Profesional</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Ej. Desarrollador Full Stack"
                            value={resumeData.personalInfo.title}
                            onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control 
                            type="email" 
                            placeholder="Ej. maria@email.com" 
                            value={resumeData.personalInfo.email}
                            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Teléfono</Form.Label>
                          <Form.Control 
                            type="tel" 
                            placeholder="Ej. +34 600 123 456" 
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Ubicación</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Ej. Madrid, España" 
                            value={resumeData.personalInfo.location}
                            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>LinkedIn</Form.Label>
                          <Form.Control 
                            type="url" 
                            placeholder="Ej. linkedin.com/in/username" 
                            value={resumeData.personalInfo.linkedIn}
                            onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Sitio Web / Portfolio</Form.Label>
                          <Form.Control 
                            type="url" 
                            placeholder="Ej. miportfolio.com" 
                            value={resumeData.personalInfo.portfolio}
                            onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label>Resumen Profesional</Form.Label>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => openAI('summary')}
                            >
                              <FontAwesomeIcon icon={faRobot} className="me-1" />
                              IA Assistant
                            </Button>
                          </div>
                          <Form.Control 
                            as="textarea" 
                            rows={4}
                            placeholder="Breve descripción de tus habilidades y experiencia"
                            value={resumeData.professionalSummary}
                            onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
                            isInvalid={validationErrors.personalInfo?.summary}
                          />
                          {validationErrors.personalInfo?.summary && (
                            <Form.Control.Feedback type="invalid">
                              {validationErrors.personalInfo.summary}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="experience">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="section-header mb-0">Experiencia Laboral</h4>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => openAI('experience')}
                      >
                        <FontAwesomeIcon icon={faRobot} className="me-1" />
                        IA Assistant
                      </Button>
                    </div>
                    {resumeData.workExperience.map((job, index) => (
                      <div key={index} className="mb-4 pb-4 border-bottom">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Experiencia #{index + 1}</h5>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeItem('workExperience', index)}
                          >
                            Eliminar
                          </Button>
                        </div>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Empresa</Form.Label>
                              <Form.Control 
                                type="text"
                                value={job.company}
                                onChange={(e) => handleArrayItemChange('workExperience', index, 'company', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Puesto</Form.Label>
                              <Form.Control 
                                type="text"
                                value={job.position}
                                onChange={(e) => handleArrayItemChange('workExperience', index, 'position', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Fecha de Inicio</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. Enero 2020"
                                value={job.startDate}
                                onChange={(e) => handleArrayItemChange('workExperience', index, 'startDate', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Fecha de Finalización</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. Actual o Diciembre 2022"
                                value={job.endDate}
                                onChange={(e) => handleArrayItemChange('workExperience', index, 'endDate', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Descripción</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={job.description}
                            onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                      onClick={() => addItem('workExperience', { company: '', position: '', startDate: '', endDate: '', description: '' })}
                    >
                      + Añadir Experiencia
                    </Button>
                  </Tab.Pane>

                  <Tab.Pane eventKey="education">
                    <h4 className="section-header">Educación</h4>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="mb-4 pb-4 border-bottom">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Educación #{index + 1}</h5>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeItem('education', index)}
                          >
                            Eliminar
                          </Button>
                        </div>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Institución</Form.Label>
                              <Form.Control 
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Título</Form.Label>
                              <Form.Control 
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Fecha de Inicio</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. Septiembre 2016"
                                value={edu.startDate}
                                onChange={(e) => handleArrayItemChange('education', index, 'startDate', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Fecha de Finalización</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. Julio 2020"
                                value={edu.endDate}
                                onChange={(e) => handleArrayItemChange('education', index, 'endDate', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Descripción</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={2}
                            value={edu.description}
                            onChange={(e) => handleArrayItemChange('education', index, 'description', e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                      onClick={() => addItem('education', { institution: '', degree: '', startDate: '', endDate: '', description: '' })}
                    >
                      + Añadir Educación
                    </Button>
                  </Tab.Pane>

                  <Tab.Pane eventKey="skills">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="section-header mb-0">Habilidades</h4>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => openAI('skills')}
                      >
                        <FontAwesomeIcon icon={faRobot} className="me-1" />
                        IA Assistant
                      </Button>
                    </div>
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="mb-3 d-flex align-items-center">
                        <Form.Group className="flex-grow-1 me-2">
                          <Form.Label className="visually-hidden">Habilidad {index + 1}</Form.Label>
                          <Form.Control 
                            type="text"
                            placeholder="Ej. Desarrollo Web"
                            value={skill.name}
                            onChange={(e) => handleArrayItemChange('skills', index, 'name', e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="w-25 me-2">
                          <Form.Label className="visually-hidden">Nivel</Form.Label>
                          <Form.Select
                            value={skill.level}
                            onChange={(e) => handleArrayItemChange('skills', index, 'level', e.target.value)}
                          >
                            <option value="">Nivel</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                            <option value="Experto">Experto</option>
                          </Form.Select>
                        </Form.Group>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeItem('skills', index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline-primary" 
                      className="w-100 mt-3"
                      onClick={() => addItem('skills', { name: '', level: '' })}
                    >
                      + Añadir Habilidad
                    </Button>
                  </Tab.Pane>

                  <Tab.Pane eventKey="languages">
                    <h4 className="section-header">Idiomas</h4>
                    {resumeData.languages.map((language, index) => (
                      <div key={index} className="mb-3 d-flex align-items-center">
                        <Form.Group className="flex-grow-1 me-2">
                          <Form.Label className="visually-hidden">Idioma {index + 1}</Form.Label>
                          <Form.Control 
                            type="text"
                            placeholder="Ej. Inglés"
                            value={language.name}
                            onChange={(e) => handleArrayItemChange('languages', index, 'name', e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="w-25 me-2">
                          <Form.Label className="visually-hidden">Nivel</Form.Label>
                          <Form.Select
                            value={language.level}
                            onChange={(e) => handleArrayItemChange('languages', index, 'level', e.target.value)}
                          >
                            <option value="">Nivel</option>
                            <option value="A1">A1 (Básico)</option>
                            <option value="A2">A2 (Elemental)</option>
                            <option value="B1">B1 (Intermedio)</option>
                            <option value="B2">B2 (Intermedio alto)</option>
                            <option value="C1">C1 (Avanzado)</option>
                            <option value="C2">C2 (Maestría)</option>
                            <option value="Nativo">Nativo</option>
                          </Form.Select>
                        </Form.Group>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeItem('languages', index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline-primary" 
                      className="w-100 mt-3"
                      onClick={() => addItem('languages', { name: '', level: '' })}
                    >
                      + Añadir Idioma
                    </Button>
                  </Tab.Pane>

                  <Tab.Pane eventKey="certifications">
                    <h4 className="section-header">Certificaciones</h4>
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="mb-4 pb-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Certificación #{index + 1}</h5>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeItem('certifications', index)}
                          >
                            Eliminar
                          </Button>
                        </div>
                        <Row>
                          <Col md={8}>
                            <Form.Group className="mb-3">
                              <Form.Label>Nombre</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. Certificado Profesional de Desarrollo Web"
                                value={cert.name}
                                onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Año</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Ej. 2022"
                                value={cert.year}
                                onChange={(e) => handleArrayItemChange('certifications', index, 'year', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Organización</Form.Label>
                          <Form.Control 
                            type="text"
                            placeholder="Ej. Google"
                            value={cert.organization}
                            onChange={(e) => handleArrayItemChange('certifications', index, 'organization', e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                      onClick={() => addItem('certifications', { name: '', organization: '', year: '' })}
                    >
                      + Añadir Certificación
                    </Button>
                  </Tab.Pane>

                  <Tab.Pane eventKey="templates">
                    <h4 className="section-header">Seleccionar Plantilla</h4>
                    <TemplateSelector
                      activeTemplate={activeTemplate}
                      setActiveTemplate={setActiveTemplate}
                      colorTheme={colorTheme}
                      onColorChange={onColorChange}
                      customization={customization}
                      onCustomizationChange={handleCustomizationChange}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="advanced">
                    <h4 className="section-header">Personalización Avanzada</h4>
                    <AdvancedCustomization
                      customization={customization}
                      onUpdate={handleCustomizationChange}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
      
      {/* Asistente de IA */}
      <AIAssistant
        show={showAI}
        onHide={() => setShowAI(false)}
        onContentGenerated={handleAIContent}
        section={aiSection}
      />
    </>
  )
}

export default ResumeForm 