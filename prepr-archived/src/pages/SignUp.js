import { useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import './App.css';
export const SignUp = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
      alert(e.message)
    }
  }, [])

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="email" type="email" className="input-field" />
          <input name="password" placeholder="password" type="password" className="input-field" />
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  )
}