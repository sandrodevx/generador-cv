import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'

// Verificar si Firebase está configurado
const isFirebaseConfigured = () => {
  return !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  )
}

let auth = null
let db = null
let provider = null

// Solo inicializar Firebase si está configurado
if (isFirebaseConfigured()) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }

  try {
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    provider = new GoogleAuthProvider()
    console.log('✅ Firebase inicializado correctamente')
  } catch (error) {
    console.warn('⚠️ Error al inicializar Firebase:', error)
  }
} else {
  console.log('ℹ️ Firebase no configurado - funcionando en modo local')
}

export { auth }

export const signInWithGoogle = async () => {
  if (!auth || !provider) {
    console.log('📝 Demo: Login simulado - Firebase no configurado')
    // Simular login exitoso para demo
    return Promise.resolve({
      user: {
        displayName: 'Usuario Demo',
        email: 'demo@ejemplo.com',
        uid: 'demo123'
      }
    })
  }
  return signInWithPopup(auth, provider)
}

export const signOutUser = async () => {
  if (!auth) {
    console.log('📝 Demo: Logout simulado - Firebase no configurado')
    return Promise.resolve()
  }
  return signOut(auth)
}

export const saveResumeToCloud = async (userId, resumeData, resumeName) => {
  if (!db) {
    console.log('📝 Demo: Guardado simulado en localStorage')
    // Guardar en localStorage como fallback
    const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]')
    const newResume = {
      id: `${userId}_${Date.now()}`,
      userId,
      resumeName,
      resumeData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    savedResumes.push(newResume)
    localStorage.setItem('savedResumes', JSON.stringify(savedResumes))
    return true
  }

  try {
    await setDoc(doc(db, 'resumes', `${userId}_${Date.now()}`), {
      userId,
      resumeName,
      resumeData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return true
  } catch (error) {
    console.error('Error saving resume:', error)
    return false
  }
}

export const getUserResumes = async (userId) => {
  if (!db) {
    console.log('📝 Demo: Cargando desde localStorage')
    const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]')
    return savedResumes.filter(resume => resume.userId === userId)
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'resumes'))
    const userResumes = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.userId === userId) {
        userResumes.push({ id: doc.id, ...data })
      }
    })
    return userResumes
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return []
  }
} 