# 🚀 Generador de Currículum Profesional v2.0

Aplicación web avanzada para crear currículums profesionales e impresionantes con múltiples plantillas, IA integrada y análisis inteligente.

## ✨ Características Principales

### 🎨 **Diseño y Plantillas**
- **5 Plantillas Profesionales**: Moderno, Profesional, Creativo, Ejecutivo y Premium
- **Personalización de colores** en tiempo real
- **Modo oscuro/claro** para mejor experiencia
- **Diseño responsivo** para cualquier dispositivo

### 🤖 **Inteligencia Artificial**
- **Asistente de IA** para generar contenido profesional
- **Sugerencias inteligentes** basadas en el perfil
- **Análisis automático del CV** con puntuación y métricas
- **Optimización para ATS** (Applicant Tracking Systems)

### 📊 **Analytics y Métricas**
- **Puntuación de completitud** del CV
- **Análisis de calidad de contenido**
- **Estadísticas detalladas** (años de experiencia, palabras, etc.)
- **Sugerencias de mejora** personalizadas

### 🔐 **Gestión de Usuario**
- **Autenticación con Google** (Firebase)
- **Guardado en la nube** de múltiples CVs
- **Historial de versiones**
- **Sincronización entre dispositivos**

### 🎓 **Experiencia de Usuario**
- **Tour guiado** para nuevos usuarios
- **Validación en tiempo real** de formularios
- **Vista previa instantánea**
- **Interfaz intuitiva** paso a paso

### 📄 **Exportación Avanzada**
- **PDF de alta calidad** con jsPDF
- **Impresión optimizada**
- **Compresión inteligente** de imágenes
- **Múltiples formatos** de descarga

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** + **Vite** (desarrollo rápido)
- **Bootstrap 5** + **React-Bootstrap** (UI responsivo)
- **Framer Motion** (animaciones fluidas)
- **FontAwesome** (iconografía profesional)

### Backend & Servicios
- **Firebase** (autenticación y base de datos)
- **OpenAI API** (asistente de IA)
- **HTML2Canvas** + **jsPDF** (generación de PDF)

### Utilidades
- **React Hook Form** (manejo de formularios)
- **Date-fns** (manejo de fechas)
- **UUID** (identificadores únicos)
- **React Hot Toast** (notificaciones)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/sandrodevx/generador-cv.git
cd generador-cv
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Copiar `env.example` a `.env` y configurar:

```bash
# Configuración básica
VITE_APP_NAME=Generador de Currículum Profesional
VITE_PDF_QUALITY=2
VITE_MAX_UPLOAD_SIZE=1048576

# Firebase (opcional, para autenticación)
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
# ... más configuraciones de Firebase

# OpenAI (opcional, para IA)
VITE_OPENAI_API_KEY=tu_openai_key

# Feature Flags
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_CLOUD_SAVE=true
VITE_ENABLE_ANALYTICS=true
```

### 4. Iniciar en Desarrollo
```bash
npm run dev
```

### 5. Construir para Producción
```bash
npm run build
npm run preview
```

## 📋 Guía de Uso

### Para Usuarios
1. **Registro/Login**: Opcional, para guardar en la nube
2. **Tour Inicial**: Sigue el tutorial interactivo
3. **Completar Información**: Llena cada sección paso a paso
4. **Usar IA**: Haz clic en "Asistente IA" para generar contenido
5. **Personalizar**: Elige plantilla y colores
6. **Analizar**: Revisa la puntuación y sugerencias
7. **Exportar**: Descarga en PDF de alta calidad

### Para Desarrolladores
```bash
# Estructura del proyecto
src/
├── components/
│   ├── form/                 # Formularios
│   ├── cv-templates/         # Plantillas de CV
│   ├── Analytics/            # Sistema de análisis
│   ├── AI/                   # Asistente de IA
│   └── Onboarding/           # Tour guiado
├── services/                 # Servicios (Firebase, etc.)
├── utils/                    # Utilidades
└── theme/                    # Gestión de temas
```

## 🎯 Roadmap Futuro

### v2.1 (Próximo Release)
- [ ] Internacionalización completa (EN, FR, PT)
- [ ] Más plantillas especializadas
- [ ] Exportación a DOCX
- [ ] Compartir CV vía URL pública

### v2.2
- [ ] Integración con LinkedIn API
- [ ] Sistema de colaboración
- [ ] Marketplace de plantillas
- [ ] Video CV integrado

### v3.0
- [ ] Versión móvil nativa
- [ ] IA más avanzada
- [ ] Dashboard de empleadores
- [ ] Sistema de matching

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Construir para producción
npm run preview         # Previsualizar build
npm run lint            # Linter de código

# Utilidades
npm audit fix           # Corregir vulnerabilidades
npm run analyze         # Analizar bundle
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Comunidad de React** por las herramientas increíbles
- **Bootstrap** por el sistema de diseño
- **OpenAI** por hacer posible la IA
- **Firebase** por los servicios en la nube

---

## 🎉 ¿Te gusta el proyecto?

⭐ **¡Dale una estrella en GitHub!**  
🐛 **¿Encontraste un bug?** Abre un issue  
💡 **¿Tienes una idea?** ¡Compártela!  
📧 **Contacto**: [tu-email@ejemplo.com]

**Hecho con ❤️ para ayudarte a conseguir el trabajo de tus sueños** 🚀
