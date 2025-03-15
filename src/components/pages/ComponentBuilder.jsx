import { useState } from 'react'
import { useFIXDictionary } from '../../utils/fixDictionary'
import FIXComponentBuilder from '../FIXComponentBuilder'

function ComponentBuilder() {
  const [selectedComponent, setSelectedComponent] = useState('')
  const { dictionary, loading } = useFIXDictionary()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          FIX Component Builder
        </h1>
        <p className="text-gray-600 mb-6">
          Select a component to generate its fields and build a FIX component message.
        </p>
      </div>

      {/* Component Selection */}
      <div className="w-full max-w-xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Component
        </label>
        <select
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-white text-gray-900"
        >
          <option value="">Choose a component...</option>
          {dictionary && Object.keys(dictionary.components || {}).map(componentName => (
            <option key={componentName} value={componentName}>
              {componentName}
            </option>
          ))}
        </select>
      </div>

      {/* Component Builder */}
      {selectedComponent && (
        <FIXComponentBuilder 
          componentName={selectedComponent}
          onFieldsGenerated={(fields) => {
            console.log('Generated fields:', fields)
          }}
        />
      )}
    </div>
  )
}

export default ComponentBuilder 