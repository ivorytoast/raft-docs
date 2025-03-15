import ReactMarkdown from 'react-markdown'
import DiffText from '../DiffText'
import TemplateText from '../TemplateText'
import CodeBlock from '../CodeBlock'

function GettingStarted() {
  const markdown = `
# Getting Started Guide

Welcome to our documentation! This guide will help you get started with our platform.

## Quick Setup
1. Install dependencies
2. Configure your environment
3. Start building!

### Code Example
\`\`\`javascript
const setup = async () => {
  await installDeps()
  const config = loadConfig()
  startServer(config)
}
\`\`\`

## Next Steps
- Read the API documentation
- Try the examples
- Join our community
  `

  const originalText = `LOGON 1 2 3`
  const modifiedText = `LOGON 1 2 3 4
LOGON 2`
  const diffDescription = `This example shows how the LOGON command has been modified:
1. Added an extra parameter (4) to the first LOGON command
2. Added a new LOGON command with a single parameter`

  const templateText = `LOGON {USERNAME} {PASSWORD}
CONNECT {SENDER_COMPUTER_ID} {TARGET_COMPUTER_ID}
START_PROCESS`

  const codeExample = `
function example() {
  const x = 42
  console.log('Hello, world!')
  return x
}
  `.trim()

  return (
    <div className="max-w-4xl text-gray-800">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <DiffText
        text={diffDescription}
        originalText={originalText}
        modifiedText={modifiedText}
      />
      <div className="mt-8">
        <TemplateText text={templateText} />
      </div>
      <CodeBlock
        code={codeExample}
        language="javascript"
        title="Example Function"
      />
    </div>
  )
}

export default GettingStarted 