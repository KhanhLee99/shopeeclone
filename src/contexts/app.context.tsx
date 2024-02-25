import { useState, createContext } from 'react'

import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValue: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialValue)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
