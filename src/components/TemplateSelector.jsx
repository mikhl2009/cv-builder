import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCV } from '../context/CVContext'

function TemplateSelector() {
  const { t } = useTranslation()
  const { cv, dispatch, actions } = useCV()

  const templates = [
    { 
      id: 'modern', 
      name: t('templates.modern.name'), 
      description: t('templates.modern.description') 
    },
    { 
      id: 'classic', 
      name: t('templates.classic.name'), 
      description: t('templates.classic.description') 
    },
    { 
      id: 'minimal', 
      name: t('templates.minimal.name'), 
      description: t('templates.minimal.description') 
    }
  ]

  const handleTemplateChange = (templateId) => {
    dispatch({ type: actions.SET_TEMPLATE, payload: templateId })
  }

  return (
    <div className="template-selector">
      <h3>{t('templates.title')}</h3>
      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-option ${cv.template === template.id ? 'active' : ''}`}
            onClick={() => handleTemplateChange(template.id)}
          >
            <div className="template-preview">
              <div className="template-name">{template.name}</div>
              <div className="template-description">{template.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
