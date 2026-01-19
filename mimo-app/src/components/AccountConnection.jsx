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

function AccountConnection({ onComplete, userEmail }) {
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentAccountType, setCurrentAccountType] = useState(null)
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  const handleSelectAccountType = (type) => {
    setCurrentAccountType(type)
    setShowForm(true)
  }

  const handleAddAccount = (e) => {
    e.preventDefault()
    const newAccount = {
      id: Date.now(),
      type: currentAccountType,
      name: accountName,
      lastFour: accountNumber.slice(-4),
      balance: Math.floor(Math.random() * 50000) + 1000, // Simulated balance
    }
    setSelectedAccounts([...selectedAccounts, newAccount])
    setAccountName('')
    setAccountNumber('')
    setShowForm(false)
    setCurrentAccountType(null)
  }

  const handleContinue = () => {
    if (selectedAccounts.length > 0) {
      onComplete(selectedAccounts)
    }
  }

  const handleRemoveAccount = (id) => {
    setSelectedAccounts(selectedAccounts.filter(acc => acc.id !== id))
  }

  return (
    <div className="account-connection-container">
      <div className="account-connection-card">
        <div className="header">
          <h1>Connect Your Accounts</h1>
          <p>Link your financial accounts to track your finances</p>
          <span className="user-email">{userEmail}</span>
        </div>

        {!showForm ? (
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
                        <span className="icon">{accountTypes.find(t => t.id === account.type.id).icon}</span>
                        <div>
                          <div className="account-name">{account.name}</div>
                          <div className="account-details">
                            {account.type.name} •••• {account.lastFour}
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
        ) : (
          <form className="account-form" onSubmit={handleAddAccount}>
            <h3>Add {currentAccountType.name}</h3>

            <div className="input-group">
              <label htmlFor="accountName">Account Nickname</label>
              <input
                type="text"
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="e.g., Main Checking, Chase Savings"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                required
              />
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setShowForm(false)
                  setAccountName('')
                  setAccountNumber('')
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Add Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AccountConnection
