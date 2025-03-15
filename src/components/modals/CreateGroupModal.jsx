import { useState } from 'react'

function CreateGroupModal({ onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('')
  const [users, setUsers] = useState([{ username: '', password: '' }])

  const handleAddUser = () => {
    setUsers([...users, { username: '', password: '' }])
  }

  const handleUserChange = (index, field, value) => {
    const newUsers = users.map((user, i) => {
      if (i === index) {
        return { ...user, [field]: value }
      }
      return user
    })
    setUsers(newUsers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newGroup = {
      name: groupName,
      users: users.filter(user => user.username && user.password),
      userCount: users.filter(user => user.username && user.password).length,
      createdAt: new Date().toISOString()
    }
    onCreateGroup(newGroup)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New User Group</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Users
            </label>
            {users.map((user, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) => handleUserChange(index, 'username', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => handleUserChange(index, 'password', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddUser}
            className="px-3 py-1 bg-white text-blue-500 hover:bg-gray-50 border border-blue-500 rounded font-medium transition-colors"
          >
            + Add Another User
          </button>

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
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroupModal 