import FIXMessageBreakdown from '../FIXMessageBreakdown'

function FIXExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">FIX Message Breakdown</h1>
        <p className="text-gray-600 mb-8">
          Enter a FIX message to see its fields and values.
        </p>
      </div>

      <FIXMessageBreakdown />
    </div>
  )
}

export default FIXExamples 