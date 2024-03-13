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
  isCartShake: boolean
  setCartShake: React.Dispatch<React.SetStateAction<boolean>>
}

export const getInitialValue: () => AppContextInterface = () => {
  return {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    extendedPurchase: [],
    setExtendedPurchase: () => null,
    reset: () => null,
    language: getLanguageFromLS(),
    isCartShake: false,
    setCartShake: () => null
  }
}

const initialValue: AppContextInterface = getInitialValue()

export const AppContext = createContext<AppContextInterface>(initialValue)

export const AppProvider = ({
  children,
  defaultValue = initialValue
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const { i18n } = useTranslation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchase)
  const [isCartShake, setCartShake] = useState<boolean>(defaultValue.isCartShake)

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
        reset,
        isCartShake,
        setCartShake
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
