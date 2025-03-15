import React from 'react'
import { Link } from 'react-router-dom'
import TemplateText from '../TemplateText'

function HomePage() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">RAFT Documentation</h1>

      <section>
        <p className="mb-4 text-gray-900">
          RAFT is a FIX testing tool designed to help users create and execute FIX test cases. This documentation will help you get started with using RAFT.
        </p>
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          The documentation is organized into several sections:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-900">
          <li><Link to="/getting-started" className="text-blue-600 hover:text-blue-800">Getting Started</Link> - Basic introduction to RAFT</li>
          <li><Link to="/pattern-match" className="text-blue-600 hover:text-blue-800">Pattern Match</Link> - How to match FIX messages</li>
          <li><Link to="/control-flow" className="text-blue-600 hover:text-blue-800">Control Flow</Link> - How to control test execution flow</li>
          <li><Link to="/logon-logoff" className="text-blue-600 hover:text-blue-800">Logon & Logoff</Link> - How to connect to FIX sessions</li>
          <li><Link to="/functions-variables" className="text-blue-600 hover:text-blue-800">Functions & Variables</Link> - How to use functions and variables</li>
          <li><Link to="/send-ack" className="text-blue-600 hover:text-blue-800">Send & Ack</Link> - How to send and verify FIX messages</li>
          <li><Link to="/fix-examples" className="text-blue-600 hover:text-blue-800">FIX Message Breakdown</Link> - Interactive FIX message viewer</li>
          <li><Link to="/components" className="text-blue-600 hover:text-blue-800">FIX Component Builder</Link> - Tool to build FIX components</li>
        </ul>
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Use the navigation menu on the left to explore the different sections of the documentation.
        </p>
      </section>
    </div>
  )
}

export default HomePage 