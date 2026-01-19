import { useState, useEffect } from 'react'
import './Dashboard.css'

// Sample data generator for demo purposes
const generateTransactionData = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const incomeCategories = [
    { name: 'Salary', amount: 6500, icon: '💼' },
    { name: 'Freelance', amount: 1200, icon: '💻' },
    { name: 'Investments', amount: 450, icon: '📈' },
    { name: 'Other Income', amount: 150, icon: '💰' },
  ]

  const expenseCategories = [
    { name: 'Housing', amount: 2000, icon: '🏠' },
    { name: 'Transportation', amount: 450, icon: '🚗' },
    { name: 'Food & Dining', amount: 680, icon: '🍽️' },
    { name: 'Utilities', amount: 280, icon: '💡' },
    { name: 'Healthcare', amount: 320, icon: '🏥' },
    { name: 'Entertainment', amount: 240, icon: '🎬' },
    { name: 'Shopping', amount: 520, icon: '🛍️' },
    { name: 'Insurance', amount: 380, icon: '🛡️' },
    { name: 'Subscriptions', amount: 95, icon: '📱' },
    { name: 'Other Expenses', amount: 175, icon: '📦' },
  ]

  return { currentMonth, incomeCategories, expenseCategories }
}

function Dashboard({ connectedAccounts, userEmail, onSignOut }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Simulate data loading
    const transactionData = generateTransactionData()
    setData(transactionData)
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const totalIncome = data.incomeCategories.reduce((sum, cat) => sum + cat.amount, 0)
  const totalExpenses = data.expenseCategories.reduce((sum, cat) => sum + cat.amount, 0)
  const netIncome = totalIncome - totalExpenses

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">MIMO</h1>
            <p className="dashboard-subtitle">{data.currentMonth}</p>
          </div>
          <div className="header-actions">
            <span className="user-email">{userEmail}</span>
            <button className="btn-signout" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="accounts-summary">
          <h3>Connected Accounts</h3>
          <div className="accounts-grid">
            {connectedAccounts.map((account) => (
              <div key={account.id} className="account-card">
                <div className="account-card-header">
                  <span className="account-card-name">{account.name}</span>
                  <span className="account-card-type">{account.type.name}</span>
                </div>
                <div className="account-card-balance">
                  {formatCurrency(account.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pl-statement">
          <h2 className="pl-title">Profit & Loss Statement</h2>

          <div className="pl-section income-section">
            <div className="section-header">
              <h3>Income</h3>
              <div className="section-total positive">{formatCurrency(totalIncome)}</div>
            </div>
            <div className="category-list">
              {data.incomeCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </div>
                  <div className="category-amount positive">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pl-section expense-section">
            <div className="section-header">
              <h3>Expenses</h3>
              <div className="section-total negative">{formatCurrency(totalExpenses)}</div>
            </div>
            <div className="category-list">
              {data.expenseCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </div>
                  <div className="category-amount negative">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pl-footer">
            <div className="net-income">
              <span className="net-label">Net Income</span>
              <span className={`net-amount ${netIncome >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(netIncome)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
