import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Svenska översättningar
const swedishTranslations = {
  // Header
  header: {
    title: 'Professionell CV-Byggare',
    subtitle: 'Skapa ett fantastiskt, ATS-vänligt CV på några minuter'
  },
  
  // Navigation tabs
  tabs: {
    personal: 'Personlig Info',
    experience: 'Arbetslivserfarenhet',
    education: 'Utbildning',
    skills: 'Färdigheter',
    projects: 'Projekt',
    certifications: 'Certifieringar'
  },
  
  // Buttons
  buttons: {
    exportPDF: 'Exportera PDF',
    exportHTML: 'Exportera HTML',
    saveData: 'Spara Data',
    addExperience: 'Lägg till Erfarenhet',
    addEducation: 'Lägg till Utbildning',
    addProject: 'Lägg till Projekt',
    addCertification: 'Lägg till Certifiering',
    remove: 'Ta bort',
    exporting: 'Exporterar...'
  },
  
  // Template selector
  templates: {
    title: 'Välj Mall',
    modern: {
      name: 'Modern',
      description: 'Ren och modern design'
    },
    classic: {
      name: 'Klassisk',
      description: 'Traditionell och professionell'
    },
    minimal: {
      name: 'Minimal',
      description: 'Enkel och fokuserad layout'
    }
  },
  
  // Personal Info Form
  personalInfo: {
    title: 'Personlig Information',
    profileImage: 'Profilbild',
    uploadImage: 'Klicka för att ladda upp profilbild',
    imageLimit: 'Max 5MB • JPG, PNG, GIF',
    fullName: 'Fullständigt Namn',
    email: 'E-post',
    phone: 'Telefon',
    location: 'Plats',
    website: 'Webbsida',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    summary: 'Professionell Sammanfattning',
    summaryPlaceholder: 'Skriv en kort sammanfattning av din professionella bakgrund och viktiga styrkor...',
    placeholders: {
      fullName: 'Anna Andersson',
      email: 'anna.andersson@email.com',
      phone: '+46 70 123 45 67',
      location: 'Stockholm, Sverige',
      website: 'https://dinwebbsida.se',
      linkedin: 'https://linkedin.com/in/dittnamn',
      github: 'https://github.com/dittanvändarnamn'
    }
  },
  
  // Experience Form
  experience: {
    title: 'Arbetslivserfarenhet',
    jobTitle: 'Jobbtitel',
    company: 'Företag',
    location: 'Plats',
    startDate: 'Startdatum',
    endDate: 'Slutdatum',
    current: 'Arbetar här för närvarande',
    currentlyWorking: 'Arbetar här för närvarande',
    description: 'Beskrivning',
    descriptionPlaceholder: '• Utvecklade och underhöll webbapplikationer med React och Node.js\n• Samarbetade med tvärfunktionella team för att leverera högkvalitativ mjukvara\n• Implementerade automatiserad testning och CI/CD-pipelines',
    descriptionHelp: 'Använd punktlistor för att framhäva dina prestationer och ansvarsområden',
    addExperience: 'Lägg till arbetslivserfarenhet',
    removeExperience: 'Ta bort arbetslivserfarenhet',
    placeholders: {
      jobTitle: 'Mjukvaruingenjör',
      company: 'Tech Company AB',
      location: 'Stockholm, Sverige'
    }
  },
  
  // Education Form
  education: {
    title: 'Utbildning',
    degree: 'Examen',
    institution: 'Institution',
    location: 'Plats',
    startDate: 'Startdatum',
    endDate: 'Slutdatum',
    gpa: 'Betyg (Valfritt)',
    description: 'Ytterligare Information',
    descriptionPlaceholder: '• Relevant kurser: Datastrukturer, Algoritmer, Mjukvaruteknik\n• Dekanlista: Höst 2022, Vår 2023\n• Examensarbete: Maskininlärning för Prediktiv Analys',
    descriptionHelp: 'Inkludera utmärkelser, relevanta kurser, examensarbete, etc.',
    addEducation: 'Lägg till utbildning',
    removeEducation: 'Ta bort utbildning',
    placeholders: {
      degree: 'Kandidatexamen i Datavetenskap',
      institution: 'Kungliga Tekniska Högskolan',
      location: 'Stockholm, Sverige',
      gpa: '4.2/5.0'
    }
  },
  
  // Skills Form
  skills: {
    title: 'Färdigheter',
    technical: 'Tekniska Färdigheter',
    languages: 'Språk',
    soft: 'Mjuka Färdigheter',
    removeSkill: 'Ta bort färdighet',
    placeholders: {
      technical: 't.ex., JavaScript, React, Python, AWS',
      languages: 't.ex., Svenska (Modersmål), Engelska (Flyt)',
      soft: 't.ex., Ledarskap, Kommunikation, Problemlösning'
    },
    tips: {
      title: 'Tips för att lägga till färdigheter:',
      items: [
        'Lägg till en färdighet i taget',
        'Använd specifika teknologier och verktyg',
        'Inkludera språknivåer för språk',
        'Fokusera på färdigheter relevanta för ditt måljobb'
      ]
    }
  },
  
  // Projects Form
  projects: {
    title: 'Projekt',
    name: 'Projektnamn',
    description: 'Beskrivning',
    technologies: 'Använda Teknologier',
    url: 'Projekt-URL',
    startDate: 'Startdatum',
    endDate: 'Slutdatum',
    descriptionPlaceholder: '• Byggde en fullstack e-handelsplattform med användarautentisering\n• Implementerade betalningshantering med Stripe API\n• Distribuerade på AWS med automatiserad CI/CD-pipeline',
    descriptionHelp: 'Beskriv vad du byggde och vilken påverkan det hade',
    technologiesHelp: 'Separera teknologier med kommatecken',
    addProject: 'Lägg till projekt',
    removeProject: 'Ta bort projekt',
    placeholders: {
      name: 'E-handelswebbsida',
      technologies: 'React, Node.js, MongoDB, AWS',
      url: 'https://github.com/användarnamn/projekt eller https://projekt-demo.se'
    },
    tips: {
      title: 'Projekttips:',
      items: [
        'Inkludera både personliga och professionella projekt',
        'Fokusera på projekt som visar relevanta färdigheter',
        'Kvantifiera påverkan när möjligt (användare, prestandaförbättringar, etc.)',
        'Inkludera länkar till live-demos eller källkod'
      ]
    }
  },
  
  // Certifications Form
  certifications: {
    title: 'Certifieringar',
    name: 'Certifieringsnamn',
    issuer: 'Utfärdande Organisation',
    date: 'Datum Erhållen',
    url: 'Certifierings-URL',
    urlHelp: 'Länk till verifiering av behörighet eller certifikat',
    addCertification: 'Lägg till certifiering',
    removeCertification: 'Ta bort certifiering',
    placeholders: {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      url: 'https://credly.com/badges/...'
    },
    tips: {
      title: 'Certifieringstips:',
      items: [
        'Inkludera relevanta professionella certifieringar',
        'Lägg till slutförda onlinekurser från plattformar som Coursera, Udemy',
        'Inkludera licenser och professionella behörigheter',
        'Ange verifieringslänkar när möjligt'
      ]
    }
  },
  
  // CV Sections (for templates)
  cvSections: {
    personalSummary: 'Professionell Sammanfattning',
    workExperience: 'Arbetslivserfarenhet',
    education: 'Utbildning',
    skills: 'Färdigheter',
    projects: 'Projekt',
    certifications: 'Certifieringar',
    technical: 'Tekniska',
    languages: 'Språk',
    softSkills: 'Mjuka Färdigheter',
    present: 'Nuvarande',
    gpa: 'Betyg',
    technologies: 'Teknologier',
    url: 'URL'
  },
  
  // Common
  common: {
    required: 'obligatorisk',
    optional: 'valfritt',
    loading: 'Laddar...',
    error: 'Ett fel uppstod',
    success: 'Framgång!',
    save: 'Spara',
    cancel: 'Avbryt',
    delete: 'Ta bort',
    edit: 'Redigera',
    add: 'Lägg till',
    language: 'Språk'
  },
  
  // Footer
  footer: {
    createdBy: 'Skapad av',
    company: 'Utvecklingsföretag',
    aboutProject: 'Om Projektet',
    creatorDescription: 'Fullstack-utvecklare specialiserad på .NET-lösningar med över 3 års erfarenhet av att bygga robusta och skalbara applikationer.',
    companyTagline: 'Scandinavian Precision Software Development',
    companyDescription: 'Vi blandar nordisk minimalism med modern teknik för att leverera eleganta, effektiva och kraftfulla digitala lösningar för din verksamhet.',
    projectDescription: 'En modern CV-byggare utvecklad med React och Vite. Stöder flera språk, PDF-export och professionella mallar för att skapa ATS-vänliga CV:n.',
    portfolio: 'Portfolio',
    contact: 'Kontakt',
    visitWebsite: 'Besök Webbplats',
    sourceCode: 'Källkod',
    webDevelopment: 'Webbutveckling',
    mobileDevelopment: 'Mobilappar',
    ecommerce: 'E-handel',
    allRightsReserved: 'Alla rättigheter förbehållna.',
    madeWithLove: 'Gjord med kärlek',
    inSweden: 'i Sverige'
  }
}

