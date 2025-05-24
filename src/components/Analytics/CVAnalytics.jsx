import { useState, useEffect } from 'react'
import { Card, Row, Col, ProgressBar, Badge, Alert, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartLine, 
  faCheckCircle, 
  faExclamationTriangle, 
  faLightbulb,
  faStar,
  faEye,
  faDownload,
  faPercent
} from '@fortawesome/free-solid-svg-icons'

const CVAnalytics = ({ resumeData, onSuggestionApply }) => {
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    if (resumeData) {
      setAnalysis(analyzeResume(resumeData))
    }
  }, [resumeData])

  const analyzeResume = (data) => {
    const scores = {
      completeness: calculateCompleteness(data),
      contentQuality: calculateContentQuality(data),
      structure: calculateStructure(data),
      keywords: calculateKeywords(data)
    }

    const overall = Math.round((scores.completeness + scores.contentQuality + scores.structure + scores.keywords) / 4)

    return {
      overall,
      scores,
      suggestions: generateSuggestions(data, scores),
      strengths: identifyStrengths(data, scores),
      metrics: calculateMetrics(data)
    }
  }

  const calculateCompleteness = (data) => {
    let score = 0
    const maxScore = 100

    // Información personal (30 puntos)
    if (data.personalInfo?.fullName) score += 10
    if (data.personalInfo?.email) score += 10
    if (data.personalInfo?.phone) score += 5
    if (data.personalInfo?.profileImage) score += 5

    // Resumen profesional (20 puntos)
    if (data.professionalSummary && data.professionalSummary.length > 50) score += 20

    // Experiencia laboral (25 puntos)
    if (data.workExperience?.length >= 2) score += 25
    else if (data.workExperience?.length >= 1) score += 15

    // Educación (15 puntos)
    if (data.education?.length >= 1) score += 15

    // Habilidades (10 puntos)
    if (data.skills?.length >= 5) score += 10
    else if (data.skills?.length >= 3) score += 5

    return Math.min(score, maxScore)
  }

  const calculateContentQuality = (data) => {
    let score = 0

    // Longitud del resumen profesional
    if (data.professionalSummary) {
      const length = data.professionalSummary.length
      if (length >= 100 && length <= 300) score += 25
      else if (length >= 50) score += 15
    }

    // Calidad de la experiencia laboral
    data.workExperience?.forEach(exp => {
      if (exp.description && exp.description.length > 100) score += 15
      if (exp.achievements && exp.achievements.length > 0) score += 10
    })

    // Diversidad de habilidades
    if (data.skills?.length >= 8) score += 20
    else if (data.skills?.length >= 5) score += 15

    // Certificaciones
    if (data.certifications?.length >= 2) score += 15
    else if (data.certifications?.length >= 1) score += 10

    return Math.min(score, 100)
  }

  const calculateStructure = (data) => {
    let score = 0

    // Orden lógico de secciones
    score += 20

    // Consistencia en fechas
    let dateConsistency = true
    data.workExperience?.forEach(exp => {
      if (!exp.startDate || (!exp.current && !exp.endDate)) {
        dateConsistency = false
      }
    })
    if (dateConsistency) score += 25

    // Información de contacto completa
    if (data.personalInfo?.email && data.personalInfo?.phone) score += 20

    // Secciones balanceadas
    const sectionCount = [
      data.workExperience?.length || 0,
      data.education?.length || 0,
      data.skills?.length || 0,
      data.certifications?.length || 0
    ].filter(count => count > 0).length

    if (sectionCount >= 4) score += 35
    else if (sectionCount >= 3) score += 25
    else if (sectionCount >= 2) score += 15

    return Math.min(score, 100)
  }

  const calculateKeywords = (data) => {
    // Simulación simple de análisis de palabras clave
    const professionalKeywords = [
      'liderazgo', 'gestión', 'innovación', 'resultados', 'equipo',
      'proyecto', 'estrategia', 'análisis', 'desarrollo', 'mejora'
    ]

    let score = 0
    const text = `${data.professionalSummary} ${data.workExperience?.map(exp => exp.description).join(' ')}`.toLowerCase()

    professionalKeywords.forEach(keyword => {
      if (text.includes(keyword)) score += 10
    })

    return Math.min(score, 100)
  }

  const generateSuggestions = (data, scores) => {
    const suggestions = []

    if (scores.completeness < 80) {
      suggestions.push({
        type: 'warning',
        title: 'Información incompleta',
        description: 'Completa todas las secciones para mejorar tu perfil',
        action: 'complete_info'
      })
    }

    if (!data.personalInfo?.profileImage) {
      suggestions.push({
        type: 'info',
        title: 'Añade una foto profesional',
        description: 'Las fotos de perfil aumentan las posibilidades de ser contactado',
        action: 'add_photo'
      })
    }

    if (!data.professionalSummary || data.professionalSummary.length < 100) {
      suggestions.push({
        type: 'warning',
        title: 'Mejora tu resumen profesional',
        description: 'Un resumen de 100-300 palabras es ideal para captar atención',
        action: 'improve_summary'
      })
    }

    if (data.skills?.length < 8) {
      suggestions.push({
        type: 'info',
        title: 'Añade más habilidades',
        description: 'Incluye al menos 8-10 habilidades relevantes',
        action: 'add_skills'
      })
    }

    return suggestions
  }

  const identifyStrengths = (data, scores) => {
    const strengths = []

    if (scores.completeness >= 90) {
      strengths.push('Perfil muy completo')
    }

    if (data.workExperience?.length >= 3) {
      strengths.push('Amplia experiencia laboral')
    }

    if (data.certifications?.length >= 2) {
      strengths.push('Buenas certificaciones')
    }

    if (data.professionalSummary?.length >= 150) {
      strengths.push('Resumen profesional detallado')
    }

    return strengths
  }

  const calculateMetrics = (data) => {
    return {
      wordCount: (data.professionalSummary || '').split(' ').length,
      sectionsCompleted: [
        data.personalInfo?.fullName,
        data.professionalSummary,
        data.workExperience?.length > 0,
        data.education?.length > 0,
        data.skills?.length > 0
      ].filter(Boolean).length,
      totalSections: 5,
      experienceYears: calculateExperienceYears(data.workExperience || []),
      skillsCount: data.skills?.length || 0
    }
  }

  const calculateExperienceYears = (workExperience) => {
    if (!workExperience.length) return 0
    
    let totalMonths = 0
    workExperience.forEach(exp => {
      const start = new Date(exp.startDate)
      const end = exp.current ? new Date() : new Date(exp.endDate)
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += months
    })

    return Math.round(totalMonths / 12 * 10) / 10
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'danger'
  }

  const getOverallGrade = (score) => {
    if (score >= 90) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B+'
    if (score >= 60) return 'B'
    if (score >= 50) return 'C'
    return 'D'
  }

  if (!analysis) return null

  return (
    <div className="cv-analytics">
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            Análisis de tu CV
          </h5>
        </Card.Header>
        <Card.Body>
          {/* Puntuación general */}
          <div className="text-center mb-4">
            <div className="display-1 fw-bold text-primary">{analysis.overall}</div>
            <div className="h4 text-muted">
              Puntuación general: <Badge bg={getScoreColor(analysis.overall)}>{getOverallGrade(analysis.overall)}</Badge>
            </div>
            <ProgressBar 
              variant={getScoreColor(analysis.overall)} 
              now={analysis.overall} 
              className="mb-3"
              style={{ height: '10px' }}
            />
          </div>

          {/* Métricas específicas */}
          <Row className="mb-4">
            <Col md={3} className="text-center">
              <div className="h5 text-primary">{analysis.scores.completeness}%</div>
              <div className="small text-muted">Completitud</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="h5 text-success">{analysis.scores.contentQuality}%</div>
              <div className="small text-muted">Calidad</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="h5 text-info">{analysis.scores.structure}%</div>
              <div className="small text-muted">Estructura</div>
            </Col>
            <Col md={3} className="text-center">
              <div className="h5 text-warning">{analysis.scores.keywords}%</div>
              <div className="small text-muted">Palabras clave</div>
            </Col>
          </Row>

          {/* Estadísticas */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-3">
                  <h6>Estadísticas</h6>
                  <ul className="list-unstyled mb-0">
                    <li>📝 {analysis.metrics.wordCount} palabras en resumen</li>
                    <li>📊 {analysis.metrics.sectionsCompleted}/{analysis.metrics.totalSections} secciones completadas</li>
                    <li>💼 {analysis.metrics.experienceYears} años de experiencia</li>
                    <li>🛠️ {analysis.metrics.skillsCount} habilidades listadas</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-3">
                  <h6>Fortalezas</h6>
                  {analysis.strengths.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index}>
                          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">Completa más secciones para identificar fortalezas</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Sugerencias */}
          {analysis.suggestions.length > 0 && (
            <div>
              <h6>
                <FontAwesomeIcon icon={faLightbulb} className="me-2 text-warning" />
                Sugerencias de mejora
              </h6>
              {analysis.suggestions.map((suggestion, index) => (
                <Alert 
                  key={index} 
                  variant={suggestion.type === 'warning' ? 'warning' : 'info'}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{suggestion.title}</strong>
                    <br />
                    <small>{suggestion.description}</small>
                  </div>
                  <Button 
                    variant={suggestion.type === 'warning' ? 'outline-warning' : 'outline-info'}
                    size="sm"
                    onClick={() => onSuggestionApply(suggestion.action)}
                  >
                    Aplicar
                  </Button>
                </Alert>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default CVAnalytics 