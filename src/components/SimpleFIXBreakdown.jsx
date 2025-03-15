import { useState } from 'react'
import { useFIXDictionary } from '../utils/fixDictionary'

function SimpleFIXBreakdown() {
  const [message, setMessage] = useState('')
  const [fields, setFields] = useState([])
  const [copiedField, setCopiedField] = useState(null)
  const { dictionary, loading, error } = useFIXDictionary()

  const enrichFieldInfo = (tag, value) => {
    if (!dictionary) return { tag, value, name: 'Loading...', type: 'Unknown' }

    const fieldInfo = dictionary.fields[tag]
    return {
      tag,
      value,
      name: fieldInfo?.name || 'Unknown',
      type: fieldInfo?.type || 'STRING',
    }
  }

  const parseFixMessage = (msg) => {
    if (!msg.trim()) return []
    
    const fields = msg.split('|').filter(field => field.trim())
    
    return fields
      .map(field => {
        const [tag, ...valueParts] = field.split('=')
        const value = valueParts.join('=')
        if (!tag || value === undefined) return null
        return enrichFieldInfo(tag.trim(), value.trim())
      })
      .filter(Boolean)
  }

  const handleMessageChange = (e) => {
    const newMessage = e.target.value
    setMessage(newMessage)
    
    if (newMessage.trim()) {
      const parsedFields = parseFixMessage(newMessage)
      setFields(parsedFields)
    } else {
      setFields([])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === '|') {
      e.preventDefault()
      const cursorPosition = e.target.selectionStart
      const newValue = message.slice(0, cursorPosition) + '|' + message.slice(cursorPosition)
      setMessage(newValue)
      setFields(parseFixMessage(newValue))
      
      setTimeout(() => {
        e.target.selectionRange(cursorPosition + 1, cursorPosition + 1)
      }, 0)
    }
  }

  const handleCopyField = async (field) => {
    await navigator.clipboard.writeText(`${field.tag}=${field.value}`)
    setCopiedField(field.tag)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (loading) return <div>Loading FIX dictionary...</div>
  if (error) return <div>Error loading FIX dictionary: {error.message}</div>

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">FIX Message Breakdown</h1>
        <p className="text-gray-600 mb-8">
          Enter a FIX message to see its fields and values.
        </p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Input Section */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter FIX Message
        </label>
        <textarea
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your FIX message here (use | as field delimiter)..."
          className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded font-mono 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-white text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Fields Table */}
      <div className="p-4">
        {fields.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {fields.map((field, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-blue-600">
                    {field.tag}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {field.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {field.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 font-mono">
                    {field.value}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleCopyField(field)}
                      className="bg-white px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                      title="Copy field"
                    >
                      {copiedField === field.tag ? (
                        <span className="text-green-600 text-xs">Copied!</span>
                      ) : (
                        <span className="text-gray-600 text-xs">Copy</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            Enter a FIX message above to see its breakdown
          </p>
        )}
      </div>
    </div>
    </div>
  )
}

export default SimpleFIXBreakdown 