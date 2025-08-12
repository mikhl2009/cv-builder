import jsPDF from 'jspdf'
import 'jspdf-autotable'

class ATSCompatiblePDFGenerator {
  constructor(language = 'sv') {
    this.doc = null
    this.currentY = 20
    this.pageWidth = 210 // A4 width in mm
    this.pageHeight = 297 // A4 height in mm
    this.margin = 20
    this.contentWidth = this.pageWidth - (this.margin * 2)
    this.language = language
    
    // Section titles in different languages
    this.sectionTitles = {
      sv: {
        professionalSummary: 'PROFESSIONELL SAMMANFATTNING',
        workExperience: 'ARBETSLIVSERFARENHET', 
        education: 'UTBILDNING',
        skills: 'FÄRDIGHETER',
        projects: 'PROJEKT',
        certifications: 'CERTIFIERINGAR'
      },
      en: {
        professionalSummary: 'PROFESSIONAL SUMMARY',
        workExperience: 'WORK EXPERIENCE',
        education: 'EDUCATION', 
        skills: 'SKILLS',
        projects: 'PROJECTS',
        certifications: 'CERTIFICATIONS'
      }
    }
  }

  generatePDF(cv) {
    this.doc = new jsPDF('p', 'mm', 'a4')
    this.currentY = this.margin
    
    // Add fonts for better ATS compatibility
    this.doc.setFont('helvetica')
    
    // Header with contact info
    this.addHeader(cv.personalInfo)
    
    // Professional Summary
    if (cv.personalInfo.summary) {
      this.addSection(this.sectionTitles[this.language].professionalSummary, cv.personalInfo.summary)
    }
    
    // Work Experience
    if (cv.experience && cv.experience.length > 0) {
      this.addExperienceSection(cv.experience)
    }
    
    // Education
    if (cv.education && cv.education.length > 0) {
      this.addEducationSection(cv.education)
    }
    
    // Skills
    if (cv.skills && cv.skills.length > 0) {
      this.addSkillsSection(cv.skills)
    }
    
    // Projects
    if (cv.projects && cv.projects.length > 0) {
      this.addProjectsSection(cv.projects)
    }
    
    // Certifications
    if (cv.certifications && cv.certifications.length > 0) {
      this.addCertificationsSection(cv.certifications)
    }
    
    return this.doc
  }

  addHeader(personalInfo) {
    // Name - Large, bold
    this.doc.setFontSize(20)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(personalInfo.fullName || '', this.margin, this.currentY)
    this.currentY += 10
    
    // Contact information - smaller, normal weight
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'normal')
    
    const contactInfo = []
    if (personalInfo.email) contactInfo.push(`Email: ${personalInfo.email}`)
    if (personalInfo.phone) contactInfo.push(`Phone: ${personalInfo.phone}`)
    if (personalInfo.location) contactInfo.push(`Location: ${personalInfo.location}`)
    if (personalInfo.website) contactInfo.push(`Website: ${personalInfo.website}`)
    if (personalInfo.linkedin) contactInfo.push(`LinkedIn: ${personalInfo.linkedin}`)
    if (personalInfo.github) contactInfo.push(`GitHub: ${personalInfo.github}`)
    
    // Display contact info in two columns for better ATS parsing
    let colIndex = 0
    let lineY = this.currentY
    
    contactInfo.forEach((info, index) => {
      const x = colIndex === 0 ? this.margin : this.margin + (this.contentWidth / 2)
      this.doc.text(info, x, lineY)
      
      if (colIndex === 1) {
        lineY += 5
        colIndex = 0
      } else {
        colIndex = 1
      }
    })
    
