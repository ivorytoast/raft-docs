import { createContext, useContext, useState, useEffect } from 'react'

const CredentialsContext = createContext()

export function CredentialsProvider({ children }) {
  const [userCreds, setUserCreds] = useState(() => {
    // Load saved credentials from localStorage
    const saved = localStorage.getItem('userCreds')
    return saved ? JSON.parse(saved) : []
  })

  const [selectedUserCreds, setSelectedUserCreds] = useState(() => {
    // Load saved selected credentials from localStorage
    const saved = localStorage.getItem('selectedUserCreds')
    return saved ? JSON.parse(saved) : null
  })

  const [selectedSenderId, setSelectedSenderId] = useState(() => {
    return localStorage.getItem('selectedSenderId') || ''
  })

  const [selectedTargetId, setSelectedTargetId] = useState(() => {
    return localStorage.getItem('selectedTargetId') || ''
  })

  // Save credentials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userCreds', JSON.stringify(userCreds))
  }, [userCreds])

  useEffect(() => {
    localStorage.setItem('selectedUserCreds', JSON.stringify(selectedUserCreds))
  }, [selectedUserCreds])

  useEffect(() => {
    localStorage.setItem('selectedSenderId', selectedSenderId)
  }, [selectedSenderId])

  useEffect(() => {
    localStorage.setItem('selectedTargetId', selectedTargetId)
  }, [selectedTargetId])

  const addUserCreds = (username, password) => {
    setUserCreds([...userCreds, { username, password }])
  }

  const removeUserCreds = (username) => {
    setUserCreds(userCreds.filter(cred => cred.username !== username))
    if (selectedUserCreds?.username === username) {
      setSelectedUserCreds(null)
    }
  }

  return (
    <CredentialsContext.Provider value={{
      userCreds,
      addUserCreds,
      removeUserCreds,
      selectedUserCreds,
      setSelectedUserCreds,
      selectedSenderId,
      setSelectedSenderId,
      selectedTargetId,
      setSelectedTargetId
    }}>
      {children}
    </CredentialsContext.Provider>
  )
}

export function useCredentials() {
  return useContext(CredentialsContext)
} 