import { useState, createContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Langs } from 'src/i18n/i18n'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'
import { getLanguageFromLS } from 'src/utils/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  language?: Langs
}

const initialValue: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null,
  language: getLanguageFromLS()
}

export const AppContext = createContext<AppContextInterface>(initialValue)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialValue.profile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialValue.extendedPurchase)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchase([])
    setProfile(null)
  }

  useEffect(() => {
    const loadLanguage = async (lang: Langs) => {
      await i18n.changeLanguage(lang)
    }
    loadLanguage(initialValue.language || 'vi')
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchase,
        setExtendedPurchase,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
