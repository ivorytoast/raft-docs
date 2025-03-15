function FIXFieldReference({ tag, name, description, validValues = [], required = false }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold text-blue-600">Tag {tag}</span>
          <span className="text-lg font-medium text-gray-800">{name}</span>
          {required && (
            <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Required
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600">{description}</p>

      {validValues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Valid Values:</h4>
          <div className="grid grid-cols-2 gap-2">
            {validValues.map(({ value, meaning }) => (
              <div key={value} className="flex items-start space-x-2 text-sm">
                <span className="font-mono text-blue-600">{value}</span>
                <span className="text-gray-600">- {meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FIXFieldReference 