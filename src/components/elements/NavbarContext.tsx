import React, { createContext, ReactNode, useContext, useState } from 'react'

export interface NavbarContextValue {
  arrayFilter: any
  setArrayFilter: any
  isSearch: any
  setIsSearch: any
}

export interface NavbarContextProviderProps {
  children: ReactNode
}

export const NavbarContext = createContext({} as NavbarContextValue)

export const useNavbarContext = () => useContext(NavbarContext)

export const NavbarContextProvider: React.FC<NavbarContextProviderProps> = ({
  children,
}) => {
  const [arrayFilter, setArrayFilter] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const navbarContextValue = {
    arrayFilter,
    setArrayFilter,
    isSearch,
    setIsSearch,
  }

  return (
    <NavbarContext.Provider value={navbarContextValue}>
      {children}
    </NavbarContext.Provider>
  )
}
