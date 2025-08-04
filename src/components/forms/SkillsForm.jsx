import React, { useState, useRef } from 'react'
import { Plus, X, Code } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import { useTranslation } from 'react-i18next'

// Move SkillSection outside to prevent recreation on every render
const SkillSection = ({ title, category, placeholder, newSkill, handleInputChange, handleKeyPress, addSkill, removeSkill, cv, t, inputRefs }) => (
  <div className="skills-section">
    <label>{title}</label>
    <div className="skills-input">
      <input
        ref={(el) => inputRefs.current[category] = el}
        type="text"
        value={newSkill[category]}
        onChange={(e) => handleInputChange(category, e.target.value)}
        onKeyPress={(e) => handleKeyPress(e, category)}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addSkill(category)}
        disabled={!newSkill[category].trim()}
      >
        <Plus size={16} />
      </button>
    </div>
    <div className="skills-list">
      {cv.skills[category].map((skill, index) => (
        <span key={index} className="skill-tag">
          {skill}
          <span
            className="remove"
            onClick={() => removeSkill(category, index)}
            title={t('skills.removeSkill')}
          >
            ×
          </span>
        </span>
      ))}
    </div>
  </div>
)

function SkillsForm() {
  const { cv, dispatch, actions } = useCV()
  const { t } = useTranslation()
  const [newSkill, setNewSkill] = useState({ technical: '', languages: '', soft: '' })
  const inputRefs = useRef({ technical: null, languages: null, soft: null })

  const addSkill = (category) => {
    if (newSkill[category].trim()) {
      const updatedSkills = {
        ...cv.skills,
        [category]: [...cv.skills[category], newSkill[category].trim()]
      }
      dispatch({
        type: actions.UPDATE_SKILLS,
        payload: updatedSkills
      })
      setNewSkill(prev => ({ ...prev, [category]: '' }))
      
      // Refocus the input field after adding the skill
      setTimeout(() => {
        if (inputRefs.current[category]) {
          inputRefs.current[category].focus()
        }
      }, 0)
    }
  }

  const removeSkill = (category, index) => {
    const updatedSkills = {
      ...cv.skills,
      [category]: cv.skills[category].filter((_, i) => i !== index)
    }
    dispatch({
      type: actions.UPDATE_SKILLS,
      payload: updatedSkills
    })
  }

  const handleInputChange = (category, value) => {
    setNewSkill(prev => ({ ...prev, [category]: value }))
  }

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(category)
    }
  }

  return (
    <div className="skills-form">
      <div className="section-header">
        <h3>
          <Code size={20} />
          {t('skills.title')}
        </h3>
      </div>

      <SkillSection
        title={t('skills.technical')}
        category="technical"
        placeholder={t('skills.placeholders.technical')}
        newSkill={newSkill}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        addSkill={addSkill}
        removeSkill={removeSkill}
        cv={cv}
        t={t}
        inputRefs={inputRefs}
      />

      <SkillSection
        title={t('skills.languages')}
        category="languages"
        placeholder={t('skills.placeholders.languages')}
        newSkill={newSkill}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        addSkill={addSkill}
        removeSkill={removeSkill}
        cv={cv}
        t={t}
        inputRefs={inputRefs}
      />

      <SkillSection
        title={t('skills.soft')}
        category="soft"
        placeholder={t('skills.placeholders.soft')}
        newSkill={newSkill}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        addSkill={addSkill}
        removeSkill={removeSkill}
        cv={cv}
        t={t}
        inputRefs={inputRefs}
      />

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <p><strong>{t('skills.tips.title')}</strong></p>
        <ul style={{ marginLeft: '1rem', color: '#666' }}>
          {t('skills.tips.items', { returnObjects: true }).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SkillsForm
