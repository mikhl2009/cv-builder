import React from 'react'
import { useTranslation } from 'react-i18next'

function MinimalTemplate({ cv }) {
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
    <div className="minimal-template" style={{
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      lineHeight: 1.6,
      color: '#2c3e50',
      maxWidth: '750px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header Section */}
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          {cv.personalInfo.profileImage && (
            <img
              src={cv.personalInfo.profileImage}
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          )}
          <div>
            <h1 style={{ 
              fontSize: '2.8rem', 
              margin: '0', 
              fontWeight: '300',
              color: '#2c3e50'
            }}>
              {cv.personalInfo.fullName}
            </h1>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          fontSize: '0.9rem',
          color: '#7f8c8d'
        }}>
          {cv.personalInfo.email && <div>{cv.personalInfo.email}</div>}
          {cv.personalInfo.phone && <div>{cv.personalInfo.phone}</div>}
          {cv.personalInfo.location && <div>{cv.personalInfo.location}</div>}
          {cv.personalInfo.website && <div>{cv.personalInfo.website}</div>}
          {cv.personalInfo.linkedin && <div>LinkedIn Profile</div>}
          {cv.personalInfo.github && <div>GitHub Profile</div>}
        </div>
      </header>

      {/* Summary Section */}
      {cv.personalInfo.summary && (
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.7,
            color: '#34495e',
            fontStyle: 'italic',
            textAlign: 'justify'
          }}>
            {cv.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {cv.experience && cv.experience.length > 0 && cv.experience[0].jobTitle && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            {t('cvSections.workExperience')}
          </h2>
          {cv.experience.map((exp, index) => (
            exp.jobTitle && (
              <div key={exp.id} style={{ 
                marginBottom: index === cv.experience.length - 1 ? 0 : '2.5rem',
                position: 'relative'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '200px 1fr', 
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: '0 0 0.5rem 0', 
                      fontSize: '1.2rem', 
                      fontWeight: '500',
                      color: '#2c3e50'
                    }}>
                      {exp.jobTitle}
                    </h3>
                    <p style={{ 
                      margin: '0 0 1rem 0', 
                      color: '#34495e',
                      fontWeight: '400'
                    }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                    {exp.description && (
                      <div style={{ 
                        fontSize: '0.95rem', 
                        color: '#2c3e50',
                        whiteSpace: 'pre-line'
                      }}>
                        {exp.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
        </section>
      )}

      {/* Education Section */}
      {cv.education && cv.education.length > 0 && cv.education[0].degree && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            {t('cvSections.education')}
          </h2>
          {cv.education.map((edu, index) => (
            edu.degree && (
              <div key={edu.id} style={{ 
                marginBottom: index === cv.education.length - 1 ? 0 : '2rem',
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '200px 1fr', 
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: '0 0 0.5rem 0', 
                      fontSize: '1.1rem', 
                      fontWeight: '500',
                      color: '#2c3e50'
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: '#34495e'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        margin: '0 0 1rem 0', 
                        fontSize: '0.9rem',
                        color: '#7f8c8d'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                    {edu.description && (
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: '#2c3e50',
                        whiteSpace: 'pre-line'
                      }}>
                        {edu.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills Section */}
      {(cv.skills.technical.length > 0 || cv.skills.languages.length > 0 || cv.skills.soft.length > 0) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            {t('cvSections.skills')}
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '200px 1fr', 
            gap: '2rem'
          }}>
            <div></div>
            <div>
              {cv.skills.technical.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#7f8c8d'
                  }}>
                    {t('cvSections.technical')}
                  </h4>
                  <p style={{ margin: 0, color: '#2c3e50' }}>
                    {cv.skills.technical.join(' • ')}
                  </p>
                </div>
              )}
              {cv.skills.languages.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#7f8c8d'
                  }}>
                    {t('cvSections.languages')}
                  </h4>
                  <p style={{ margin: 0, color: '#2c3e50' }}>
                    {cv.skills.languages.join(' • ')}
                  </p>
                </div>
              )}
              {cv.skills.soft.length > 0 && (
                <div>
                  <h4 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#7f8c8d'
                  }}>
                    {t('cvSections.softSkills')}
                  </h4>
                  <p style={{ margin: 0, color: '#2c3e50' }}>
                    {cv.skills.soft.join(' • ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {cv.projects && cv.projects.length > 0 && cv.projects[0].name && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            {t('cvSections.projects')}
          </h2>
          {cv.projects.map((project, index) => (
            project.name && (
              <div key={project.id} style={{ 
                marginBottom: index === cv.projects.length - 1 ? 0 : '2rem',
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '200px 1fr', 
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {formatDateRange(project.startDate, project.endDate)}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: '0 0 0.5rem 0', 
                      fontSize: '1.1rem', 
                      fontWeight: '500',
                      color: '#2c3e50'
                    }}>
                      {project.name}
                    </h3>
                    {project.technologies.length > 0 && (
                      <p style={{ 
                        margin: '0 0 1rem 0', 
                        fontSize: '0.9rem',
                        color: '#7f8c8d'
                      }}>
                        {project.technologies.join(' • ')}
                      </p>
                    )}
                    {project.description && (
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: '#2c3e50',
                        marginBottom: '0.5rem',
                        whiteSpace: 'pre-line'
                      }}>
                        {project.description}
                      </div>
                    )}
                    {project.url && (
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.9rem',
                        color: '#7f8c8d'
                      }}>
                        {project.url}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {cv.certifications && cv.certifications.length > 0 && cv.certifications[0].name && (
        <section>
          <h2 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '400',
            color: '#2c3e50',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            {t('cvSections.certifications')}
          </h2>
          {cv.certifications.map((cert, index) => (
            cert.name && (
              <div key={cert.id} style={{ 
                marginBottom: index === cv.certifications.length - 1 ? 0 : '1.5rem',
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '200px 1fr', 
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {formatDate(cert.date)}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: '0 0 0.2rem 0', 
                      fontSize: '1rem', 
                      fontWeight: '500',
                      color: '#2c3e50'
                    }}>
                      {cert.name}
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      color: '#7f8c8d',
                      fontSize: '0.9rem'
                    }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            )
          ))}
        </section>
      )}
    </div>
  )
}

export default MinimalTemplate
