import React from 'react'
import { useTranslation } from 'react-i18next'

function ClassicTemplate({ cv }) {
  const { t } = useTranslation()
  
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const formatDateRange = (startDate, endDate, current = false) => {
    const start = formatDate(startDate)
    const end = current ? t('cvSections.present') : formatDate(endDate)
    return `${start}${start && (end || current) ? ' - ' : ''}${end || current ? end : ''}`
  }

  return (
    <div className="classic-template" style={{
      fontFamily: "'Times New Roman', serif",
      lineHeight: 1.5,
      color: '#000',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
        {cv.personalInfo.profileImage && (
          <img
            src={cv.personalInfo.profileImage}
            alt="Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem'
            }}
          />
        )}
        <h1 style={{ 
          fontSize: '2.2rem', 
          margin: '0 0 0.5rem 0', 
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          {cv.personalInfo.fullName}
        </h1>
        <div style={{ fontSize: '1rem', margin: '0.5rem 0' }}>
          {[cv.personalInfo.email, cv.personalInfo.phone, cv.personalInfo.location].filter(Boolean).join(' • ')}
        </div>
        <div style={{ fontSize: '1rem' }}>
          {[cv.personalInfo.website, cv.personalInfo.linkedin, cv.personalInfo.github].filter(Boolean).join(' • ')}
        </div>
      </header>

      {/* Summary Section */}
      {cv.personalInfo.summary && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.personalSummary')}
          </h2>
          <p style={{ fontSize: '1rem', textAlign: 'justify' }}>{cv.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {cv.experience && cv.experience.length > 0 && cv.experience[0].jobTitle && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.workExperience')}
          </h2>
          {cv.experience.map((exp) => (
            exp.jobTitle && (
              <div key={exp.id} className="experience-item avoid" style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {exp.jobTitle} - {exp.company}
                  </h3>
                  <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.location && (
                  <p style={{ margin: '0.2rem 0', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    {exp.location}
                  </p>
                )}
                {exp.description && (
                  <div style={{ 
                    fontSize: '0.95rem', 
                    marginTop: '0.5rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {exp.description}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Education Section */}
      {cv.education && cv.education.length > 0 && cv.education[0].degree && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.education')}
          </h2>
          {cv.education.map((edu) => (
            edu.degree && (
              <div key={edu.id} className="education-item avoid" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {edu.degree}
                  </h3>
                  <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                <p style={{ margin: '0.2rem 0', fontStyle: 'italic' }}>
                  {edu.institution}{edu.location && `, ${edu.location}`}
                </p>
                {edu.gpa && (
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                    GPA: {edu.gpa}
                  </p>
                )}
                {edu.description && (
                  <div style={{ 
                    fontSize: '0.9rem', 
                    marginTop: '0.3rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {edu.description}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills Section */}
      {(cv.skills.technical.length > 0 || cv.skills.languages.length > 0 || cv.skills.soft.length > 0) && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.skills')}
          </h2>
          {cv.skills.technical.length > 0 && (
            <p style={{ margin: '0.5rem 0' }}>
              <strong>{t('cvSections.technical')}:</strong> {cv.skills.technical.join(', ')}
            </p>
          )}
          {cv.skills.languages.length > 0 && (
            <p style={{ margin: '0.5rem 0' }}>
              <strong>{t('cvSections.languages')}:</strong> {cv.skills.languages.join(', ')}
            </p>
          )}
          {cv.skills.soft.length > 0 && (
            <p style={{ margin: '0.5rem 0' }}>
              <strong>{t('cvSections.softSkills')}:</strong> {cv.skills.soft.join(', ')}
            </p>
          )}
        </section>
      )}

      {/* Projects Section */}
      {cv.projects && cv.projects.length > 0 && cv.projects[0].name && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.projects')}
          </h2>
          {cv.projects.map((project) => (
            project.name && (
              <div key={project.id} className="project-item avoid" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {project.name}
                  </h3>
                  <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {formatDateRange(project.startDate, project.endDate)}
                  </span>
                </div>
                {project.technologies.length > 0 && (
                  <p style={{ margin: '0.2rem 0', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Technologies: {project.technologies.join(', ')}
                  </p>
                )}
                {project.description && (
                  <div style={{ 
                    fontSize: '0.9rem', 
                    marginTop: '0.3rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {project.description}
                  </div>
                )}
                {project.url && (
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                    URL: {project.url}
                  </p>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {cv.certifications && cv.certifications.length > 0 && cv.certifications[0].name && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '0.3rem',
            marginBottom: '0.8rem'
          }}>
            {t('cvSections.certifications')}
          </h2>
          {cv.certifications.map((cert) => (
            cert.name && (
              <div key={cert.id} className="certification-item avoid" style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                    {cert.name}
                  </h3>
                  <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {formatDate(cert.date)}
                  </span>
                </div>
                <p style={{ margin: '0.2rem 0', fontStyle: 'italic' }}>
                  {cert.issuer}
                </p>
                {cert.url && (
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'underline' }}>
                      {cert.url}
                    </a>
                  </p>
                )}
              </div>
            )
          ))}
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate
