import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faFont, faRuler } from '@fortawesome/free-solid-svg-icons';

const AdvancedCustomization = ({ customization, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...customization,
      [field]: value
    });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <FontAwesomeIcon icon={faSliders} className="me-2" />
        Personalización Avanzada
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faFont} className="me-2" />
                Fuente Principal
              </Form.Label>
              <Form.Select
                value={customization.mainFont || 'Roboto'}
                onChange={(e) => handleChange('mainFont', e.target.value)}
              >
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faFont} className="me-2" />
                Fuente de Títulos
              </Form.Label>
              <Form.Select
                value={customization.headingFont || 'Montserrat'}
                onChange={(e) => handleChange('headingFont', e.target.value)}
              >
                <option value="Montserrat">Montserrat</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faRuler} className="me-2" />
                Espaciado entre Secciones
              </Form.Label>
              <Form.Range
                min="1"
                max="5"
                step="0.5"
                value={customization.sectionSpacing || 2.5}
                onChange={(e) => handleChange('sectionSpacing', parseFloat(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faFont} className="me-2" />
                Peso de Títulos
              </Form.Label>
              <Form.Select
                value={customization.headingWeight || '600'}
                onChange={(e) => handleChange('headingWeight', e.target.value)}
              >
                <option value="400">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdvancedCustomization; 