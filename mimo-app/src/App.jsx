import { useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import AccountConnection from './components/AccountConnection'
import Dashboard from './components/Dashboard'

function App() {
  const [currentScreen, setCurrentScreen] = useState('auth') // auth, accounts, dashboard
  const [userEmail, setUserEmail] = useState('')
  const [connectedAccounts, setConnectedAccounts] = useState([])

  const handleAuthComplete = (email) => {
    setUserEmail(email)
    setCurrentScreen('accounts')
  }

  const handleAccountsComplete = (accounts) => {
    setConnectedAccounts(accounts)
    setCurrentScreen('dashboard')
  }

  const handleSignOut = () => {
    setCurrentScreen('auth')
    setUserEmail('')
    setConnectedAccounts([])
  }

  return (
    <div className="app">
      {currentScreen === 'auth' && (
        <Auth onComplete={handleAuthComplete} />
      )}
      {currentScreen === 'accounts' && (
        <AccountConnection onComplete={handleAccountsComplete} userEmail={userEmail} />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard
          connectedAccounts={connectedAccounts}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  )
}

export default App
