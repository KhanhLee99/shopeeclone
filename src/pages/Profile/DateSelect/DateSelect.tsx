import { useEffect, useState } from 'react'
import range from 'lodash/range'
import { useTranslation } from 'react-i18next'

import { DATE_DEFAULT } from '../Profile'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const { t } = useTranslation()
  const [date, setDate] = useState({
    date: DATE_DEFAULT.getDate(),
    month: DATE_DEFAULT.getMonth(),
    year: DATE_DEFAULT.getFullYear()
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('date of birth')}</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getDate() || date.date}
          >
            <option disabled>{t('day')}</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getMonth() || date.month}
          >
            <option disabled>{t('month')}</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getFullYear() || date.year}
          >
            <option disabled>{t('year')}</option>
            {range(1950, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
