import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from './ColorPicker';
import AdvancedCustomization from './AdvancedCustomization';

const TemplateSelector = ({ activeTemplate, setActiveTemplate, colorTheme, onColorChange, customization, onCustomizationChange }) => {
  const templates = [
    { 
      id: 'modern', 
      name: 'Moderno', 
      description: 'Diseño limpio y contemporáneo',
      previewStyle: {
        header: { height: '30%', background: colorTheme.primary },
        sidebar: { width: '0%' },
        content: { padding: '10%' }
      }
    },
    { 
      id: 'professional', 
      name: 'Profesional', 
      description: 'Estilo clásico y formal',
      previewStyle: {
        header: { height: '25%', background: colorTheme.primary },
        sidebar: { width: '30%', background: colorTheme.secondary },
        content: { padding: '5%' }
      }
    },
    { 
      id: 'creative', 
      name: 'Creativo', 
      description: 'Diseño dinámico y llamativo',
      previewStyle: {
        header: { height: '40%', background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary})` },
        sidebar: { width: '0%' },
        content: { padding: '8%' }
      }
    },
    { 
      id: 'executive', 
      name: 'Ejecutivo', 
      description: 'Elegante y sofisticado',
      previewStyle: {
        header: { height: '20%', background: colorTheme.secondary },
        sidebar: { width: '35%', background: colorTheme.primary },
        content: { padding: '5%' }
      }
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      description: 'Diseño exclusivo con animaciones',
      isPremium: true,
      previewStyle: {
        header: { 
          height: '35%', 
          background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.secondary}, ${colorTheme.accent})` 
        },
        sidebar: { width: '0%' },
        content: { padding: '10%' }
      }
    }
  ];

  const renderTemplatePreview = (template) => {
    const { previewStyle } = template;

    return (
      <div style={{ 
        height: '100%', 
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px'
      }}>
        {/* Header */}
        <div style={{ 
          height: previewStyle.header.height, 
          background: previewStyle.header.background,
          width: '100%',
          position: 'relative'
        }}>
          {/* Nombre simulado */}
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: previewStyle.sidebar.width || '5%',
            color: '#fff',
            width: '40%',
            height: '10px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '5px'
          }}/>
          {/* Título simulado */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: previewStyle.sidebar.width || '5%',
            color: '#fff',
            width: '30%',
            height: '6px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '3px'
          }}/>
        </div>

        {/* Sidebar si existe */}
        {previewStyle.sidebar.width !== '0%' && (
          <div style={{
            position: 'absolute',
            top: previewStyle.header.height,
            left: 0,
            width: previewStyle.sidebar.width,
            height: `calc(100% - ${previewStyle.header.height})`,
            background: previewStyle.sidebar.background,
            padding: '20px 0'
          }}>
            {/* Elementos simulados del sidebar */}
            {[1,2,3].map((_, i) => (
              <div key={i} style={{
                width: '60%',
                height: '4px',
                background: 'rgba(255,255,255,0.6)',
                margin: '10px auto',
                borderRadius: '2px'
              }}/>
            ))}
          </div>
        )}

        {/* Contenido principal */}
        <div style={{
          position: 'absolute',
          top: previewStyle.header.height,
          left: previewStyle.sidebar.width || '0',
          right: 0,
          bottom: 0,
          padding: previewStyle.content.padding
        }}>
          {/* Líneas simuladas de contenido */}
          {[1,2,3,4].map((_, i) => (
            <div key={i} style={{
              width: ['100%', '90%', '95%', '85%'][i],
              height: '4px',
              background: '#e0e0e0',
              marginBottom: '8px',
              borderRadius: '2px'
            }}/>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 className="mb-3">Selecciona un Diseño</h4>
      <Row className="g-3 mb-4">
        {templates.map((template) => (
          <Col key={template.id} xs={12} sm={6} md={4}>
            <Card
              className={`template-card h-100 ${activeTemplate === template.id ? 'selected' : ''} ${
                template.isPremium ? 'premium-card' : ''
              }`}
              onClick={() => setActiveTemplate(template.id)}
              style={{
                cursor: 'pointer',
                border: activeTemplate === template.id ? '2px solid var(--primary-color)' : '1px solid #dee2e6',
                background: '#ffffff'
              }}
            >
              <div
                className={`template-preview ${template.imageClass}`}
                style={{ 
                  height: '200px', 
                  position: 'relative',
                  padding: '10px'
                }}
              >
                {renderTemplatePreview(template)}
                {template.isPremium && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      zIndex: 2
                    }}
                  >
                    <FontAwesomeIcon icon={faCrown} />
                    Premium
                  </div>
                )}
                {activeTemplate === template.id && (
                  <div
                    className="selected-check"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#fff',
                      fontSize: '2rem',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      padding: '10px',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    <FontAwesomeIcon icon={faCrown} />
                  </div>
                )}
              </div>
              <Card.Body>
                <Card.Title>{template.name}</Card.Title>
                <Card.Text className="text-muted">{template.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Personalización</Card.Title>
          <Card.Text className="text-muted mb-3">
            Personaliza los colores y el estilo de tu currículum
          </Card.Text>
          <ColorPicker colorTheme={colorTheme} onColorChange={onColorChange} />
          
          <div className="mt-4">
            <h5 className="mb-3">Personalización Avanzada</h5>
            <AdvancedCustomization 
              customization={customization} 
              onUpdate={onCustomizationChange}
            />
          </div>
        </Card.Body>
      </Card>

      <style>{`
        .template-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .template-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .template-card.selected {
          border-color: var(--primary-color);
          background-color: rgba(67, 97, 238, 0.05);
        }
        
        .premium-card {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          border: 2px solid #ffd700;
        }
        
        .premium-card:hover {
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .template-preview {
          transition: all 0.3s ease;
        }

        .template-card:hover .template-preview {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector; 