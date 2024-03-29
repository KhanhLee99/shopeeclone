import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import URLs from 'src/constants/url'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { getAvatarUrl, setLanguageToLS } from 'src/utils/utils'
import { Langs, locales } from 'src/i18n/i18n'

const languagues: { key: Langs; lang: string }[] = [
  {
    key: 'vi',
    lang: locales['vi']
  },
  {
    key: 'en',
    lang: locales['en']
  }
]

export default function NavHeader() {
  const { i18n, t } = useTranslation()
  const currentLanguage = locales[i18n.language as Langs]
  const queryClient = useQueryClient()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const [langActive, setLangActive] = useState<Langs>(i18n.language as Langs)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const changeLanguage = async (locale: Langs) => {
    await i18n.changeLanguage(locale)
    setLanguageToLS(locale)
  }

  return (
    <div className='flex justify-end'>
      <Popover
        classNameMotion='z-30'
        styleMotion={{ top: '33px' }}
        className='flex cursor-pointer items-center py-1 hover:text-white/70'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pl-3 pr-28'>
              {languagues.map((lang) => (
                <button
                  key={lang.key}
                  className={classNames('px-3 py-2 text-left hover:text-orange', {
                    'text-orange': langActive === lang.key
                  })}
                  onClick={() => changeLanguage(lang.key)}
                  onMouseEnter={() => setLangActive(lang.key)}
                  onMouseLeave={() => setLangActive(i18n.language as Langs)}
                >
                  {t(lang.key)}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>{currentLanguage}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          classNameMotion='z-30'
          styleMotion={{ top: '33px' }}
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={URLs.profile}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                {t('my account')}
              </Link>
              <Link
                to={URLs.historyPurchase}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                {t('my purchase')}
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                {t('logout')}
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={URLs.register} className='mx-3 capitalize hover:text-white/70'>
            {t('sign up')}
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={URLs.login} className='mx-3 capitalize hover:text-white/70'>
            {t('login')}
          </Link>
        </div>
      )}
    </div>
  )
}
