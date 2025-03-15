import { useState, useMemo } from 'react'

function DiffText({ text = '', originalText = '', modifiedText = '' }) {
  const [showDiff, setShowDiff] = useState(true)

  const computeDiff = useMemo(() => {
    // Split by lines and normalize whitespace within each line
    const originalLines = originalText.trim().split('\n').map(line => line.trim())
    const modifiedLines = modifiedText.trim().split('\n').map(line => line.trim())
    
    const result = []
    let i = 0, j = 0
    
    while (i < originalLines.length || j < modifiedLines.length) {
      if (i >= originalLines.length) {
        // Rest of modified text is additions
        result.push({ type: 'addition', text: modifiedLines[j] })
        j++
      } else if (j >= modifiedLines.length) {
        // Rest of original text is deletions
        result.push({ type: 'deletion', text: originalLines[i] })
        i++
      } else if (originalLines[i] === modifiedLines[j]) {
        // Lines match
        result.push({ type: 'unchanged', text: originalLines[i] })
        i++
        j++
      } else {
        // Check if current line was modified or if it's a new line
        const originalTokens = originalLines[i].split(' ')
        const modifiedTokens = modifiedLines[j].split(' ')
        
        if (originalTokens[0] === modifiedTokens[0]) {
          // Same command, modified line
          result.push({ type: 'deletion', text: originalLines[i] })
          result.push({ type: 'addition', text: modifiedLines[j] })
          i++
          j++
        } else {
          // Different commands, treat as separate addition/deletion
          if (modifiedLines.includes(originalLines[i])) {
            result.push({ type: 'addition', text: modifiedLines[j] })
            j++
          } else {
            result.push({ type: 'deletion', text: originalLines[i] })
            i++
          }
        }
      }
    }
    
    return result
  }, [originalText, modifiedText])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
      {/* Diff Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Text Comparison</h3>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
        >
          {showDiff ? 'Show Original' : 'Show Diff'}
        </button>
      </div>

      {/* Description Section */}
      {text && (
        <div className="prose border-b border-gray-200 pb-4">
          <p className="text-gray-700">{text}</p>
        </div>
      )}

      {/* Diff Content */}
      <div className="font-mono text-sm">
        {showDiff ? (
          <div className="space-y-1">
            {computeDiff.map((part, index) => {
              const styles = {
                deletion: 'bg-red-100 text-red-800 block px-2 py-1',
                addition: 'bg-green-100 text-green-800 block px-2 py-1',
                unchanged: 'text-gray-800 block px-2 py-1'
              }
              
              return (
                <div key={index} className={styles[part.type]}>
                  {part.type === 'deletion' && '- '}
                  {part.type === 'addition' && '+ '}
                  {part.type === 'unchanged' && '  '}
                  {part.text}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-gray-800 whitespace-pre-wrap px-2">
            {originalText.trim()}
          </div>
        )}
      </div>
    </div>
  )
}

export default DiffText 