
import { createContext } from 'react'
import useFetch from './hooks/use-fetch'
import { getCurrentUser } from './db/apiAuth'
import { useEffect } from 'react'
import { useContext } from 'react'

const UrlContext = createContext()

// eslint-disable-next-line react/prop-types
const UrlProvider = ({children}) => {
  const { data: user, loading, fn: fetchUser} = useFetch(getCurrentUser)
  const isAuthenticated = user?.role === 'authenticated'

  useEffect(() => {
    fetchUser()
  }, [])

  return <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>{children}</UrlContext.Provider>
}
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider 