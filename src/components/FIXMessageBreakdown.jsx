import { useState, useEffect, useRef } from 'react'
import { useCredentials } from '../context/CredentialsContext'
import { useFIXDictionary } from '../utils/fixDictionary'

function FIXMessageBreakdown() {
  const [message, setMessage] = useState('')
  const [fields, setFields] = useState([])
  const [copiedField, setCopiedField] = useState(null)
  const { dictionary, loading, error } = useFIXDictionary()

  // Get credentials from context
  const { 
    selectedUserCreds,
    selectedSenderId,
    selectedTargetId 
  } = useCredentials()

  const [hoveredField, setHoveredField] = useState(null)
  const tooltipRef = useRef(null)

  // Generate template for a message type
  const generateTemplate = (msgType) => {
    if (!dictionary || !dictionary.messages[msgType]) return ''

    const msgFields = []

    // Add all fields with empty values by default
    msgFields.push('8=FIX.4.4')  // Set BeginString to FIX.4.4
    msgFields.push('35=' + msgType)  // Keep MsgType as it's selected from dropdown
    msgFields.push('49={SENDERCOMPID}')  // SenderCompID
    msgFields.push('56={TARGETCOMPID}')  // TargetCompID
    msgFields.push('52=')  // Leave SendingTime blank

    // Add message-specific fields
    const messageElement = dictionary.messages[msgType].element

    messageElement.querySelectorAll('field').forEach(field => {
      const fieldName = field.getAttribute('name')
      const fieldDef = Object.entries(dictionary.fields).find(([_, f]) => f.name === fieldName)?.[0]
      if (fieldDef) {
        // Add placeholders for username and password fields
        if (fieldName === 'Username') {
          msgFields.push(fieldDef + '={USERNAME}')
        } else if (fieldName === 'Password') {
          msgFields.push(fieldDef + '={PASSWORD}')
        } else {
          msgFields.push(fieldDef + '=')  // Empty value by default
        }
      }
    })

    // Add trailer field
    msgFields.push('10=')

    return msgFields.join('|')
  }

  const handleTemplateChange = (e) => {
    const msgType = e.target.value
    if (msgType) {
      const newMessage = generateTemplate(msgType)
      setMessage(newMessage)
      const parsedFields = parseFixMessage(newMessage)
      
      // Apply credentials immediately if available
      const fieldsWithCreds = parsedFields.map(field => {
        const fieldInfo = dictionary.fields[field.tag]
        if (!fieldInfo) return field

        switch(fieldInfo.name) {
          case 'Username':
            if (selectedUserCreds?.username && field.value === '{USERNAME}') {
              return enrichFieldInfo(field.tag, selectedUserCreds.username)
            }
            break
          case 'Password':
            if (selectedUserCreds?.password && field.value === '{PASSWORD}') {
              return enrichFieldInfo(field.tag, selectedUserCreds.password)
            }
            break
          case 'SenderCompID':
            if (selectedSenderId && field.value === '{SENDERCOMPID}') {
              return enrichFieldInfo(field.tag, selectedSenderId)
            }
            break
          case 'TargetCompID':
            if (selectedTargetId && field.value === '{TARGETCOMPID}') {
              return enrichFieldInfo(field.tag, selectedTargetId)
            }
            break
        }
        return field
      })

      setFields(fieldsWithCreds)
    }
  }

  const enrichFieldInfo = (tag, value) => {
    if (!dictionary) return { tag, value, name: 'Loading...', type: 'Unknown' }

    const fieldInfo = dictionary.fields[tag]
    const msgType = fields.find(f => f.tag === '35')?.value
    
    let required = false
    let isValid = true
    let error = null

    if (fieldInfo) {
      // Check if field is required by looking at the XML elements
      if (msgType && dictionary.messages[msgType]) {
        const messageElement = dictionary.messages[msgType].element
        const fieldElement = messageElement.querySelector(`field[name="${fieldInfo.name}"]`)
        if (fieldElement) {
          required = fieldElement.getAttribute('required') === 'Y'
        }
      }

      // Check header fields
      if (!required && dictionary.headerElement) {
        const headerField = dictionary.headerElement.querySelector(`field[name="${fieldInfo.name}"]`)
        if (headerField) {
          required = headerField.getAttribute('required') === 'Y'
        }
      }

      // Check trailer fields
      if (!required && dictionary.trailerElement) {
        const trailerField = dictionary.trailerElement.querySelector(`field[name="${fieldInfo.name}"]`)
        if (trailerField) {
          required = trailerField.getAttribute('required') === 'Y'
        }
      }

      // Validate field value based on type
      switch (fieldInfo.type) {
        case 'INT':
          isValid = /^\d+$/.test(value)
          error = isValid ? null : 'Must be an integer'
          break
        case 'PRICE':
          isValid = /^\d*\.?\d*$/.test(value)
          error = isValid ? null : 'Must be a valid price'
          break
        case 'QTY':
          isValid = /^\d+$/.test(value)
          error = isValid ? null : 'Must be a valid quantity'
          break
        case 'BOOLEAN':
          isValid = ['Y', 'N'].includes(value)
          error = isValid ? null : 'Must be Y or N'
          break
        case 'UTCTIMESTAMP':
          isValid = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}:\d{2}/.test(value)
          error = isValid ? null : 'Invalid timestamp format'
          break
      }
    }

    return {
      tag,
      value,
      name: fieldInfo?.name || 'Unknown',
      type: fieldInfo?.type || 'STRING',
      required,
      isValid,
      error
    }
  }

  // Update parseFixMessage to use enrichFieldInfo
  const parseFixMessage = (msg) => {
    if (!msg.trim()) return []
    
    // Split on pipe character and filter out empty entries
    const fields = msg.split('|').filter(field => field.trim())
    
    return fields
      .map(field => {
        const [tag, ...valueParts] = field.split('=')
        // Join value parts back together in case value contained '='
        const value = valueParts.join('=')
        if (!tag || value === undefined) return null
        return enrichFieldInfo(tag.trim(), value.trim())
      })
      .filter(Boolean)
  }

  const handleMessageChange = (e) => {
    const newMessage = e.target.value
    setMessage(newMessage)
    
    // Only parse if there's actual content
    if (newMessage.trim()) {
      const parsedFields = parseFixMessage(newMessage)
      setFields(parsedFields)
    } else {
      setFields([])
    }
  }

  const handleCopyField = async (field) => {
    await navigator.clipboard.writeText(`${field.tag}=${field.value}`)
    setCopiedField(field.tag)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleFieldValueChange = (tag, newValue) => {
    const newFields = fields.map(field => {
      if (field.tag === tag) {
        // Check if this is a Username or Password field
        if (field.name === 'Username' && newValue === '{USERNAME}' && selectedUserCreds?.username) {
          return enrichFieldInfo(tag, selectedUserCreds.username)
        }
        if (field.name === 'Password' && newValue === '{PASSWORD}' && selectedUserCreds?.password) {
          return enrichFieldInfo(tag, selectedUserCreds.password)
        }
        // Check for sender/target IDs
        if (field.name === 'SenderCompID' && newValue === '{SENDERCOMPID}' && selectedSenderId) {
          return enrichFieldInfo(tag, selectedSenderId)
        }
        if (field.name === 'TargetCompID' && newValue === '{TARGETCOMPID}' && selectedTargetId) {
          return enrichFieldInfo(tag, selectedTargetId)
        }
        return enrichFieldInfo(tag, newValue)
      }
      return field
    })
    
    const newMessage = newFields
      .map(field => `${field.tag}=${field.value}`)
      .join('|')
    
    setMessage(newMessage)
    setFields(newFields)
  }

  // Update the handleDeleteField function
  const handleDeleteField = (tagToDelete) => {
    const newFields = fields.filter(field => field.tag !== tagToDelete)
    
    // Reapply credentials to remaining fields
    const fieldsWithCreds = newFields.map(field => {
      const fieldInfo = dictionary.fields[field.tag]
      if (!fieldInfo) return field

      switch(fieldInfo.name) {
        case 'Username':
          if (selectedUserCreds?.username && field.value === '{USERNAME}') {
            return enrichFieldInfo(field.tag, selectedUserCreds.username)
          }
          break
        case 'Password':
          if (selectedUserCreds?.password && field.value === '{PASSWORD}') {
            return enrichFieldInfo(field.tag, selectedUserCreds.password)
          }
          break
        case 'SenderCompID':
          if (selectedSenderId && field.value === '{SENDERCOMPID}') {
            return enrichFieldInfo(field.tag, selectedSenderId)
          }
          break
        case 'TargetCompID':
          if (selectedTargetId && field.value === '{TARGETCOMPID}') {
            return enrichFieldInfo(field.tag, selectedTargetId)
          }
          break
      }
      return field
    })
    
    setFields(fieldsWithCreds)
    
    // Update the message string to remove the deleted field
    const newMessage = fieldsWithCreds
      .map(field => `${field.tag}=${field.value}`)
      .join('|')
    setMessage(newMessage)
  }

  // Update the useEffect to handle credential changes and include dictionary
  useEffect(() => {
    if (fields.length > 0 && dictionary) {
      const newFields = fields.map(field => {
        const fieldInfo = dictionary.fields[field.tag]
        if (!fieldInfo) return field

        // Check for specific fields and apply credentials
        switch(fieldInfo.name) {
          case 'Username':
            if (selectedUserCreds?.username && field.value === '{USERNAME}') {
              return enrichFieldInfo(field.tag, selectedUserCreds.username)
            }
            break
          case 'Password':
            if (selectedUserCreds?.password && field.value === '{PASSWORD}') {
              return enrichFieldInfo(field.tag, selectedUserCreds.password)
            }
            break
          case 'SenderCompID':
            if (selectedSenderId && field.value === '{SENDERCOMPID}') {
              return enrichFieldInfo(field.tag, selectedSenderId)
            }
            break
          case 'TargetCompID':
            if (selectedTargetId && field.value === '{TARGETCOMPID}') {
              return enrichFieldInfo(field.tag, selectedTargetId)
            }
            break
        }
        return field
      })

      const newMessage = newFields
        .map(field => `${field.tag}=${field.value}`)
        .join('|')
      
      setMessage(newMessage)
      setFields(newFields)
    }
  }, [selectedUserCreds, selectedSenderId, selectedTargetId, dictionary, enrichFieldInfo])

  // Add this helper function to get tooltip content
  const getTooltipContent = (field) => {
    const parts = []
    
    if (field.group) {
      parts.push(`Group: ${field.group.name}`)
      if (field.name === field.group.counter) {
        parts.push('This field counts the number of repetitions in the group')
      }
      parts.push(`Required: ${field.group.required ? 'Yes' : 'No'}`)
    }

    if (field.component) {
      parts.push(`Component: ${field.component.name}`)
      parts.push(`Required: ${field.component.required ? 'Yes' : 'No'}`)
    }

    if (field.type) {
      parts.push(`Type: ${field.type}`)
    }

    return parts.join('\n')
  }

  // Update the getRowStyle function for more prominent grouping
  const getRowStyle = (field, index) => {
    const styles = ['hover:bg-gray-50']
    
    if (field.group) {
      // Start of group
      if (fields[index - 1]?.group?.name !== field.group.name) {
        styles.push('border-t-4 border-t-blue-300 mt-2') // Made border thicker and added margin
      }
      // During group
      styles.push('border-l-8 border-l-blue-300 bg-blue-50') // Made border thicker and added background
      // End of group
      if (fields[index + 1]?.group?.name !== field.group.name) {
        styles.push('border-b-4 border-b-blue-300 mb-2') // Made border thicker and added margin
      }
    }

    if (field.component) {
      styles.push('bg-purple-100') // Made background more visible
    }

    // If it's a group counter field
    if (field.group?.isCounter) {
      styles.push('bg-yellow-50 font-semibold') // Highlight counter fields
    }

    return styles.join(' ')
  }

  const handleKeyDown = (e) => {
    if (e.key === '|') {
      e.preventDefault()
      const cursorPosition = e.target.selectionStart
      const newValue = message.slice(0, cursorPosition) + '|' + message.slice(cursorPosition)
      setMessage(newValue)
      setFields(parseFixMessage(newValue))
      
      // Set cursor position after the inserted character
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
      }, 0)
    }
  }

  if (loading) {
    return <div>Loading FIX dictionary...</div>
  }

  if (error) {
    return <div>Error loading FIX dictionary: {error.message}</div>
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Template Selection */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message Template
        </label>
        <select
          onChange={handleTemplateChange}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-white text-gray-900"
        >
          <option value="">Select a template...</option>
          {dictionary && Object.entries(dictionary.messages).map(([msgType, info]) => (
            <option key={msgType} value={msgType}>
              {info.name} ({msgType})
            </option>
          ))}
        </select>
      </div>

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

      {/* Updated Fields Table */}
      <div className="p-4">
        {fields.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Error</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-20">Action</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase w-20">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {fields.map((field, index) => (
                <tr 
                  key={index} 
                  className={getRowStyle(field, index)}
                  onMouseEnter={() => setHoveredField(field)}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <td className="px-4 py-2 text-sm font-medium text-blue-600 relative group">
                    {field.tag}
                    {hoveredField === field && (
                      <div 
                        className="absolute z-50 left-0 top-full mt-2 p-3 bg-gray-900 text-white 
                                 text-xs rounded shadow-lg whitespace-pre-line min-w-[200px]"
                        ref={tooltipRef}
                      >
                        <div className="font-semibold mb-1">Field Details</div>
                        {getTooltipContent(field)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {field.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {field.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 font-mono">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleFieldValueChange(field.tag, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded font-mono
                               bg-white text-gray-900 placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span className={field.required ? 'text-red-600' : 'text-gray-400'}>
                      {field.required ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600">
                    {field.error}
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
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDeleteField(field.tag)}
                      disabled={field.required}
                      className={`px-2 py-1 rounded border ${
                        field.required
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-red-300 text-red-600 hover:bg-red-50'
                      }`}
                      title={field.required ? "Required fields cannot be deleted" : "Delete field"}
                    >
                      <span className="text-xs">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            Create a FIX message from a template!
          </p>
        )}
      </div>
    </div>
  )
}

export default FIXMessageBreakdown 