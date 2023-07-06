import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from './firebase'
import './App.css';

export const Home = () => {
  const { user } = useAuthState()

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Welcome {user?.email}</h1>
        <button className="submit-button" onClick={() => signOut(getAuth())}>Sign out</button>
      </div>
    </div>
  )
}
