import React from 'react'
import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
  }

  return (
    <div className="language-switcher">
      <div className="language-dropdown">
        <button className="language-trigger">
          <Languages size={16} />
          <span>{languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}</span>
          <span>{languages.find(lang => lang.code === i18n.language)?.name || t('common.language')}</span>
        </button>
        <div className="language-options">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
              onClick={() => changeLanguage(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
