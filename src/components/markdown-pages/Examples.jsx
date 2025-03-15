import ReactMarkdown from 'react-markdown'

function Examples() {
  const markdown = `
# Interactive Examples

## Basic Usage
Here's a simple example of how to use our components:

\`\`\`jsx
function Welcome() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to our documentation.</p>
    </div>
  )
}
\`\`\`

## Advanced Patterns
Learn about advanced patterns and best practices:

- Component composition
- State management
- Performance optimization

### Live Demo
(Interactive examples coming soon!)
  `

  return (
    <div className="max-w-4xl text-gray-800">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default Examples 