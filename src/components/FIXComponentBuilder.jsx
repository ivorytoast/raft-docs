import { useState, useEffect } from 'react'
import { useCredentials } from '../context/CredentialsContext'
import { useFIXDictionary } from '../utils/fixDictionary'

function FIXComponentBuilder({ componentName, onFieldsGenerated }) {
  const [fields, setFields] = useState([])
  const [copiedField, setCopiedField] = useState(null)
  const [fixMessage, setFixMessage] = useState('')
  const { dictionary, loading, error } = useFIXDictionary()

  const enrichFieldInfo = (tag, value) => {
    if (!dictionary) return { tag, value, name: 'Loading...', type: 'Unknown' }

    const fieldInfo = dictionary.fields[tag]
    
    let required = false
    let isValid = true
    let error = null

    if (fieldInfo && dictionary.components[componentName]) {
      // Check if field is required in this component
      const componentField = dictionary.components[componentName].fields[fieldInfo.name]
      if (componentField) {
        required = componentField.required === 'Y'
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

  // Load fields automatically when component is selected
  useEffect(() => {
    if (dictionary?.components[componentName]) {
      const componentElement = dictionary.components[componentName].element
      const newFields = []

      componentElement.querySelectorAll('field').forEach(field => {
        const fieldName = field.getAttribute('name')
        const fieldDef = Object.entries(dictionary.fields).find(([_, f]) => f.name === fieldName)?.[0]
        if (fieldDef) {
          newFields.push(enrichFieldInfo(fieldDef, '')) // Initialize with empty values
        }
      })

      setFields(newFields)
      if (onFieldsGenerated) {
        onFieldsGenerated(newFields)
      }
    }
  }, [componentName, dictionary])

  const generateFixMessage = () => {
    // Check for required fields that are empty
    const emptyRequiredFields = fields.filter(field => 
      field.required && field.value.trim() === ''
    )

    // Include fields that either have values or are required
    const relevantFields = fields.filter(field => 
      field.value.trim() !== '' || field.required
    )

    if (relevantFields.length === 0) {
      setFixMessage('No fields to generate')
      return
    }

    const message = relevantFields
      .map(field => {
        // If field has a value, use it
        if (field.value.trim() !== '') {
          return `${field.tag}=${field.value}`
        }
        // If field is required but empty, use placeholder
        if (field.required) {
          return `${field.tag}={${field.name.toUpperCase()}}`
        }
        return null
      })
      .filter(Boolean)
      .join('|')
    
    setFixMessage(message)

    // Add warning for empty required fields
    if (emptyRequiredFields.length > 0) {
      const warningMessage = `Warning: Required fields missing values: ${
        emptyRequiredFields.map(f => f.name).join(', ')
      }`
      setFixMessage(prev => `${prev}\n${warningMessage}`)
    }
  }

  const handleFieldValueChange = (tag, newValue) => {
    const newFields = fields.map(field => 
      field.tag === tag ? enrichFieldInfo(tag, newValue) : field
    )
    setFields(newFields)
    if (onFieldsGenerated) {
      onFieldsGenerated(newFields)
    }
  }

  const handleCopyField = async (field) => {
    await navigator.clipboard.writeText(`${field.tag}=${field.value}`)
    setCopiedField(field.tag)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (loading) {
    return <div>Loading component definition...</div>
  }

  if (error) {
    return <div>Error loading component definition: {error.message}</div>
  }

  if (!dictionary?.components[componentName]) {
    return <div>Component {componentName} not found</div>
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {componentName} Component
          </h3>
          <button
            onClick={generateFixMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate FIX Message
          </button>
        </div>
      </div>

      {/* Show generated FIX message if exists */}
      {fixMessage && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated FIX Message
          </label>
          <div className="flex flex-col gap-2">
            <textarea
              value={fixMessage}
              readOnly
              rows={fixMessage.includes('\n') ? 3 : 1}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded font-mono text-sm
                       text-gray-900"
            />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(fixMessage)
                // Maybe add a copied indicator
              }}
              className="self-end px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        {fields.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Error</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            No fields found for this component
          </p>
        )}
      </div>
    </div>
  )
}

export default FIXComponentBuilder 