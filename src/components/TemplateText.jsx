import React from 'react'
import { useCredentials } from '../context/CredentialsContext'

function TemplateText({ description, text }) {
  const { 
    selectedUserCreds,
    selectedSenderId,
    selectedTargetId 
  } = useCredentials()

  const replaceCredentials = (text) => {
    let result = text

    // Replace credentials if they exist
    if (selectedUserCreds?.username) {
      result = result.replaceAll('{USERNAME}', selectedUserCreds.username)
    }
    if (selectedUserCreds?.password) {
      result = result.replaceAll('{PASSWORD}', selectedUserCreds.password)
    }
    if (selectedSenderId) {
      result = result.replaceAll('{SENDER_COMPUTER_ID}', selectedSenderId)
    }
    if (selectedTargetId) {
      result = result.replaceAll('{TARGET_COMP_ID}', selectedTargetId)
    }

    return result
  }

  const processedText = replaceCredentials(text)

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {description && (
        <div className="text-sm font-medium text-gray-700 mb-2">
          {description}
        </div>
      )}
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900">
        {processedText}
      </pre>
    </div>
  )
}

export default TemplateText 