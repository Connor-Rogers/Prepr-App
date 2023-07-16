import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBzW1xGFOO-54z0mYcYQXZHsefJTmP9oRM",
  authDomain: "prepr-391015.firebaseapp.com",
  databaseURL: "https://prepr-391015-default-rtdb.firebaseio.com",
  projectId: "prepr-391015",
  storageBucket: "prepr-391015.appspot.com",
  messagingSenderId: "911878656087",
  appId: "1:911878656087:web:31a1354b3baba25b0dd312",
  measurementId: "G-WMQ5CSK5ZT"
})


export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), authUser => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    }, setError)

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}
