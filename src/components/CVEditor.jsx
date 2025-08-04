import React from 'react'
import { useTranslation } from 'react-i18next'
import { User, Briefcase, GraduationCap, Code, FolderOpen, Award } from 'lucide-react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import ExperienceForm from './forms/ExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import ProjectsForm from './forms/ProjectsForm'
import CertificationsForm from './forms/CertificationsForm'

function CVEditor({ activeTab, setActiveTab }) {
  const { t } = useTranslation()
  
  const tabs = [
    { id: 'personal', name: t('tabs.personal'), icon: User, component: PersonalInfoForm },
    { id: 'experience', name: t('tabs.experience'), icon: Briefcase, component: ExperienceForm },
    { id: 'education', name: t('tabs.education'), icon: GraduationCap, component: EducationForm },
    { id: 'skills', name: t('tabs.skills'), icon: Code, component: SkillsForm },
    { id: 'projects', name: t('tabs.projects'), icon: FolderOpen, component: ProjectsForm },
    { id: 'certifications', name: t('tabs.certifications'), icon: Award, component: CertificationsForm }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PersonalInfoForm

  return (
    <div className="cv-editor">
      <div className="editor-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          )
        })}
      </div>
      
      <div className="editor-content">
        <ActiveComponent />
      </div>
    </div>
  )
}

export default CVEditor