    // Add extra space after contact info
    this.currentY = lineY + (colIndex === 1 ? 5 : 0) + 10
    this.addHorizontalLine()
  }

  addSection(title, content) {
    this.checkPageBreak(25) // Ensure space for title and some content
    
    // Section title
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(title, this.margin, this.currentY)
    this.currentY += 8
    
    // Section content
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'normal')
    
    if (content) {
      // Remove HTML tags and convert to plain text for ATS compatibility
      const plainText = this.stripHTML(content)
      const splitText = this.doc.splitTextToSize(plainText, this.contentWidth)
      
      splitText.forEach(line => {
        this.checkPageBreak(5)
        this.doc.text(line, this.margin, this.currentY)
        this.currentY += 5
      })
    }
    
    this.currentY += 5 // Add spacing after section
  }

  addExperienceSection(experiences) {
    this.checkPageBreak(30)
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.sectionTitles[this.language].workExperience, this.margin, this.currentY)
    this.currentY += 10
    
    experiences.forEach((exp, index) => {
      if (!exp.jobTitle) return
      
      this.checkPageBreak(20) // Ensure space for job entry
      
      // Job title and company
      this.doc.setFontSize(12)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(`${exp.jobTitle} | ${exp.company}`, this.margin, this.currentY)
      this.currentY += 6
      
      // Dates and location
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      const dateRange = this.formatDateRange(exp.startDate, exp.endDate, exp.current)
      let locationText = dateRange
      if (exp.location) {
        locationText += ` | ${exp.location}`
      }
      this.doc.text(locationText, this.margin, this.currentY)
      this.currentY += 6
      
      // Job description
      if (exp.description) {
        this.doc.setFontSize(11)
        const plainDescription = this.stripHTML(exp.description)
        const splitDescription = this.doc.splitTextToSize(plainDescription, this.contentWidth)
        
        splitDescription.forEach(line => {
          this.checkPageBreak(5)
          this.doc.text(line, this.margin, this.currentY)
          this.currentY += 5
        })
      }
      
      this.currentY += 6 // Space between jobs
    })
  }

  addEducationSection(education) {
    this.checkPageBreak(25)
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.sectionTitles[this.language].education, this.margin, this.currentY)
    this.currentY += 10
    
    education.forEach(edu => {
      if (!edu.degree) return
      
      this.checkPageBreak(15)
      
      // Degree and institution
      this.doc.setFontSize(12)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(`${edu.degree} | ${edu.institution}`, this.margin, this.currentY)
      this.currentY += 6
      
      // Dates and additional info
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      const dateRange = this.formatDateRange(edu.startDate, edu.endDate)
      let eduInfo = dateRange
      if (edu.location) eduInfo += ` | ${edu.location}`
      if (edu.gpa) eduInfo += ` | GPA: ${edu.gpa}`
      
      this.doc.text(eduInfo, this.margin, this.currentY)
      this.currentY += 6
      
      // Description
      if (edu.description) {
        this.doc.setFontSize(11)
        const plainDescription = this.stripHTML(edu.description)
        const splitDescription = this.doc.splitTextToSize(plainDescription, this.contentWidth)
        
        splitDescription.forEach(line => {
          this.checkPageBreak(5)
          this.doc.text(line, this.margin, this.currentY)
          this.currentY += 5
        })
      }
      
      this.currentY += 6
    })
  }

  addSkillsSection(skills) {
    this.checkPageBreak(20)
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.sectionTitles[this.language].skills, this.margin, this.currentY)
    this.currentY += 10
    
    // Group skills by category for better ATS parsing
    const groupedSkills = {}
    skills.forEach(skill => {
      if (!skill.name) return
      const category = skill.category || 'Technical Skills'
      if (!groupedSkills[category]) {
        groupedSkills[category] = []
      }
      groupedSkills[category].push(skill.name)
    })
    
    Object.entries(groupedSkills).forEach(([category, skillNames]) => {
      this.checkPageBreak(10)
      
      this.doc.setFontSize(11)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(`${category}:`, this.margin, this.currentY)
      this.currentY += 5
      
      this.doc.setFont('helvetica', 'normal')
      const skillsText = skillNames.join(', ')
      const splitSkills = this.doc.splitTextToSize(skillsText, this.contentWidth - 10)
      
      splitSkills.forEach(line => {
        this.checkPageBreak(5)
        this.doc.text(line, this.margin + 5, this.currentY)
        this.currentY += 5
      })
      
      this.currentY += 3
    })
  }

  addProjectsSection(projects) {
    this.checkPageBreak(25)
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.sectionTitles[this.language].projects, this.margin, this.currentY)
    this.currentY += 10
    
    projects.forEach(project => {
      if (!project.name) return
      
      this.checkPageBreak(15)
      
      // Project name
      this.doc.setFontSize(12)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(project.name, this.margin, this.currentY)
      this.currentY += 6
      
      // Project details
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      const dateRange = this.formatDateRange(project.startDate, project.endDate)
      let projectInfo = dateRange
      if (project.url) projectInfo += ` | ${project.url}`
      
      this.doc.text(projectInfo, this.margin, this.currentY)
      this.currentY += 6
      
      // Technologies
      if (project.technologies && project.technologies.length > 0) {
        this.doc.setFontSize(10)
        this.doc.setFont('helvetica', 'italic')
        this.doc.text(`Technologies: ${project.technologies.join(', ')}`, this.margin, this.currentY)
        this.currentY += 6
      }
      
      // Description
      if (project.description) {
        this.doc.setFontSize(11)
        this.doc.setFont('helvetica', 'normal')
        const plainDescription = this.stripHTML(project.description)
        const splitDescription = this.doc.splitTextToSize(plainDescription, this.contentWidth)
        
        splitDescription.forEach(line => {
          this.checkPageBreak(5)
          this.doc.text(line, this.margin, this.currentY)
          this.currentY += 5
        })
      }
      
      this.currentY += 6
    })
  }

  addCertificationsSection(certifications) {
    this.checkPageBreak(20)
    
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.sectionTitles[this.language].certifications, this.margin, this.currentY)
    this.currentY += 10
    
    certifications.forEach(cert => {
      if (!cert.name) return
      
      this.checkPageBreak(10)
      
      this.doc.setFontSize(11)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(cert.name, this.margin, this.currentY)
      this.currentY += 5
      
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')
      let certInfo = ''
      if (cert.issuer) certInfo += cert.issuer
      if (cert.date) certInfo += ` | ${this.formatDate(cert.date)}`
      if (cert.url) certInfo += ` | ${cert.url}`
      
      if (certInfo) {
        this.doc.text(certInfo, this.margin, this.currentY)
        this.currentY += 5
      }
      
      this.currentY += 3
    })
  }

  checkPageBreak(requiredSpace) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.doc.addPage()
      this.currentY = this.margin
    }
  }

  addHorizontalLine() {
    this.doc.setLineWidth(0.5)
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY)
    this.currentY += 5
  }

  stripHTML(html) {
    if (!html) return ''
    
    // Convert HTML to plain text while preserving structure
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<li>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<ul>|<\/ul>|<ol>|<\/ol>/gi, '\n')
      .replace(/<[^>]*>/g, '') // Remove all other HTML tags
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize multiple line breaks
      .trim()
  }

  formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  formatDateRange(startDate, endDate, current = false) {
    const start = this.formatDate(startDate)
    const end = current ? 'Present' : this.formatDate(endDate)
    return `${start} - ${end}`
  }

  save(filename) {
    this.doc.save(filename)
  }
}

export default ATSCompatiblePDFGenerator
