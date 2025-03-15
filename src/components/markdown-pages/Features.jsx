import ReactMarkdown from 'react-markdown'

function Features() {
  const markdown = `
# Feature Overview

## Core Features
- **Markdown Support**: Full markdown syntax support
- **React Integration**: Seamless integration with React components
- **Interactive Examples**: Live code examples and demos

## Advanced Features
| Feature | Status | Description |
|---------|--------|-------------|
| Markdown | ✅ | Full markdown support |
| Components | ✅ | React component integration |
| Code Highlighting | ✅ | Syntax highlighting |

### Coming Soon
- Real-time collaboration
- Custom themes
- Extended plugin system
  `

  return (
    <div className="max-w-4xl text-gray-800">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default Features 