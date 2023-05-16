import { createContext, useContext } from 'react';
export const GlobalContext = createContext({
  isMobile:false,
  })
  export const useGlobalContext = () => useContext(GlobalContext)