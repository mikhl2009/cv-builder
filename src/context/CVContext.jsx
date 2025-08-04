import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Initial CV data structure
const initialCV = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    profileImage: null
  },
  experience: [
    {
      id: 1,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  education: [
    {
      id: 1,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    }
  ],
  skills: {
    technical: [],
    languages: [],
    soft: []
  },
  projects: [
    {
      id: 1,
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: ''
    }
  ],
  certifications: [
    {
      id: 1,
      name: '',
      issuer: '',
      date: '',
      url: ''
    }
  ],
  template: 'modern',
  theme: {
    primaryColor: '#667eea',
    accentColor: '#764ba2',
    textColor: '#333333',
    backgroundColor: '#ffffff'
  }
}

// Action types
const CV_ACTIONS = {
  UPDATE_PERSONAL_INFO: 'UPDATE_PERSONAL_INFO',
  ADD_EXPERIENCE: 'ADD_EXPERIENCE',
  UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',
  DELETE_EXPERIENCE: 'DELETE_EXPERIENCE',
  REORDER_EXPERIENCE: 'REORDER_EXPERIENCE',
  ADD_EDUCATION: 'ADD_EDUCATION',
  UPDATE_EDUCATION: 'UPDATE_EDUCATION',
  DELETE_EDUCATION: 'DELETE_EDUCATION',
  UPDATE_SKILLS: 'UPDATE_SKILLS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  ADD_CERTIFICATION: 'ADD_CERTIFICATION',
  UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
  DELETE_CERTIFICATION: 'DELETE_CERTIFICATION',
  SET_TEMPLATE: 'SET_TEMPLATE',
  UPDATE_THEME: 'UPDATE_THEME',
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',
  LOAD_CV: 'LOAD_CV',
  RESET_CV: 'RESET_CV'
}

// Reducer function
function cvReducer(state, action) {
  switch (action.type) {
    case CV_ACTIONS.UPDATE_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      }

    case CV_ACTIONS.SET_PROFILE_IMAGE:
      return {
        ...state,
        personalInfo: { ...state.personalInfo, profileImage: action.payload }
      }

    case CV_ACTIONS.ADD_EXPERIENCE:
      return {
        ...state,
        experience: [...state.experience, { ...action.payload, id: Date.now() }]
      }

    case CV_ACTIONS.UPDATE_EXPERIENCE:
      return {
        ...state,
        experience: state.experience.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        )
      }

    case CV_ACTIONS.DELETE_EXPERIENCE:
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload)
      }

    case CV_ACTIONS.REORDER_EXPERIENCE:
      return {
        ...state,
        experience: action.payload
      }

    case CV_ACTIONS.ADD_EDUCATION:
      return {
        ...state,
        education: [...state.education, { ...action.payload, id: Date.now() }]
      }

    case CV_ACTIONS.UPDATE_EDUCATION:
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id ? { ...edu, ...action.payload } : edu
        )
      }

    case CV_ACTIONS.DELETE_EDUCATION:
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload)
      }

    case CV_ACTIONS.UPDATE_SKILLS:
      return {
        ...state,
        skills: { ...state.skills, ...action.payload }
      }

    case CV_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, { ...action.payload, id: Date.now() }]
      }

    case CV_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id ? { ...proj, ...action.payload } : proj
        )
      }

    case CV_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(proj => proj.id !== action.payload)
      }

    case CV_ACTIONS.ADD_CERTIFICATION:
      return {
        ...state,
        certifications: [...state.certifications, { ...action.payload, id: Date.now() }]
      }

    case CV_ACTIONS.UPDATE_CERTIFICATION:
      return {
        ...state,
        certifications: state.certifications.map(cert =>
          cert.id === action.payload.id ? { ...cert, ...action.payload } : cert
        )
      }

    case CV_ACTIONS.DELETE_CERTIFICATION:
      return {
        ...state,
        certifications: state.certifications.filter(cert => cert.id !== action.payload)
      }

    case CV_ACTIONS.SET_TEMPLATE:
      return {
        ...state,
        template: action.payload
      }

    case CV_ACTIONS.UPDATE_THEME:
      return {
        ...state,
        theme: { ...state.theme, ...action.payload }
      }

    case CV_ACTIONS.LOAD_CV:
      return action.payload

    case CV_ACTIONS.RESET_CV:
      return initialCV

    default:
      return state
  }
}

// Create context
const CVContext = createContext()

// Provider component
export function CVProvider({ children }) {
  const [cv, dispatch] = useReducer(cvReducer, initialCV)

  // Load CV from localStorage on mount
  useEffect(() => {
    const savedCV = localStorage.getItem('cv-builder-data')
    if (savedCV) {
      try {
        const parsedCV = JSON.parse(savedCV)
        dispatch({ type: CV_ACTIONS.LOAD_CV, payload: parsedCV })
      } catch (error) {
        console.error('Error loading saved CV:', error)
      }
    }
  }, [])

  // Save CV to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cv-builder-data', JSON.stringify(cv))
  }, [cv])

  const value = {
    cv,
    dispatch,
    actions: CV_ACTIONS
  }

  return (
    <CVContext.Provider value={value}>
      {children}
    </CVContext.Provider>
  )
}

// Custom hook to use CV context
export function useCV() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error('useCV must be used within a CVProvider')
  }
  return context
}

export default CVContext
