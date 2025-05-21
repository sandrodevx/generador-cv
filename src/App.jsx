import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faEye, faArrowLeft, faPrint, faFilePdf, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { ThemeProvider, useTheme } from './theme/ThemeContext'
import ResumeForm from './components/form/ResumeForm'
import ResumePreview from './components/cv-templates/ResumePreview'
import './App.css'

// Obtener variables de entorno
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Generador de Currículum'
const PDF_QUALITY = parseInt(import.meta.env.VITE_PDF_QUALITY || '2')
const MAX_UPLOAD_SIZE = parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '1048576')

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme()
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
  const resumeRef = useRef(null)

  // Aplicar los colores personalizados a las variables CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', colorTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', colorTheme.secondary);
    document.documentElement.style.setProperty('--accent-color', colorTheme.accent);
  }, [colorTheme]);

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
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
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

  return (
    <Container fluid className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="app-header py-4 bg-primary text-white text-center mb-5">
        <div className="d-flex justify-content-end px-4 position-absolute" style={{ right: 0, top: '1rem' }}>
          <Button
            variant={isDarkMode ? 'light' : 'dark'}
            className="rounded-circle p-2"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </Button>
        </div>
        <h1>{APP_NAME}</h1>
        <p className="lead mb-0">Crea un currículum impresionante en minutos</p>
      </header>

      {view === 'form' ? (
        <Container>
          <ResumeForm 
            resumeData={resumeData} 
            onUpdate={handleFormChange} 
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            colorTheme={colorTheme}
            onColorChange={handleColorChange}
          />
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
        </Container>
      )}

      <footer className="mt-5 py-3 text-center text-muted">
        <p>© {new Date().getFullYear()} {APP_NAME} - Crea tu CV profesional</p>
      </footer>
    </Container>
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
