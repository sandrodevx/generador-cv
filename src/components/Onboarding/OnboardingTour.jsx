import { useState, useEffect } from 'react'
import { Modal, Button, Carousel, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowRight, 
  faArrowLeft, 
  faUser, 
  faBriefcase, 
  faEye, 
  faDownload,
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons'

const OnboardingTour = ({ show, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '¡Bienvenido al Generador de CV!',
      description: 'Te ayudaremos a crear un currículum profesional en minutos.',
      icon: faCheckCircle,
      content: 'Con nuestro generador podrás crear CVs impresionantes con múltiples plantillas y exportarlos en PDF.'
    },
    {
      title: 'Completa tu Información',
      description: 'Llena cada sección paso a paso',
      icon: faUser,
      content: 'Comienza con tu información personal, luego agrega tu experiencia laboral, educación y habilidades.'
    },
    {
      title: 'Elige una Plantilla',
      description: 'Selecciona el diseño que mejor se adapte a tu perfil',
      icon: faBriefcase,
      content: 'Tenemos plantillas modernas, profesionales, creativas y ejecutivas. ¡Puedes cambiar entre ellas en cualquier momento!'
    },
    {
      title: 'Vista Previa en Tiempo Real',
      description: 'Ve cómo se ve tu CV mientras lo editas',
      icon: faEye,
      content: 'Nuestra vista previa te permite ver exactamente cómo se verá tu CV antes de descargarlo.'
    },
    {
      title: 'Descarga y Comparte',
      description: 'Exporta tu CV en PDF de alta calidad',
      icon: faDownload,
      content: 'Cuando estés satisfecho, descarga tu CV en formato PDF listo para enviar a empleadores.'
    }
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true')
    onComplete()
  }

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true')
    onComplete()
  }

  return (
    <Modal show={show} onHide={handleSkip} size="lg" centered>
      <Modal.Body className="p-0">
        <Card className="border-0">
          <Card.Body className="text-center p-5">
            <div className="mb-4">
              <FontAwesomeIcon 
                icon={steps[activeStep].icon} 
                size="3x" 
                className="text-primary mb-3"
              />
              <h3 className="mb-3">{steps[activeStep].title}</h3>
              <p className="lead text-muted mb-4">
                {steps[activeStep].description}
              </p>
              <p className="text-muted">
                {steps[activeStep].content}
              </p>
            </div>

            {/* Indicadores de progreso */}
            <div className="d-flex justify-content-center mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`mx-1 rounded-circle ${
                    index === activeStep ? 'bg-primary' : 'bg-light'
                  }`}
                  style={{ width: '10px', height: '10px' }}
                />
              ))}
            </div>

            {/* Controles de navegación */}
            <div className="d-flex justify-content-between align-items-center">
              <Button 
                variant="outline-secondary" 
                onClick={handleSkip}
              >
                Saltar tutorial
              </Button>

              <div>
                <span className="text-muted me-3">
                  {activeStep + 1} de {steps.length}
                </span>
                
                {activeStep > 0 && (
                  <Button 
                    variant="outline-primary" 
                    onClick={handlePrev}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                    Anterior
                  </Button>
                )}

                <Button 
                  variant="primary" 
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                      ¡Empezar!
                    </>
                  ) : (
                    <>
                      Siguiente
                      <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}

export default OnboardingTour 