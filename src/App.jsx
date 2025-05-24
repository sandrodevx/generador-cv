import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Tab, Nav } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFileDownload, 
  faEye, 
  faArrowLeft, 
  faPrint, 
  faFilePdf, 
  faMoon, 
  faSun,
  faChartLine,
  faSignInAlt,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import toast, { Toaster } from 'react-hot-toast'

// Importar nuestros nuevos componentes
import { ThemeProvider, useTheme } from './theme/ThemeContext'
import ResumeForm from './components/form/ResumeForm'
import ResumePreview from './components/cv-templates/ResumePreview'
import OnboardingTour from './components/Onboarding/OnboardingTour'
import CVAnalytics from './components/Analytics/CVAnalytics'
import { signInWithGoogle, signOutUser, auth } from './services/AuthService'
import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'

// Obtener variables de entorno
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Generador de Currículum'
const PDF_QUALITY = parseInt(import.meta.env.VITE_PDF_QUALITY || '2')
const MAX_UPLOAD_SIZE = parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '1048576')

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [user, loading, error] = auth ? useAuthState(auth) : [null, false, null]
  
  // Estados principales
  const [resumeData, setResumeData] = useState({
    personalInfo: { 
      fullName: '', 
      title: '', 
      email: '', 
      phone: '', 
      location: '', 
      linkedIn: '', 
      portfolio: '',
      profileImage: null 
    },
    professionalSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: []
  })
  const [activeTemplate, setActiveTemplate] = useState('modern')
  const [view, setView] = useState('form')
  const [colorTheme, setColorTheme] = useState({
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#4895ef'
  })
  
  // Estados para nuevas funcionalidades
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [demoUser, setDemoUser] = useState(null) // Estado para usuario demo
  
  const resumeRef = useRef(null)

  // Verificar si es la primera vez que entra el usuario
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted')
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  // Aplicar los colores personalizados a las variables CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', colorTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', colorTheme.secondary);
    document.documentElement.style.setProperty('--accent-color', colorTheme.accent);
  }, [colorTheme]);

  // Funciones de autenticación
  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      if (!auth) {
        // Modo demo - simular usuario autenticado
        setDemoUser({
          displayName: 'Usuario Demo',
          email: 'demo@ejemplo.com',
          uid: 'demo123'
        })
      }
      toast.success('¡Sesión iniciada correctamente!')
    } catch (error) {
      toast.error('Error al iniciar sesión')
      console.error('Error signing in:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOutUser()
      if (!auth) {
        // Modo demo - limpiar usuario demo
        setDemoUser(null)
      }
      toast.success('Sesión cerrada')
    } catch (error) {
      toast.error('Error al cerrar sesión')
      console.error('Error signing out:', error)
    }
  }

  // Determinar el usuario actual (Firebase o demo)
  const currentUser = user || demoUser

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `CV-${resumeData.personalInfo.fullName || 'Resume'}`,
  })

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: PDF_QUALITY,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`CV-${resumeData.personalInfo.fullName || 'Resume'}.pdf`);
      toast.success('CV descargado exitosamente!')
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast.error('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.')
    }
  };

  const handleFormChange = (newData) => {
    setResumeData(newData)
  }

  const handleColorChange = (newColors) => {
    setColorTheme(newColors)
  }

  const switchToPreview = () => setView('preview')
  const switchToForm = () => setView('form')

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    toast.success('¡Bienvenido! Comienza a crear tu CV profesional')
  }

  const handleSuggestionApply = (action) => {
    toast.info(`Aplicando sugerencia: ${action}`)
    // Aquí puedes implementar las acciones específicas para cada sugerencia
    switch (action) {
      case 'complete_info':
        setView('form')
        setActiveTab('personal')
        break
      case 'add_photo':
        setView('form')
        setActiveTab('personal')
        break
      case 'improve_summary':
        setView('form')
        setActiveTab('personal')
        break
      case 'add_skills':
        setView('form')
        setActiveTab('skills')
        break
      default:
        break
    }
  }

  return (
    <>
      <Container fluid className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <header className="app-header py-4 bg-primary text-white text-center mb-5">
          <div className="d-flex justify-content-end px-4 position-absolute" style={{ right: 0, top: '1rem' }}>
            {/* Autenticación */}
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <span className="small">Hola, {currentUser.displayName?.split(' ')[0]}</span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleSignOut}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleSignIn}
                className="me-2"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                Iniciar Sesión
              </Button>
            )}
            
            <Button
              variant={isDarkMode ? 'light' : 'dark'}
              className="rounded-circle p-2"
              onClick={toggleTheme}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </Button>
          </div>
          <h1>{APP_NAME}</h1>
          <p className="lead mb-0">Crea un currículum impresionante en minutos ✨</p>
        </header>

        {view === 'form' ? (
          <Container>
            {/* Pestañas para navegación mejorada */}
            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="form">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Editor CV
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="analytics">
                    <FontAwesomeIcon icon={faChartLine} className="me-2" />
                    Análisis CV
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="form">
                  <ResumeForm 
                    resumeData={resumeData} 
                    onUpdate={handleFormChange} 
                    activeTemplate={activeTemplate}
                    setActiveTemplate={setActiveTemplate}
                    colorTheme={colorTheme}
                    onColorChange={handleColorChange}
                  />
                </Tab.Pane>
                
                <Tab.Pane eventKey="analytics">
                  <CVAnalytics 
                    resumeData={resumeData}
                    onSuggestionApply={handleSuggestionApply}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

            <div className="d-flex justify-content-end my-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={switchToPreview}
                disabled={!resumeData.personalInfo.fullName}
              >
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Vista Previa
              </Button>
            </div>
          </Container>
        ) : (
          <Container fluid>
            <div className="d-flex justify-content-between mb-4">
              <Button variant="outline-secondary" onClick={switchToForm}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver al editor
              </Button>
              <div>
                <Button variant="primary" onClick={handlePrint} className="me-2">
                  <FontAwesomeIcon icon={faPrint} className="me-2" />
                  Imprimir
                </Button>
                <Button variant="success" onClick={handleDownloadPDF}>
                  <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
            
            <Row>
              <Col lg={8}>
                <Card className="shadow-lg resume-preview-card">
                  <Card.Body>
                    <ResumePreview 
                      resumeData={resumeData} 
                      ref={resumeRef}
                      template={activeTemplate}
                      colorTheme={colorTheme}
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <CVAnalytics 
                  resumeData={resumeData}
                  onSuggestionApply={handleSuggestionApply}
                />
              </Col>
            </Row>
          </Container>
        )}

        <footer className="mt-5 py-3 text-center text-muted">
          <p>© {new Date().getFullYear()} {APP_NAME} - Crea tu CV profesional</p>
        </footer>
      </Container>

      {/* Tour de bienvenida */}
      <OnboardingTour 
        show={showOnboarding}
        onComplete={handleOnboardingComplete}
      />

      {/* Sistema de notificaciones */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#333',
          },
        }}
      />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
