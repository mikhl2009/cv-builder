import React from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, X, Briefcase } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import MonthYearPicker from '../MonthYearPicker'
import RichTextEditor from '../RichTextEditor'

function ExperienceForm() {
  const { t } = useTranslation()
  const { cv, dispatch, actions } = useCV()

  const addExperience = () => {
    dispatch({
      type: actions.ADD_EXPERIENCE,
      payload: {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    })
  }

  const updateExperience = (id, field, value) => {
    dispatch({
      type: actions.UPDATE_EXPERIENCE,
      payload: { id, [field]: value }
    })
  }

  const deleteExperience = (id) => {
    if (cv.experience.length > 1) {
      dispatch({
        type: actions.DELETE_EXPERIENCE,
        payload: id
      })
    }
  }

  return (
    <div className="experience-form">
      <div className="section-header">
        <h3>
          <Briefcase size={20} />
          {t('experience.title')}
        </h3>
      </div>

      <div className="dynamic-section">
        {cv.experience.map((exp, index) => (
          <div key={exp.id} className="dynamic-item">
            {cv.experience.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => deleteExperience(exp.id)}
                title={t('experience.removeExperience')}
              >
                <X size={12} />
              </button>
            )}

            <div className="form-group">
              <label>{t('experience.jobTitle')} *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                placeholder={t('experience.jobTitle')}
              />
            </div>

            <div className="form-group">
              <label>{t('experience.company')} *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder={t('experience.company')}
              />
            </div>

            <div className="form-group">
              <label>{t('experience.location')}</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder={t('experience.location')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>{t('experience.startDate')}</label>
                <MonthYearPicker
                  value={exp.startDate}
                  onChange={(value) => updateExperience(exp.id, 'startDate', value)}
                  placeholder={t('experience.placeholders.startDate')}
                />
              </div>

              <div className="form-group">
                <label>{t('experience.endDate')}</label>
                <MonthYearPicker
                  value={exp.endDate}
                  onChange={(value) => updateExperience(exp.id, 'endDate', value)}
                  placeholder={t('experience.placeholders.endDate')}
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => {
                    updateExperience(exp.id, 'current', e.target.checked)
                    if (e.target.checked) {
                      updateExperience(exp.id, 'endDate', '')
                    }
                  }}
                />
                {t('experience.currentlyWorking')}
              </label>
            </div>

            <div className="form-group">
              <label>{t('experience.description')}</label>
              <RichTextEditor
                value={exp.description}
                onChange={(value) => updateExperience(exp.id, 'description', value)}
                placeholder={t('experience.descriptionPlaceholder')}
              />
              <small>{t('experience.descriptionHelp')}</small>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={addExperience}>
          <Plus size={16} />
          {t('experience.addExperience')}
        </button>
      </div>
    </div>
  )
}

export default ExperienceForm
