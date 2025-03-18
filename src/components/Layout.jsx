import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useCredentials } from '../context/CredentialsContext'

function Layout() {
  const {
    userCreds,
    addUserCreds,
    removeUserCreds,
    selectedUserCreds,
    setSelectedUserCreds,
    selectedSenderId,
    setSelectedSenderId,
    selectedTargetId,
    setSelectedTargetId
  } = useCredentials()

  // State for new credential inputs
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newSenderId, setNewSenderId] = useState('')
  const [newTargetId, setNewTargetId] = useState('')

  // Get stored sender/target IDs
  const senderIds = JSON.parse(localStorage.getItem('senderComputerIds') || '[]')
  const targetIds = JSON.parse(localStorage.getItem('targetComputerIds') || '[]')

  const handleAddCredentials = (e) => {
    e.preventDefault()
    if (newUsername && newPassword) {
      addUserCreds(newUsername, newPassword)
      setNewUsername('')
      setNewPassword('')
    }
  }

  const handleAddSenderId = (e) => {
    e.preventDefault()
    if (newSenderId) {
      const updatedIds = [...senderIds, newSenderId]
      localStorage.setItem('senderComputerIds', JSON.stringify(updatedIds))
      setNewSenderId('')
    }
  }

  const handleAddTargetId = (e) => {
    e.preventDefault()
    if (newTargetId) {
      const updatedIds = [...targetIds, newTargetId]
      localStorage.setItem('targetComputerIds', JSON.stringify(updatedIds))
      setNewTargetId('')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className="w-64 border-r border-gray-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">RAFT Docs</h2>
        
        {/* Welcome Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Welcome
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/getting-started" className="text-gray-600 hover:text-blue-600 font-medium">
                Getting Started
              </Link>
            </li>
            <li>
              <Link to="/script-reference" className="text-gray-600 hover:text-blue-600 font-medium">
                Script Breakdown
              </Link>
            </li>
          </ul>
        </div>

        {/* RAFT Fundamentals Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            RAFT Fundamentals
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/logon-logoff" className="text-gray-600 hover:text-blue-600 font-medium">
                Logon & Logoff
              </Link>
            </li>
            <li>
              <Link to="/send-ack" className="text-gray-600 hover:text-blue-600 font-medium">
                Send & Ack
              </Link>
            </li>
            <li>
              <Link to="/functions-variables" className="text-gray-600 hover:text-blue-600 font-medium">
                Functions & Variables
              </Link>
            </li>
            <li>
              <Link to="/pattern-match" className="text-gray-600 hover:text-blue-600 font-medium">
                Pattern Match
              </Link>
            </li>
            <li>
              <Link to="/control-flow" className="text-gray-600 hover:text-blue-600 font-medium">
                Control Flow
              </Link>
            </li>
          </ul>
        </div>

        {/* RAFT Reference Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            RAFT Reference
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/quick-reference" className="text-gray-600 hover:text-blue-600 font-medium">
                Quick Reference
              </Link>
            </li>
          </ul>
        </div>

        {/* FIX Utilities Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            FIX Utilities
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/fix-breakdown" className="text-gray-600 hover:text-blue-600 font-medium">
                FIX Message Breakdown
              </Link>
            </li>
            <li>
              <Link to="/fix-examples" className="text-gray-600 hover:text-blue-600 font-medium">
                FIX Template Builder
              </Link>
            </li>
            <li>
              <Link to="/components" className="text-gray-600 hover:text-blue-600 font-medium">
                FIX Component Builder
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
      
      <aside className="w-64 border-l border-gray-200 bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          <button
            onClick={() => {
              localStorage.removeItem('senderComputerIds')
              localStorage.removeItem('targetComputerIds')
              window.location.reload() // Refresh to clear the state
            }}
            className="px-2 py-1 text-xs rounded border border-gray-300 
                     bg-gray-50 text-gray-600 hover:bg-gray-100"
            title="Clear all Sender and Target Computer IDs"
          >
            Clear IDs
          </button>
        </div>
        
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Credentials</h3>
          
          {/* Add Credentials Form */}
          <form onSubmit={handleAddCredentials} className="space-y-2">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Username"
              className="w-full border border-gray-300 rounded px-3 py-2 
                       bg-white text-gray-900 placeholder-gray-400"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2
                       bg-white text-gray-900 placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Credentials
            </button>
          </form>

          {/* Credentials List */}
          <div className="space-y-2">
            {userCreds.map((cred, index) => (
              <div
                key={index}
                className={`p-3 rounded border cursor-pointer ${
                  selectedUserCreds?.username === cred.username
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedUserCreds(cred)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">{cred.username}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeUserCreds(cred.username)
                    }}
                    className="px-2 rounded-full bg-white border border-gray-200 
                             text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sender Computer ID Form */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Sender Computer ID</h3>
            <form onSubmit={handleAddSenderId} className="space-y-2 mt-2">
              <input
                type="text"
                value={newSenderId}
                onChange={(e) => setNewSenderId(e.target.value)}
                placeholder="New Sender ID"
                className="w-full border border-gray-300 rounded px-3 py-2
                         bg-white text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Sender ID
              </button>
            </form>
            <select
              value={selectedSenderId}
              onChange={(e) => setSelectedSenderId(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2
                       bg-white text-gray-900"
            >
              <option value="">Select sender ID</option>
              {senderIds.map((id, index) => (
                <option key={index} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          {/* Target Computer ID Form */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Target Computer ID</h3>
            <form onSubmit={handleAddTargetId} className="space-y-2 mt-2">
              <input
                type="text"
                value={newTargetId}
                onChange={(e) => setNewTargetId(e.target.value)}
                placeholder="New Target ID"
                className="w-full border border-gray-300 rounded px-3 py-2
                         bg-white text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Target ID
              </button>
            </form>
            <select
              value={selectedTargetId}
              onChange={(e) => setSelectedTargetId(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2
                       bg-white text-gray-900"
            >
              <option value="">Select target ID</option>
              {targetIds.map((id, index) => (
                <option key={index} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Layout 