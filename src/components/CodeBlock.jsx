import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

function CodeBlock({ code, language = 'text', title = '' }) {
  const [isCopied, setIsCopied] = useState(false)

  // Validate language prop
  const validLanguage = ['text', 'java'].includes(language) ? language : 'text'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Header with title and copy button */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {title && (
            <span className="text-sm font-medium text-gray-600">
              {title}
            </span>
          )}
          <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">
            {validLanguage === 'text' ? 'Plain Text' : 'Java'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-white text-gray-600 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <Highlight theme={themes.github} code={code.trim()} language={validLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-x-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {/* Optional line numbers */}
                <span className="inline-block w-8 text-gray-400 select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock 