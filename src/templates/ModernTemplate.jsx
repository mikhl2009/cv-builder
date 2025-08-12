import React from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import RichTextDisplay from '../components/RichTextDisplay'

function ModernTemplate({ cv }) {
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
    <div className="modern-template" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: '#333',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header Section */}
      <header style={{
        background: `linear-gradient(135deg, ${cv.theme.primaryColor} 0%, ${cv.theme.accentColor} 100%)`,
        color: 'white',
        padding: '2rem',
        borderRadius: '0 0 20px 20px',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {cv.personalInfo.profileImage && (
            <img
              src={cv.personalInfo.profileImage}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.2)'
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              margin: '0 0 1rem 0', 
              fontWeight: '700' 
            }}>
              {cv.personalInfo.fullName}
            </h1>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1rem', 
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              {cv.personalInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} />
                  {cv.personalInfo.email}
                </div>
              )}
              {cv.personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} />
                  {cv.personalInfo.phone}
                </div>
              )}
              {cv.personalInfo.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} />
                  {cv.personalInfo.location}
                </div>
              )}
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1rem', 
              fontSize: '0.9rem',
              opacity: 0.9,
              marginTop: '0.5rem'
            }}>
              {cv.personalInfo.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={16} />
                  <a href={cv.personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {cv.personalInfo.website}
                  </a>
                </div>
              )}
              {cv.personalInfo.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a href={cv.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Linkedin size={16} />
                  </a>
                </div>
              )}
              {cv.personalInfo.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a href={cv.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Github size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      {cv.personalInfo.summary && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.personalSummary')}
          </h2>
          <RichTextDisplay 
            content={cv.personalInfo.summary} 
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          />
        </section>
      )}

      {/* Experience Section */}
      {cv.experience && cv.experience.length > 0 && cv.experience[0].jobTitle && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.workExperience')}
          </h2>
          {cv.experience.map((exp) => (
            exp.jobTitle && (
              <div key={exp.id} className="experience-item avoid" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{exp.jobTitle}</h3>
                    <p style={{ margin: '0.2rem 0', color: cv.theme.primaryColor, fontWeight: '500' }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <RichTextDisplay 
                    content={exp.description}
                    style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.6,
                      marginLeft: '0'
                    }}
                  />
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Education Section */}
      {cv.education && cv.education.length > 0 && cv.education[0].degree && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.education')}
          </h2>
          {cv.education.map((edu) => (
            edu.degree && (
              <div key={edu.id} className="education-item avoid" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{edu.degree}</h3>
                    <p style={{ margin: '0.2rem 0', color: cv.theme.primaryColor, fontWeight: '500' }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#666' }}>
                        {t('cvSections.gpa')}: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <RichTextDisplay 
                    content={edu.description}
                    style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.6
                    }}
                  />
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills Section */}
      {(cv.skills.technical.length > 0 || cv.skills.languages.length > 0 || cv.skills.soft.length > 0) && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.skills')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {cv.skills.technical.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: cv.theme.accentColor }}>{t('cvSections.technical')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cv.skills.technical.map((skill, index) => (
                    <span key={index} style={{
                      background: cv.theme.primaryColor,
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.85rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cv.skills.languages.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: cv.theme.accentColor }}>{t('cvSections.languages')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cv.skills.languages.map((skill, index) => (
                    <span key={index} style={{
                      background: cv.theme.accentColor,
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.85rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cv.skills.soft.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: cv.theme.accentColor }}>{t('cvSections.softSkills')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cv.skills.soft.map((skill, index) => (
                    <span key={index} style={{
                      background: '#6c757d',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.85rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {cv.projects && cv.projects.length > 0 && cv.projects[0].name && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.projects')}
          </h2>
          {cv.projects.map((project) => (
            project.name && (
              <div key={project.id} className="project-item avoid" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{project.name}</h3>
                    {project.technologies.length > 0 && (
                      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: cv.theme.primaryColor }}>
                        {project.technologies.join(' • ')}
                      </p>
                    )}
                  </div>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}>
                    {formatDateRange(project.startDate, project.endDate)}
                  </span>
                </div>
                {project.description && (
                  <RichTextDisplay 
                    content={project.description}
                    style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.6,
                      marginBottom: '0.5rem'
                    }}
                  />
                )}
                {project.url && (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: cv.theme.primaryColor }}>
                    {project.url}
                  </p>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {cv.certifications && cv.certifications.length > 0 && cv.certifications[0].name && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            color: cv.theme.primaryColor, 
            borderBottom: `2px solid ${cv.theme.primaryColor}`,
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {t('cvSections.certifications')}
          </h2>
          {cv.certifications.map((cert) => (
            cert.name && (
              <div key={cert.id} className="certification-item avoid" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{cert.name}</h3>
                    <p style={{ margin: '0.2rem 0', color: cv.theme.primaryColor, fontWeight: '500' }}>
                      {cert.issuer}
                    </p>
                    {cert.url && (
                      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#666' }}>
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: cv.theme.primaryColor, textDecoration: 'none' }}>
                          {cert.url}
                        </a>
                      </p>
                    )}
                  </div>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {formatDate(cert.date)}
                  </span>
                </div>
              </div>
            )
          ))}
        </section>
      )}
    </div>
  )
}

export default ModernTemplate