// Engelska översättningar (standardspråk)
const englishTranslations = {
  // Header
  header: {
    title: 'Professional CV Builder',
    subtitle: 'Create a stunning, ATS-friendly resume in minutes'
  },
  
  // Navigation tabs
  tabs: {
    personal: 'Personal Info',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications'
  },
  
  // Buttons
  buttons: {
    exportPDF: 'Export PDF',
    exportHTML: 'Export HTML',
    saveData: 'Save Data',
    addExperience: 'Add Experience',
    addEducation: 'Add Education',
    addProject: 'Add Project',
    addCertification: 'Add Certification',
    remove: 'Remove',
    exporting: 'Exporting...'
  },
  
  // Template selector
  templates: {
    title: 'Choose Template',
    modern: {
      name: 'Modern',
      description: 'Clean and contemporary design'
    },
    classic: {
      name: 'Classic',
      description: 'Traditional and professional'
    },
    minimal: {
      name: 'Minimal',
      description: 'Simple and focused layout'
    }
  },
  
  // Personal Info Form
  personalInfo: {
    title: 'Personal Information',
    profileImage: 'Profile Image',
    uploadImage: 'Click to upload profile image',
    imageLimit: 'Max 5MB • JPG, PNG, GIF',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    summary: 'Professional Summary',
    summaryPlaceholder: 'Write a brief summary of your professional background and key strengths...',
    placeholders: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'City, State, Country',
      website: 'https://yourwebsite.com',
      linkedin: 'https://linkedin.com/in/yourname',
      github: 'https://github.com/yourusername'
    }
  },
  
  // Experience Form
  experience: {
    title: 'Work Experience',
    jobTitle: 'Job Title',
    company: 'Company',
    location: 'Location',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'Currently working here',
    description: 'Description',
    descriptionPlaceholder: '• Developed and maintained web applications using React and Node.js\n• Collaborated with cross-functional teams to deliver high-quality software\n• Implemented automated testing and CI/CD pipelines',
    descriptionHelp: 'Use bullet points to highlight your achievements and responsibilities',
    placeholders: {
      jobTitle: 'Software Engineer',
      company: 'Tech Company Inc.',
      location: 'San Francisco, CA'
    }
  },
  
  // Education Form
  education: {
    title: 'Education',
    degree: 'Degree',
    institution: 'Institution',
    location: 'Location',
    startDate: 'Start Date',
    endDate: 'End Date',
    gpa: 'GPA (Optional)',
    description: 'Additional Information',
    descriptionPlaceholder: '• Relevant coursework: Data Structures, Algorithms, Software Engineering\n• Dean\'s List: Fall 2022, Spring 2023\n• Senior Project: Machine Learning for Predictive Analytics',
    descriptionHelp: 'Include honors, relevant coursework, thesis, etc.',
    placeholders: {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Boston, MA',
      gpa: '3.8/4.0'
    }
  },
  
  // Skills Form
  skills: {
    title: 'Skills',
    technical: 'Technical Skills',
    languages: 'Languages',
    soft: 'Soft Skills',
    placeholders: {
      technical: 'e.g., JavaScript, React, Python, AWS',
      languages: 'e.g., English (Native), Spanish (Conversational)',
      soft: 'e.g., Leadership, Communication, Problem Solving'
    },
    tips: {
      title: 'Tips for adding skills:',
      items: [
        'Add one skill at a time',
        'Use specific technologies and tools',
        'Include proficiency levels for languages',
        'Focus on skills relevant to your target job'
      ]
    }
  },
  
  // Projects Form
  projects: {
    title: 'Projects',
    name: 'Project Name',
    description: 'Description',
    technologies: 'Technologies Used',
    url: 'Project URL',
    startDate: 'Start Date',
    endDate: 'End Date',
    descriptionPlaceholder: '• Built a full-stack e-commerce platform with user authentication\n• Implemented payment processing using Stripe API\n• Deployed on AWS with automated CI/CD pipeline',
    descriptionHelp: 'Describe what you built and the impact it had',
    technologiesHelp: 'Separate technologies with commas',
    placeholders: {
      name: 'E-commerce Website',
      technologies: 'React, Node.js, MongoDB, AWS',
      url: 'https://github.com/username/project or https://project-demo.com'
    },
    tips: {
      title: 'Project Tips:',
      items: [
        'Include both personal and professional projects',
        'Focus on projects that demonstrate relevant skills',
        'Quantify impact when possible (users, performance improvements, etc.)',
        'Include links to live demos or source code'
      ]
    }
  },
  
  // Certifications Form
  certifications: {
    title: 'Certifications',
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    date: 'Date Obtained',
    url: 'Certification URL',
    urlHelp: 'Link to credential verification or certificate',
    placeholders: {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services'
    },
    tips: {
      title: 'Certification Tips:',
      items: [
        'Include relevant professional certifications',
        'Add online course completions from platforms like Coursera, Udemy',
        'Include licenses and professional credentials',
        'Provide verification links when possible'
      ]
    }
  },
  
  // CV Sections (for templates)
  cvSections: {
    personalSummary: 'Professional Summary',
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    technical: 'Technical',
    languages: 'Languages',
    softSkills: 'Soft Skills',
    present: 'Present',
    gpa: 'GPA',
    technologies: 'Technologies',
    url: 'URL'
  },
  
  // Common
  common: {
    required: 'required',
    optional: 'optional',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    language: 'Language'
  },
  
  // Footer
  footer: {
    createdBy: 'Created by',
    company: 'Development Company',
    aboutProject: 'About Project',
    creatorDescription: 'Fullstack developer specialized in .NET solutions with over 3 years of experience building robust and scalable applications.',
    companyTagline: 'Scandinavian Precision Software Development',
    companyDescription: 'We blend Nordic minimalism with cutting-edge technology to deliver elegant, efficient, and powerful digital solutions for your business.',
    projectDescription: 'A modern CV builder developed with React and Vite. Supports multiple languages, PDF export, and professional templates for creating ATS-friendly resumes.',
    portfolio: 'Portfolio',
    contact: 'Contact',
    visitWebsite: 'Visit Website',
    sourceCode: 'Source Code',
    webDevelopment: 'Web Development',
    mobileDevelopment: 'Mobile Apps',
    ecommerce: 'E-commerce',
    allRightsReserved: 'All rights reserved.',
    madeWithLove: 'Made with love',
    inSweden: 'in Sweden'
  }
}

const resources = {
  en: {
    translation: englishTranslations
  },
  sv: {
    translation: swedishTranslations
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'sv', // Default to Swedish
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n
