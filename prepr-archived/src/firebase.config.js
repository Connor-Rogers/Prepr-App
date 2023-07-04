import firebase from 'firebase/app';
import {  getAuth, onAuthStateChanged  } from "firebase/auth"
import { useState, useEffect, useContext, createContext } from 'react'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAkOx4_LFkgaJKtq-0wVZJzrbuJ2zsnNAA",
    authDomain: "prepr-391015.firebaseapp.com",
    projectId: "prepr-391015",
    storageBucket: "prepr-391015.appspot.com",
    messagingSenderId: "911878656087",
    appId: "1:911878656087:web:e758cc85e88fb1090dd312",
    measurementId: "G-H7CXJ4PBVN"
});


export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}