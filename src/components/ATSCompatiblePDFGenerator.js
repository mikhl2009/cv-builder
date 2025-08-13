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
        professionalSummary: 'Profil',
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
    
    // Contact info labels in different languages
    this.contactLabels = {
      sv: {
        email: 'E-post',
        phone: 'Telefon',
        location: 'Plats',
        website: 'Webbsida',
        linkedin: 'LinkedIn',
        github: 'GitHub'
      },
      en: {
        email: 'Email',
        phone: 'Phone', 
        location: 'Location',
        website: 'Website',
        linkedin: 'LinkedIn',
        github: 'GitHub'
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
    
    const labels = this.contactLabels[this.language]
    const contactInfo = []
    
    if (personalInfo.email) {
      contactInfo.push({
        text: `${labels.email}: ${personalInfo.email}`,
        type: 'email',
        value: personalInfo.email
      })
    }
    if (personalInfo.phone) {
      contactInfo.push({
        text: `${labels.phone}: ${personalInfo.phone}`,
        type: 'text'
      })
    }
    if (personalInfo.location) {
      contactInfo.push({
        text: `${labels.location}: ${personalInfo.location}`,
        type: 'text'
      })
    }
    if (personalInfo.website) {
      const shortUrl = this.truncateUrl(personalInfo.website)
      contactInfo.push({
        text: `${labels.website}: ${shortUrl}`,
        type: 'url',
        value: personalInfo.website,
        displayUrl: shortUrl
      })
    }
    if (personalInfo.linkedin) {
      const shortLinkedin = this.truncateUrl(personalInfo.linkedin)
      contactInfo.push({
        text: `${labels.linkedin}: ${shortLinkedin}`,
        type: 'url',
        value: personalInfo.linkedin,
        displayUrl: shortLinkedin
      })
    }
    if (personalInfo.github) {
      const shortGithub = this.truncateUrl(personalInfo.github)
      contactInfo.push({
        text: `${labels.github}: ${shortGithub}`,
        type: 'url',
        value: personalInfo.github,
        displayUrl: shortGithub
      })
    }
    
    // Display contact info in two columns for better ATS parsing
    let colIndex = 0
    let lineY = this.currentY
    
    contactInfo.forEach((info, index) => {
      const x = colIndex === 0 ? this.margin : this.margin + (this.contentWidth / 2)
      
      // Check if text fits in column width, if not use single column
      const columnWidth = this.contentWidth / 2 - 5
      const textWidth = this.doc.getTextWidth(info.text)
      
      if (textWidth > columnWidth && colIndex === 1) {
        // Move to next line if text too long for second column
        lineY += 5
        colIndex = 0
      }
      
      const finalX = colIndex === 0 ? this.margin : this.margin + (this.contentWidth / 2)
      
      // Add text
      this.doc.text(info.text, finalX, lineY)
      
      // Add clickable link for URLs and emails
      if (info.type === 'url' || info.type === 'email') {
        const labelWidth = this.doc.getTextWidth(`${info.text.split(':')[0]}: `)
        const linkX = finalX + labelWidth
        const linkWidth = this.doc.getTextWidth(info.displayUrl || info.value)
        const linkY = lineY - 3 // Adjust for text baseline
        
        if (info.type === 'url') {
          // Add clickable URL link
          this.doc.link(linkX, linkY, linkWidth, 5, { url: info.value })
        } else if (info.type === 'email') {
          // Add clickable email link
          this.doc.link(linkX, linkY, linkWidth, 5, { url: `mailto:${info.value}` })
        }
      }
      
      if (colIndex === 1 || textWidth > columnWidth) {
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
      
      if (project.url) {
        const shortUrl = this.truncateUrl(project.url)
        projectInfo += ` | ${shortUrl}`
        
        this.doc.text(projectInfo, this.margin, this.currentY)
        
        // Add clickable link for the URL part
        const prefixWidth = this.doc.getTextWidth(`${dateRange} | `)
        const linkX = this.margin + prefixWidth
        const linkWidth = this.doc.getTextWidth(shortUrl)
        const linkY = this.currentY - 3
        
        this.doc.link(linkX, linkY, linkWidth, 5, { url: project.url })
      } else {
        this.doc.text(projectInfo, this.margin, this.currentY)
      }
      
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
      
      if (cert.url) {
        const shortUrl = this.truncateUrl(cert.url)
        certInfo += ` | ${shortUrl}`
        
        if (certInfo) {
          this.doc.text(certInfo, this.margin, this.currentY)
          
          // Add clickable link for the URL part
          const prefixWidth = this.doc.getTextWidth(certInfo.replace(` | ${shortUrl}`, ' | '))
          const linkX = this.margin + prefixWidth
          const linkWidth = this.doc.getTextWidth(shortUrl)
          const linkY = this.currentY - 3
          
          this.doc.link(linkX, linkY, linkWidth, 5, { url: cert.url })
          this.currentY += 5
        }
      } else {
        if (certInfo) {
          this.doc.text(certInfo, this.margin, this.currentY)
          this.currentY += 5
        }
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

  truncateUrl(url) {
    if (!url) return ''
    
    // Remove protocol for shorter display
    let cleanUrl = url.replace(/^https?:\/\//, '')
    
    // If still too long, truncate intelligently
    if (cleanUrl.length > 35) {
      // For LinkedIn, show the profile part
      if (cleanUrl.includes('linkedin.com/in/')) {
        const profilePart = cleanUrl.match(/linkedin\.com\/in\/([^\/]+)/);
        if (profilePart) {
          return `linkedin.com/in/${profilePart[1]}`;
        }
      }
      
      // For GitHub, show the username part
      if (cleanUrl.includes('github.com/')) {
        const userPart = cleanUrl.match(/github\.com\/([^\/]+)/);
        if (userPart) {
          return `github.com/${userPart[1]}`;
        }
      }
      
      // For other URLs, truncate from the end
      return cleanUrl.substring(0, 32) + '...';
    }
    
    return cleanUrl;
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
