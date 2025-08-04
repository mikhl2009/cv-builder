import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.createdBy')}</h3>
          <div className="creator-info">
            <div className="creator-details">
              <h4>Mikael Mykha</h4>
              <p className="creator-title">Software Developer .NET</p>
              <p className="creator-description">
                {t('footer.creatorDescription')}
              </p>
              <div className="creator-links">
                <a 
                  href="https://mikaelmykha.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  {t('footer.portfolio')}
                </a>
                <a 
                  href="https://linkedin.com/in/mikael-mykha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/mikhl2009" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">{t('footer.company')}</h3>
          <div className="company-info">
            <h4>Prima Nordic Solution</h4>
            <p className="company-tagline">{t('footer.companyTagline')}</p>
            <p className="company-description">
              {t('footer.companyDescription')}
            </p>
            <div className="company-services">
              <span className="service-tag">{t('footer.webDevelopment')}</span>
              <span className="service-tag">{t('footer.mobileDevelopment')}</span>
              <span className="service-tag">{t('footer.ecommerce')}</span>
            </div>
            <div className="company-links">
              <a 
                href="https://primasolution.se" 
                target="_blank" 
                rel="noopener noreferrer"
                className="company-link"
              >
                {t('footer.visitWebsite')}
              </a>
              <a 
                href="https://primasolution.se/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="company-link"
              >
                {t('footer.contact')}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">{t('footer.aboutProject')}</h3>
          <div className="project-info">
            <p className="project-description">
              {t('footer.projectDescription')}
            </p>
            <div className="tech-stack">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">i18next</span>
              <span className="tech-tag">PDF Export</span>
            </div>
            <div className="project-links">
              <a 
                href="https://github.com/mikhl2009/cv-builder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                {t('footer.sourceCode')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2025 <strong>Mikael Mykha</strong> & <strong>Prima Nordic Solution</strong>. {t('footer.allRightsReserved')}
          </p>
          <div className="footer-bottom-links">
            <span className="made-with-love">
              {t('footer.madeWithLove')} ❤️ {t('footer.inSweden')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
