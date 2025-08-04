import React from 'react'
import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const { t } = useTranslation()

  return (
    <header className="header">
      <div>
        <h1>
          <FileText size={32} style={{ display: 'inline', marginRight: '0.5rem' }} />
          {t('header.title')}
        </h1>
        <p>{t('header.subtitle')}</p>
      </div>
      <LanguageSwitcher />
    </header>
  )
}

export default Header
