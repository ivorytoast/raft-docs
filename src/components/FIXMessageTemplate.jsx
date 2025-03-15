function FIXMessageTemplate({ messageType, description, fields }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">{messageType}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <div className="p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.map((field) => (
              <tr key={field.tag} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm font-mono text-blue-600">{field.tag}</td>
                <td className="px-3 py-2 text-sm text-gray-800">{field.name}</td>
                <td className="px-3 py-2 text-sm">
                  {field.required ? (
                    <span className="text-red-600">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td className="px-3 py-2 text-sm text-gray-600">{field.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FIXMessageTemplate 