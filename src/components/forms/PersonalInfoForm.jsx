import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Camera, Upload } from 'lucide-react'
import { useCV } from '../../context/CVContext'
import RichTextEditor from '../RichTextEditor'

function PersonalInfoForm() {
  const { t } = useTranslation()
  const { cv, dispatch, actions } = useCV()
  const fileInputRef = useRef(null)

  const handleInputChange = (field, value) => {
    dispatch({
      type: actions.UPDATE_PERSONAL_INFO,
      payload: { [field]: value }
    })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        dispatch({
          type: actions.SET_PROFILE_IMAGE,
          payload: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="personal-info-form">
      <h3>{t('personalInfo.title')}</h3>
      
      {/* Profile Image Upload */}
      <div className="form-group">
        <label>{t('personalInfo.profileImage')}</label>
        <div 
          className="image-upload"
          onClick={() => fileInputRef.current?.click()}
        >
          {cv.personalInfo.profileImage ? (
            <img 
              src={cv.personalInfo.profileImage} 
              alt="Profile" 
              className="image-preview"
            />
          ) : (
            <div>
              <Camera size={32} />
              <p>{t('personalInfo.uploadImage')}</p>
              <small>{t('personalInfo.imageLimit')}</small>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Basic Information */}
      <div className="form-group">
        <label>{t('personalInfo.fullName')} *</label>
        <input
          type="text"
          value={cv.personalInfo.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder={t('personalInfo.placeholders.fullName')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.email')} *</label>
        <input
          type="email"
          value={cv.personalInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder={t('personalInfo.placeholders.email')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.phone')}</label>
        <input
          type="tel"
          value={cv.personalInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder={t('personalInfo.placeholders.phone')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.location')}</label>
        <input
          type="text"
          value={cv.personalInfo.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder={t('personalInfo.placeholders.location')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.website')}</label>
        <input
          type="url"
          value={cv.personalInfo.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder={t('personalInfo.placeholders.website')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.linkedin')}</label>
        <input
          type="url"
          value={cv.personalInfo.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder={t('personalInfo.placeholders.linkedin')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.github')}</label>
        <input
          type="url"
          value={cv.personalInfo.github}
          onChange={(e) => handleInputChange('github', e.target.value)}
          placeholder={t('personalInfo.placeholders.github')}
        />
      </div>

      <div className="form-group">
        <label>{t('personalInfo.summary')}</label>
        <RichTextEditor
          value={cv.personalInfo.summary}
          onChange={(value) => handleInputChange('summary', value)}
          placeholder={t('personalInfo.summaryPlaceholder')}
        />
      </div>
    </div>
  )
}

export default PersonalInfoForm
