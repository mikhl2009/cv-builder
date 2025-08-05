import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useTranslation } from 'react-i18next'
import { sv, enUS } from 'date-fns/locale'

const MonthYearPicker = ({ 
  value, 
  onChange, 
  placeholder, 
  disabled = false,
  minDate = null,
  maxDate = null 
}) => {
  const { i18n } = useTranslation()

  // Convert string value (YYYY-MM) to Date object
  const dateValue = value ? new Date(value + '-01') : null

  // Handle date change and convert back to YYYY-MM format
  const handleDateChange = (date) => {
    if (date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      onChange(`${year}-${month}`)
    } else {
      onChange('')
    }
  }

  // Get locale from i18n
  const locale = i18n.language === 'sv' ? sv : enUS

  return (
    <div className="month-year-picker">
      <DatePicker
        selected={dateValue}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        autoComplete="off"
        className="month-year-input"
        popperClassName="month-year-popper"
        calendarClassName="month-year-calendar"
        showDisabledMonthNavigation
      />
    </div>
  )
}

export default MonthYearPicker
