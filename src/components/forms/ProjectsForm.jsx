import React from 'react'
import { Plus, X, FolderOpen } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import { useTranslation } from 'react-i18next'
import MonthYearPicker from '../MonthYearPicker'
import RichTextEditor from '../RichTextEditor'

function ProjectsForm() {
  const { cv, dispatch, actions } = useCV()
  const { t } = useTranslation()

  const addProject = () => {
    dispatch({
      type: actions.ADD_PROJECT,
      payload: {
        name: '',
        description: '',
        technologies: [],
        url: '',
        startDate: '',
        endDate: ''
      }
    })
  }

  const updateProject = (id, field, value) => {
    dispatch({
      type: actions.UPDATE_PROJECT,
      payload: { id, [field]: value }
    })
  }

  const deleteProject = (id) => {
    dispatch({
      type: actions.DELETE_PROJECT,
      payload: id
    })
  }

  const updateTechnologies = (id, techString) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech)
    updateProject(id, 'technologies', technologies)
  }

  return (
    <div className="projects-form">
      <div className="section-header">
        <h3>
          <FolderOpen size={20} />
          {t('projects.title')}
        </h3>
      </div>

      <div className="dynamic-section">
        {cv.projects.map((project) => (
          <div key={project.id} className="dynamic-item">
            <button
              className="remove-btn"
              onClick={() => deleteProject(project.id)}
              title={t('projects.removeProject')}
            >
              <X size={12} />
            </button>

            <div className="form-group">
              <label>{t('projects.name')} *</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder={t('projects.placeholders.name')}
              />
            </div>

            <div className="form-group">
              <label>{t('projects.description')}</label>
              <RichTextEditor
                value={project.description}
                onChange={(value) => updateProject(project.id, 'description', value)}
                placeholder={t('projects.descriptionPlaceholder')}
              />
              <small>{t('projects.descriptionHelp')}</small>
            </div>

            <div className="form-group">
              <label>{t('projects.technologies')}</label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(project.id, e.target.value)}
                placeholder={t('projects.placeholders.technologies')}
              />
              <small>{t('projects.technologiesHelp')}</small>
            </div>

            <div className="form-group">
              <label>{t('projects.url')}</label>
              <input
                type="url"
                value={project.url}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder={t('projects.placeholders.url')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>{t('projects.startDate')}</label>
                <MonthYearPicker
                  value={project.startDate}
                  onChange={(value) => updateProject(project.id, 'startDate', value)}
                  placeholder={t('projects.placeholders.startDate')}
                />
              </div>

              <div className="form-group">
                <label>{t('projects.endDate')}</label>
                <MonthYearPicker
                  value={project.endDate}
                  onChange={(value) => updateProject(project.id, 'endDate', value)}
                  placeholder={t('projects.placeholders.endDate')}
                />
              </div>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={addProject}>
          <Plus size={16} />
          {t('projects.addProject')}
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <p><strong>Project Tips:</strong></p>
        <ul style={{ marginLeft: '1rem', color: '#666' }}>
          <li>Include both personal and professional projects</li>
          <li>Focus on projects that demonstrate relevant skills</li>
          <li>Quantify impact when possible (users, performance improvements, etc.)</li>
          <li>Include links to live demos or source code</li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectsForm
