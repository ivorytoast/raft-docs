import { useMemo } from 'react'
import { useCredentials } from '../context/CredentialsContext'

function TemplateText({ text = '' }) {
  const { selectedUserCreds, selectedSenderId, selectedTargetId } = useCredentials()

  const processedText = useMemo(() => {
    let result = text
    result = result.replace(/{USERNAME}/g, selectedUserCreds.username)
    result = result.replace(/{PASSWORD}/g, selectedUserCreds.password)
    result = result.replace(/{SENDER_COMPUTER_ID}/g, selectedSenderId)
    result = result.replace(/{TARGET_COMPUTER_ID}/g, selectedTargetId)
    return result
  }, [text, selectedUserCreds, selectedSenderId, selectedTargetId])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="font-mono text-sm bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">
        {processedText}
      </div>
    </div>
  )
}

export default TemplateText 