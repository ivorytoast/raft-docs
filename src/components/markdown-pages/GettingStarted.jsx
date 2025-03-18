import React from 'react'
import { Link } from 'react-router-dom'
import TemplateText from '../TemplateText'

function GettingStarted() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Reliable & Automated Framework for Testing (RAFT)</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#what-is-raft" className="text-blue-600 hover:text-blue-800">
              1. What is RAFT?
            </a>
          </li>
          <li>
            <a href="#raft-scripts" className="text-blue-600 hover:text-blue-800">
              2. Understanding RAFT Scripts
            </a>
          </li>
          <li>
            <a href="#creating-scripts" className="text-blue-600 hover:text-blue-800">
              3. Creating Your First Script
            </a>
          </li>
        </ul>
      </div>

      <section id="what-is-raft" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          What is RAFT?
        </h2>
        <p className="mb-6">
          RAFT (Reliable and Automated Framework for Testing) is a specialized testing framework built for FIX APIs 
          in enterprise environments. Unlike traditional FIX testing tools that often require complex programming knowledge,
          RAFT provides a simple, text-based approach while maintaining powerful testing capabilities.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Testing Flexibility</h3>
            <p className="text-gray-600 mb-2">
              RAFT goes beyond simple message sending and receiving, offering sophisticated testing capabilities:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
              <li>
                <strong>Advanced Pattern Matching:</strong> Match specific fields, wildcards, or complex patterns in FIX messages.
                For example, verify order acknowledgments contain the correct order ID while ignoring timestamp fields.
              </li>
              <li>
                <strong>Conditional Logic:</strong> Create dynamic tests using IF, OR, and NOT statements. 
                Tests can branch based on message content, making it possible to handle different market conditions 
                or error scenarios.
              </li>
              <li>
                <strong>Variable System:</strong> Capture and reuse data from FIX messages. Store order IDs, prices, 
                or any field value to use later in the test, enabling complex trading scenarios and verification steps.
              </li>
              <li>
                <strong>Multi-Message Handling:</strong> Process multiple messages simultaneously, essential for testing 
                market data feeds or complex trading workflows where order updates generate multiple messages.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Code Reusability</h3>
            <p className="text-gray-600 mb-2">
              RAFT's block system transforms test writing from repetitive scripting to efficient, modular development:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
              <li>
                <strong>Standard Library:</strong> Access pre-built blocks for common FIX operations. For example, use 
                standardized blocks for market data subscription across different asset classes without duplicating code.
              </li>
              <li>
                <strong>Block Chaining:</strong> Combine blocks to create complex test scenarios. Chain order entry, 
                modification, and cancellation blocks to test complete trading workflows.
              </li>
              <li>
                <strong>Parameterized Testing:</strong> Create one block that can test multiple scenarios by passing 
                different parameters. Test the same order flow with different quantities, prices, or instruments.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Environment Management</h3>
            <p className="text-gray-600 mb-2">
              RAFT simplifies the complexity of testing across multiple environments:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
              <li>
                <strong>Multi-Environment Testing:</strong> Run the same test across development and QA environments 
                simultaneously. Identify environment-specific issues by comparing test results across all non-production environments.
              </li>
              <li>
                <strong>Credential Management:</strong> Handle hundreds of login credentials without embedding them in test scripts.
                Use aliases to reference credentials, making tests portable across environments.
              </li>
              <li>
                <strong>Parallel Testing:</strong> Test the same scenario with different users simultaneously. Run critical path 
                tests with multiple users to verify system behavior under various conditions.
              </li>
              <li>
                <strong>Environment Tracking:</strong> Monitor how system behavior changes across environments over time.
                Identify regressions or inconsistencies between environments automatically.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="raft-scripts" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Understanding RAFT Scripts
        </h2>
        <p className="mb-6">
          A RAFT script is a text file in the <span className="bg-purple-100 px-1 rounded">resources/scripts</span> folder 
          that contains a series of actions for testing FIX functionality. Scripts are designed to be simple to create 
          and maintain, requiring only basic text editing capabilities.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Script Structure</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Actions are separated by newlines</li>
              <li>Empty lines are ignored</li>
              <li>Comments start with # and are ignored during execution</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Built-in Actions</h3>
            <p className="text-gray-600">
              RAFT provides common actions like FIX_LOGON FIX_SEND or even PRINT to handle typical testing actions. These 
              built-in actions simplify the process of logging in, sending messages, acknowledging responses, and 
              logging off.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold mb-2 text-gray-700">Example Script:</h4>
            <TemplateText
              description=""
              text={`@MY_NEW_SCRIPT
# This is a comment
PRINT hi!

# Call the script
MY_NEW_SCRIPT`}
            />
          </div>
        </div>
      </section>

      <section id="creating-scripts" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Creating Your First Script
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-3">Step 1: Create the File</h3>
            <p>Create a new file in the <span className="bg-purple-100 px-1 rounded">resources/scripts</span> folder. You can also create a new folder to organize your scripts.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 2: Define a Block</h3>
            <p>Add <span className="bg-purple-100 px-1 rounded">@MY_NEW_SCRIPT</span> at the top of your file. This creates a "Raft Block" - similar to a function in programming or a reusable recipe.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 3: Add Actions</h3>
            <p>Add actions under your block name. For example: <span className="bg-purple-100 px-1 rounded">PRINT hi!</span></p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Step 4: Call the Block</h3>
            <p>At the end of the file, add <span className="bg-purple-100 px-1 rounded">MY_NEW_SCRIPT</span> to run the block.</p>
          </div>
        </div>
      </section>

      <section id="more-info" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-8">
        <h2 className="text-2xl font-bold mb-4">For More Information</h2>
        <p className="mb-4">
          For detailed information about specific topics, please visit:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/logon-logoff" className="text-blue-600 hover:text-blue-800">Logon & Logoff Guide</Link> - Learn about FIX session management</li>
            <li><Link to="/send-ack" className="text-blue-600 hover:text-blue-800">Send & Ack Guide</Link> - Learn about sending and acknowledging FIX messages</li>
            <li><Link to="/functions-variables" className="text-blue-600 hover:text-blue-800">Functions & Variables Guide</Link> - Learn about functions and variables in RAFT</li>
            <li><Link to="/pattern-match" className="text-blue-600 hover:text-blue-800">Pattern Matching Guide</Link> - Learn how to match FIX messages</li>
            <li><Link to="/control-flow" className="text-blue-600 hover:text-blue-800">Control Flow Guide</Link> - Learn about control flow in RAFT</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default GettingStarted 