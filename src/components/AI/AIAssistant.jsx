import { useState } from 'react'
import { Modal, Button, Form, Alert, Spinner, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faBrain, faLightbulb, faMagic } from '@fortawesome/free-solid-svg-icons'

const AIAssistant = ({ show, onHide, onContentGenerated, section }) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')

  const generateContent = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError('')

    try {
      // Simulación de llamada a API de IA (reemplazar con API real)
      const response = await simulateAIGeneration(prompt, section)
      setGeneratedContent(response)
    } catch (err) {
      setError('Error al generar contenido. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const simulateAIGeneration = async (userPrompt, sectionType) => {
    // Simulación de respuesta de IA (reemplazar con OpenAI API real)
    await new Promise(resolve => setTimeout(resolve, 2000))

    const responses = {
      summary: `Profesional dinámico con más de 5 años de experiencia en ${userPrompt}. 
        Demostrada capacidad para liderar equipos, gestionar proyectos complejos y 
        entregar resultados excepcionales. Apasionado por la innovación y el crecimiento continuo.`,
      
      experience: `• Lideré iniciativas estratégicas en ${userPrompt} que resultaron en un aumento del 25% en la eficiencia
        • Desarrollé e implementé procesos optimizados que redujeron costos operativos en un 15%
        • Colaboré con equipos multifuncionales para entregar proyectos críticos en tiempo y forma
        • Mentoré a 5+ junior developers, mejorando su productividad y satisfacción laboral`,
      
      skills: `Análisis de datos, Gestión de proyectos, ${userPrompt}, Liderazgo de equipos, 
        Resolución de problemas, Comunicación efectiva, Pensamiento estratégico`,
      
      default: `Contenido optimizado para ${sectionType}: ${userPrompt}. 
        Este contenido ha sido generado para destacar tus fortalezas y experiencia.`
    }

    return responses[sectionType] || responses.default
  }

  const handleUseContent = () => {
    onContentGenerated(generatedContent)
    setGeneratedContent('')
    setPrompt('')
    onHide()
  }

  const getSectionPrompts = (sectionType) => {
    const prompts = {
      summary: [
        'Desarrollador Frontend especializado en React',
        'Marketing Digital con experiencia en redes sociales',
        'Analista de datos con Python y SQL',
        'Diseñador UX/UI con enfoque en mobile'
      ],
      experience: [
        'Mejoré la performance del sitio web',
        'Implementé sistema de gestión de inventario',
        'Lideré campaña de marketing que aumentó ventas',
        'Desarrollé aplicación móvil desde cero'
      ],
      skills: [
        'JavaScript, React, Node.js',
        'Python, Machine Learning, Data Science',
        'Adobe Creative Suite, Figma, Sketch',
        'SQL, Excel, Tableau, Power BI'
      ]
    }
    return prompts[sectionType] || []
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faRobot} className="me-2 text-primary" />
          Asistente de IA
          <Badge bg="secondary" className="ms-2">Beta</Badge>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <FontAwesomeIcon icon={faBrain} className="me-2 text-info" />
            <h6 className="mb-0">Generador de contenido inteligente</h6>
          </div>
          <p className="text-muted small">
            Describe tu experiencia, habilidades o logros y nuestra IA te ayudará 
            a crear contenido profesional y atractivo para tu CV.
          </p>
        </div>

        {getSectionPrompts(section).length > 0 && (
          <div className="mb-4">
            <label className="form-label">
              <FontAwesomeIcon icon={faLightbulb} className="me-2 text-warning" />
              Ejemplos de prompts:
            </label>
            <div className="d-flex flex-wrap gap-2">
              {getSectionPrompts(section).map((example, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Describe tu experiencia o habilidades:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Desarrollé una aplicación web que aumentó la productividad del equipo en un 30%..."
          />
        </Form.Group>

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}

        {generatedContent && (
          <div className="mb-3">
            <label className="form-label fw-bold">Contenido generado:</label>
            <div className="border rounded p-3 bg-light">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {generatedContent}
              </pre>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancelar
        </Button>
        
        {!generatedContent ? (
          <Button 
            variant="primary" 
            onClick={generateContent}
            disabled={!prompt.trim() || loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMagic} className="me-2" />
                Generar contenido
              </>
            )}
          </Button>
        ) : (
          <>
            <Button variant="outline-primary" onClick={generateContent}>
              Regenerar
            </Button>
            <Button variant="success" onClick={handleUseContent}>
              Usar este contenido
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default AIAssistant 