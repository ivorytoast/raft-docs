import { useState } from 'react'

function AddComputerIdModal({ onClose, onAdd, type }) {
  const [computerId, setComputerId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (computerId.trim()) {
      onAdd(computerId.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add {type} Computer ID</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Computer ID
            </label>
            <input
              type="text"
              value={computerId}
              onChange={(e) => setComputerId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add ID
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddComputerIdModal 