import React from 'react'
import { Plus, X, Award } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import { useTranslation } from 'react-i18next'
import MonthYearPicker from '../MonthYearPicker'

function CertificationsForm() {
  const { cv, dispatch, actions } = useCV()
  const { t } = useTranslation()

  const addCertification = () => {
    dispatch({
      type: actions.ADD_CERTIFICATION,
      payload: {
        name: '',
        issuer: '',
        date: '',
        url: ''
      }
    })
  }

  const updateCertification = (id, field, value) => {
    dispatch({
      type: actions.UPDATE_CERTIFICATION,
      payload: { id, [field]: value }
    })
  }

  const deleteCertification = (id) => {
    dispatch({
      type: actions.DELETE_CERTIFICATION,
      payload: id
    })
  }

  return (
    <div className="certifications-form">
      <div className="section-header">
        <h3>
          <Award size={20} />
          {t('certifications.title')}
        </h3>
      </div>

      <div className="dynamic-section">
        {cv.certifications.map((cert) => (
          <div key={cert.id} className="dynamic-item">
            <button
              className="remove-btn"
              onClick={() => deleteCertification(cert.id)}
              title={t('certifications.removeCertification')}
            >
              <X size={12} />
            </button>

            <div className="form-group">
              <label>{t('certifications.name')} *</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                placeholder={t('certifications.placeholders.name')}
              />
            </div>

            <div className="form-group">
              <label>{t('certifications.issuer')} *</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                placeholder={t('certifications.placeholders.issuer')}
              />
            </div>

            <div className="form-group">
              <label>{t('certifications.date')}</label>
              <MonthYearPicker
                value={cert.date}
                onChange={(value) => updateCertification(cert.id, 'date', value)}
                placeholder={t('certifications.placeholders.date')}
              />
            </div>

            <div className="form-group">
              <label>{t('certifications.url')}</label>
              <input
                type="url"
                value={cert.url}
                onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                placeholder={t('certifications.placeholders.url')}
              />
              <small>{t('certifications.urlHelp')}</small>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={addCertification}>
          <Plus size={16} />
          {t('certifications.addCertification')}
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <p><strong>{t('certifications.tips.title')}</strong></p>
        <ul style={{ marginLeft: '1rem', color: '#666' }}>
          {t('certifications.tips.items', { returnObjects: true }).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CertificationsForm
