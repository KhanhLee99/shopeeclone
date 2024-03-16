import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import URLs from 'src/constants/url'
import { ShopeeLogo } from '../Icons'

export default function RegisterHeader() {
  const { t } = useTranslation()
  const registerMatch = useMatch(URLs.register)
  const isRegister = Boolean(registerMatch)

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={URLs.productList}>
            <ShopeeLogo />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? t('sign up') : t('login')}</div>
        </nav>
      </div>
    </header>
  )
}
