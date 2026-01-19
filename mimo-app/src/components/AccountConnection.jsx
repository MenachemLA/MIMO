import { useState } from 'react'
import './AccountConnection.css'

const accountTypes = [
  { id: 'checking', name: 'Checking Account', icon: '🏦' },
  { id: 'savings', name: 'Savings Account', icon: '💰' },
  { id: 'credit', name: 'Credit Card', icon: '💳' },
  { id: 'debit', name: 'Debit Card', icon: '💳' },
  { id: 'brokerage', name: 'Brokerage Account', icon: '📈' },
  { id: 'retirement', name: 'Retirement Account', icon: '🏛️' },
]

const financialInstitutions = [
  { id: 'chase', name: 'Chase', logo: '🏦', color: '#117ACA' },
  { id: 'bofa', name: 'Bank of America', logo: '🏛️', color: '#E31837' },
  { id: 'wells', name: 'Wells Fargo', logo: '🏪', color: '#D71E28' },
  { id: 'citi', name: 'Citi', logo: '🏢', color: '#003B6F' },
  { id: 'capital', name: 'Capital One', logo: '💼', color: '#004879' },
  { id: 'amex', name: 'American Express', logo: '💳', color: '#006FCF' },
  { id: 'discover', name: 'Discover', logo: '🔍', color: '#FF6000' },
  { id: 'usbank', name: 'U.S. Bank', logo: '🏦', color: '#0B3968' },
  { id: 'pnc', name: 'PNC Bank', logo: '🏢', color: '#F47216' },
  { id: 'td', name: 'TD Bank', logo: '🏦', color: '#00A94F' },
  { id: 'fidelity', name: 'Fidelity Investments', logo: '📊', color: '#00A758' },
  { id: 'schwab', name: 'Charles Schwab', logo: '📈', color: '#00A0DF' },
  { id: 'vanguard', name: 'Vanguard', logo: '⚓', color: '#C41E3D' },
  { id: 'robinhood', name: 'Robinhood', logo: '🦅', color: '#00C805' },
  { id: 'etrade', name: 'E*TRADE', logo: '💹', color: '#6633CC' },
]

function AccountConnection({ onComplete, userEmail }) {
  const [screen, setScreen] = useState('select-type') // select-type, select-institution, connect-bank
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [currentAccountType, setCurrentAccountType] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInstitution, setSelectedInstitution] = useState(null)
  const [bankUsername, setBankUsername] = useState('')
  const [bankPassword, setBankPassword] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSelectAccountType = (type) => {
    setCurrentAccountType(type)
    setScreen('select-institution')
    setSearchQuery('')
  }

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution)
    setScreen('connect-bank')
  }

  const handleBankConnect = (e) => {
    e.preventDefault()
    setIsConnecting(true)

    // Simulate bank connection
    setTimeout(() => {
      const newAccount = {
        id: Date.now(),
        type: currentAccountType,
        institution: selectedInstitution,
        name: `${selectedInstitution.name} ${currentAccountType.name}`,
        lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
        balance: Math.floor(Math.random() * 50000) + 1000,
      }
      setSelectedAccounts([...selectedAccounts, newAccount])

      // Reset form
      setBankUsername('')
      setBankPassword('')
      setIsConnecting(false)
      setScreen('select-type')
      setCurrentAccountType(null)
      setSelectedInstitution(null)
    }, 2000)
  }

  const handleBack = () => {
    if (screen === 'connect-bank') {
      setScreen('select-institution')
      setSelectedInstitution(null)
      setBankUsername('')
      setBankPassword('')
    } else if (screen === 'select-institution') {
      setScreen('select-type')
      setCurrentAccountType(null)
      setSearchQuery('')
    }
  }

  const handleContinue = () => {
    if (selectedAccounts.length > 0) {
      onComplete(selectedAccounts)
    }
  }

  const handleRemoveAccount = (id) => {
    setSelectedAccounts(selectedAccounts.filter(acc => acc.id !== id))
  }

  const filteredInstitutions = financialInstitutions.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="account-connection-container">
      {isConnecting && (
        <div className="oauth-modal">
          <div className="oauth-modal-content">
            <div className="oauth-spinner"></div>
            <p>Connecting to {selectedInstitution.name}...</p>
            <p className="connecting-subtext">Securely linking your account</p>
          </div>
        </div>
      )}

      <div className="account-connection-card">
        <div className="header">
          {screen !== 'select-type' && (
            <button className="back-btn" onClick={handleBack}>
              ← Back
            </button>
          )}
          <h1>
            {screen === 'select-type' && 'Connect Your Accounts'}
            {screen === 'select-institution' && `Select Your ${currentAccountType?.name} Provider`}
            {screen === 'connect-bank' && `Connect to ${selectedInstitution?.name}`}
          </h1>
          <p>
            {screen === 'select-type' && 'Link your financial accounts to track your finances'}
            {screen === 'select-institution' && 'Search for your financial institution'}
            {screen === 'connect-bank' && 'Enter your credentials to connect'}
          </p>
          <span className="user-email">{userEmail}</span>
        </div>

        {screen === 'select-type' && (
          <>
            <div className="account-types-grid">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  className="account-type-btn"
                  onClick={() => handleSelectAccountType(type)}
                >
                  <span className="icon">{type.icon}</span>
                  <span className="name">{type.name}</span>
                </button>
              ))}
            </div>

            {selectedAccounts.length > 0 && (
              <div className="connected-accounts">
                <h3>Connected Accounts ({selectedAccounts.length})</h3>
                <div className="account-list">
                  {selectedAccounts.map((account) => (
                    <div key={account.id} className="account-item">
                      <div className="account-info">
                        <span className="institution-logo">{account.institution.logo}</span>
                        <div>
                          <div className="account-name">{account.name}</div>
                          <div className="account-details">
                            •••• {account.lastFour}
                          </div>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveAccount(account.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedAccounts.length > 0 && (
              <button className="btn-continue" onClick={handleContinue}>
                Continue to Dashboard
              </button>
            )}
          </>
        )}

        {screen === 'select-institution' && (
          <div className="institution-selection">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for your bank or institution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="institution-search"
                autoFocus
              />
            </div>

            <div className="institutions-list">
              {filteredInstitutions.map((institution) => (
                <button
                  key={institution.id}
                  className="institution-btn"
                  onClick={() => handleSelectInstitution(institution)}
                >
                  <span className="institution-logo">{institution.logo}</span>
                  <span className="institution-name">{institution.name}</span>
                  <span className="institution-arrow">→</span>
                </button>
              ))}
              {filteredInstitutions.length === 0 && (
                <div className="no-results">
                  <p>No institutions found</p>
                  <p className="no-results-hint">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === 'connect-bank' && (
          <form className="bank-connect-form" onSubmit={handleBankConnect}>
            <div className="bank-header">
              <span className="bank-logo-large">{selectedInstitution.logo}</span>
              <h2>{selectedInstitution.name}</h2>
              <p className="security-notice">🔒 Your credentials are encrypted and secure</p>
            </div>

            <div className="input-group">
              <label htmlFor="bankUsername">Username or Email</label>
              <input
                type="text"
                id="bankUsername"
                value={bankUsername}
                onChange={(e) => setBankUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="bankPassword">Password</label>
              <input
                type="password"
                id="bankPassword"
                value={bankPassword}
                onChange={(e) => setBankPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-connect">
              Connect Account
            </button>

            <p className="terms-notice">
              By connecting, you agree to MIMO's Terms of Service and Privacy Policy
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default AccountConnection
