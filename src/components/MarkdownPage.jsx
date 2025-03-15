import ReactMarkdown from 'react-markdown'

function MarkdownPage() {
  const markdown = `
# Welcome to My Markdown Page

This is a paragraph with **bold** and *italic* text.

## Features
- Easy to use
- Supports standard markdown
- React integration

\`\`\`js
// You can even include code blocks
const hello = "world";
console.log(hello);
\`\`\`
  `

  return (
    <div className="max-w-4xl text-gray-800">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default MarkdownPage 