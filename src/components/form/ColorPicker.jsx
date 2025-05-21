import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const ColorPicker = ({ colorTheme, onColorChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(null)

  const handleColorChange = (colorKey, value) => {
    onColorChange({
      ...colorTheme,
      [colorKey]: value
    })
  }

  const predefinedThemes = [
    { name: 'Azul', primary: '#4361ee', secondary: '#3f37c9', accent: '#4895ef' },
    { name: 'Verde', primary: '#2a9d8f', secondary: '#264653', accent: '#e9c46a' },
    { name: 'Rosa', primary: '#ff006e', secondary: '#8338ec', accent: '#ffbe0b' },
    { name: 'Gris', primary: '#495057', secondary: '#343a40', accent: '#6c757d' },
    { name: 'Rojo', primary: '#e63946', secondary: '#a8201a', accent: '#ffb703' },
    { name: 'Empresarial', primary: '#003049', secondary: '#0a0908', accent: '#fcbf49' },
  ]

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme.name)
    onColorChange(theme)
  }

  const isThemeSelected = (theme) => {
    return (
      selectedTheme === theme.name ||
      (colorTheme.primary === theme.primary &&
       colorTheme.secondary === theme.secondary &&
       colorTheme.accent === theme.accent)
    )
  }

  return (
    <div>
      <h5 className="mb-3">Temas Predefinidos</h5>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {predefinedThemes.map((theme, index) => (
          <Button 
            key={index}
            variant={isThemeSelected(theme) ? "primary" : "outline-secondary"}
            className="color-theme-btn"
            onClick={() => handleThemeSelect(theme)}
            style={{
              borderColor: theme.primary,
              borderWidth: '2px',
              position: 'relative',
              padding: '0.5rem 1rem',
              overflow: 'hidden',
              backgroundColor: isThemeSelected(theme) ? theme.primary : 'transparent'
            }}
          >
            <span style={{ 
              color: isThemeSelected(theme) ? '#fff' : theme.primary, 
              fontWeight: '500' 
            }}>
              {theme.name}
            </span>
            <div className="color-preview" style={{ 
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              right: '0', 
              height: '4px', 
              background: `linear-gradient(to right, ${theme.primary} 33%, ${theme.secondary} 33%, ${theme.secondary} 66%, ${theme.accent} 66%)` 
            }}></div>
          </Button>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Personalización Avanzada</h5>
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Ocultar' : 'Mostrar'} opciones
        </Button>
      </div>

      {showAdvanced && (
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Color Principal</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type="color" 
                  value={colorTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="me-2"
                />
                <Form.Control 
                  type="text" 
                  value={colorTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  placeholder="#4361ee"
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Color Secundario</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type="color" 
                  value={colorTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="me-2"
                />
                <Form.Control 
                  type="text" 
                  value={colorTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  placeholder="#3f37c9"
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Color Acento</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type="color" 
                  value={colorTheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="me-2"
                />
                <Form.Control 
                  type="text" 
                  value={colorTheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  placeholder="#4895ef"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ColorPicker 