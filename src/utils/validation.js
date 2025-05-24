// Utilidades de validación para el formulario de CV
export const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+\d{1,3}[-.]?)?\(?\d{1,4}\)?[-.]?\d{1,4}[-.]?\d{1,9}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
}

export const validatePersonalInfo = (personalInfo) => {
  const errors = {}

  if (!personalInfo.fullName?.trim()) {
    errors.fullName = 'El nombre completo es obligatorio'
  } else if (personalInfo.fullName.length < 2) {
    errors.fullName = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!personalInfo.email?.trim()) {
    errors.email = 'El email es obligatorio'
  } else if (!validationRules.email.test(personalInfo.email)) {
    errors.email = 'Por favor ingresa un email válido'
  }

  if (personalInfo.phone && !validationRules.phone.test(personalInfo.phone)) {
    errors.phone = 'Por favor ingresa un teléfono válido'
  }

  if (personalInfo.linkedIn && !validationRules.linkedin.test(personalInfo.linkedIn)) {
    errors.linkedIn = 'Por favor ingresa una URL de LinkedIn válida'
  }

  if (personalInfo.portfolio && !validationRules.url.test(personalInfo.portfolio)) {
    errors.portfolio = 'Por favor ingresa una URL válida para tu portfolio'
  }

  return errors
}

export const validateWorkExperience = (workExperience) => {
  const errors = []

  workExperience.forEach((exp, index) => {
    const expErrors = {}

    if (!exp.jobTitle?.trim()) {
      expErrors.jobTitle = 'El título del puesto es obligatorio'
    }

    if (!exp.company?.trim()) {
      expErrors.company = 'El nombre de la empresa es obligatorio'
    }

    if (!exp.startDate) {
      expErrors.startDate = 'La fecha de inicio es obligatoria'
    }

    if (!exp.current && !exp.endDate) {
      expErrors.endDate = 'La fecha de fin es obligatoria si no trabajas actualmente aquí'
    }

    if (exp.startDate && exp.endDate && new Date(exp.startDate) > new Date(exp.endDate)) {
      expErrors.dateRange = 'La fecha de inicio debe ser anterior a la fecha de fin'
    }

    if (Object.keys(expErrors).length > 0) {
      errors[index] = expErrors
    }
  })

  return errors
}

export const validateEducation = (education) => {
  const errors = []

  education.forEach((edu, index) => {
    const eduErrors = {}

    if (!edu.degree?.trim()) {
      eduErrors.degree = 'El título/grado es obligatorio'
    }

    if (!edu.institution?.trim()) {
      eduErrors.institution = 'La institución es obligatoria'
    }

    if (!edu.year) {
      eduErrors.year = 'El año de graduación es obligatorio'
    }

    if (Object.keys(eduErrors).length > 0) {
      errors[index] = eduErrors
    }
  })

  return errors
}

export const validateResume = (resumeData) => {
  const errors = {}

  const personalErrors = validatePersonalInfo(resumeData.personalInfo)
  if (Object.keys(personalErrors).length > 0) {
    errors.personalInfo = personalErrors
  }

  const workErrors = validateWorkExperience(resumeData.workExperience || [])
  if (workErrors.length > 0) {
    errors.workExperience = workErrors
  }

  const educationErrors = validateEducation(resumeData.education || [])
  if (educationErrors.length > 0) {
    errors.education = educationErrors
  }

  return errors
}

export const getErrorMessage = (errors, section, field, index = null) => {
  if (!errors[section]) return null
  
  if (index !== null) {
    return errors[section][index]?.[field]
  }
  
  return errors[section][field]
} 