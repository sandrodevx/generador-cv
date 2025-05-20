import { Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from './ColorPicker'

const templates = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y profesional con un toque moderno',
    imageClass: 'bg-primary'
  },
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Diseño clásico y elegante para ambientes corporativos',
    imageClass: 'bg-secondary'
  },
  {
    id: 'creative',
    name: 'Creativo',
    description: 'Diseño dinámico para profesionales creativos',
    imageClass: 'bg-info'
  },
  {
    id: 'executive',
    name: 'Ejecutivo',
    description: 'Diseño sofisticado para perfiles de alto nivel',
    imageClass: 'bg-dark'
  }
]

const TemplateSelector = ({ activeTemplate, setActiveTemplate, colorTheme, onColorChange }) => {
  return (
    <>
      <Row className="mb-4">
        {templates.map((template) => (
          <Col md={6} key={template.id} className="mb-4">
            <Card 
              className={`template-selector h-100 ${activeTemplate === template.id ? 'active' : ''}`}
              onClick={() => setActiveTemplate(template.id)}
            >
              <div 
                className={`template-preview`} 
                style={{ 
                  height: '160px', 
                  position: 'relative', 
                  backgroundColor: colorTheme.primary
                }}
              >
                {activeTemplate === template.id && (
                  <div className="selected-badge">
                    <FontAwesomeIcon icon={faCheck} className="text-white" />
                  </div>
                )}
                <div className="template-preview-content">
                  {/* Contenido representativo de la plantilla */}
                  <div className="template-header" style={{ height: '30px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '10px', borderRadius: '4px' }}></div>
                  <div className="template-body d-flex" style={{ padding: '10px' }}>
                    <div className="template-sidebar" style={{ width: '30%', paddingRight: '10px' }}>
                      <div style={{ height: '20px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '20px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '20px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
                    </div>
                    <div className="template-main" style={{ width: '70%' }}>
                      <div style={{ height: '15px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '15px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '10px', borderRadius: '2px' }}></div>
                      <div style={{ height: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <Card.Body>
                <Card.Title>{template.name}</Card.Title>
                <Card.Text className="text-muted small">{template.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Personalización de Colores</Card.Title>
          <Card.Text className="text-muted mb-3">
            Selecciona o personaliza los colores para tu currículum
          </Card.Text>
          <ColorPicker colorTheme={colorTheme} onColorChange={onColorChange} />
        </Card.Body>
      </Card>
    </>
  )
}

export default TemplateSelector 