import React from 'react'
import { Plus, X, GraduationCap } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import { useTranslation } from 'react-i18next'
import MonthYearPicker from '../MonthYearPicker'

function EducationForm() {
  const { cv, dispatch, actions } = useCV()
  const { t } = useTranslation()

  const addEducation = () => {
    dispatch({
      type: actions.ADD_EDUCATION,
      payload: {
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      }
    })
  }

  const updateEducation = (id, field, value) => {
    dispatch({
      type: actions.UPDATE_EDUCATION,
      payload: { id, [field]: value }
    })
  }

  const deleteEducation = (id) => {
    if (cv.education.length > 1) {
      dispatch({
        type: actions.DELETE_EDUCATION,
        payload: id
      })
    }
  }

  return (
    <div className="education-form">
      <div className="section-header">
        <h3>
          <GraduationCap size={20} />
          {t('education.title')}
        </h3>
      </div>

      <div className="dynamic-section">
        {cv.education.map((edu) => (
          <div key={edu.id} className="dynamic-item">
            {cv.education.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => deleteEducation(edu.id)}
                title={t('education.removeEducation')}
              >
                <X size={12} />
              </button>
            )}

            <div className="form-group">
              <label>{t('education.degree')} *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder={t('education.placeholders.degree')}
              />
            </div>

            <div className="form-group">
              <label>{t('education.institution')} *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder={t('education.placeholders.institution')}
              />
            </div>

            <div className="form-group">
              <label>{t('education.location')}</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                placeholder={t('education.placeholders.location')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>{t('education.startDate')}</label>
                <MonthYearPicker
                  value={edu.startDate}
                  onChange={(value) => updateEducation(edu.id, 'startDate', value)}
                  placeholder={t('education.placeholders.startDate')}
                />
              </div>

              <div className="form-group">
                <label>{t('education.endDate')}</label>
                <MonthYearPicker
                  value={edu.endDate}
                  onChange={(value) => updateEducation(edu.id, 'endDate', value)}
                  placeholder={t('education.placeholders.endDate')}
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('education.gpa')}</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder={t('education.placeholders.gpa')}
              />
            </div>

            <div className="form-group">
              <label>{t('education.description')}</label>
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                placeholder={t('education.descriptionPlaceholder')}
                rows={4}
              />
              <small>{t('education.descriptionHelp')}</small>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={addEducation}>
          <Plus size={16} />
          {t('education.addEducation')}
        </button>
      </div>
    </div>
  )
}

export default EducationForm
