import React from 'react'
import TemplateText from '../TemplateText'

function FunctionsVariables() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Functions and Variables Guide</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#named-blocks" className="text-blue-600 hover:text-blue-800">
              1. Named Blocks
            </a>
          </li>
          <li>
            <a href="#block-chaining" className="text-blue-600 hover:text-blue-800">
              2. Block Chaining
            </a>
          </li>
          <li>
            <a href="#variables" className="text-blue-600 hover:text-blue-800">
              3. Variables and Constraints
            </a>
          </li>
          <li>
            <a href="#live-variables" className="text-blue-600 hover:text-blue-800">
              4. Live Variables
            </a>
          </li>
          <li>
            <a href="#standard-library" className="text-blue-600 hover:text-blue-800">
              5. Standard Library
            </a>
          </li>
        </ul>
      </div>

      <section id="named-blocks" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          Named Blocks
        </h2>
        <p className="mb-4">
          Blocks of text starting with "@" are treated as "named" blocks. The commands inside a block are executed in order.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Simple block example"
            text={`@simple_block
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Basic block structure with logon/logoff commands
          </p>
        </div>
      </section>

      <section id="block-chaining" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Block Chaining
        </h2>
        <p className="mb-4">
          A block can contain either commands to run directly or "calls" to other blocks loaded into RAFT.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Chaining blocks example"
            text={`@block_that_calls_other_blocks
raft_docs_simple_block`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Executes the commands defined in <span className="bg-purple-100 px-1 rounded">raft_docs_simple_block</span>
          </p>
        </div>
      </section>

      <section id="variables" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Variables and Constraints
        </h2>
        <p className="mb-4">
          Variables can be defined in block headers using different formats:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><span className="bg-purple-100 px-1 rounded">$name</span> - Simple variable</li>
          <li><span className="bg-purple-100 px-1 rounded">$name=defaultValue</span> - Variable with default</li>
          <li><span className="bg-purple-100 px-1 rounded">$name=defaultValue:{'<constraint>'}</span> - Variable with constraint</li>
        </ul>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Block with arguments definition"
            text={`@block_with_variables
$alias
$password=p
$sender=helloworld:<string>
$target=BGC:<string:BGC>`}
          />
          <p className="mt-2 text-sm text-gray-600">
            The last line requires <span className="bg-purple-100 px-1 rounded">$target</span> to exactly match "BGC"
          </p>
        </div>
      </section>

      <section id="live-variables" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</span>
          Live Variables
        </h2>
        <p className="mb-4">
          Variables can be captured from live messages and reused in subsequent commands.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Basic Variable Capture:</h4>
          <TemplateText
            description="Live variables simple example"
            text={`@live_variables_simple_example
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=TSTMKT|263=1 -d | -F 320
FIX_CAPTURE {USERNAME} 320 LIVEVARSIMPLE -o true
FIX_ACK {USERNAME} -p [35=y 320=LOAD_VAR({USERNAME},LIVEVARSIMPLE) 893=Y]
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Captures field 320 into variable LIVEVARSIMPLE and uses it in subsequent ACK
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Advanced Variable Capture:</h4>
          <TemplateText
            description="Live variables advanced example"
            text={`FIX_CAPTURE {USERNAME} 320 LIVEVARADVANCED -o true -n 0`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <span className="bg-purple-100 px-1 rounded">-n</span> flag specifies which occurrence to capture (0-indexed)
            <br />
            <span className="bg-purple-100 px-1 rounded">-M true</span> can be used to capture all values
          </p>
        </div>
      </section>

      <section id="standard-library" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">5</span>
          Standard Library
        </h2>
        <p className="mb-4">
          Common functions are defined inside the standard library for reuse across scripts.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Standard library example"
            text={`@standard_library_example
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
SECURITY_LIST_REQUEST_SINGLE_SYMBOL $alias={USERNAME}
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Uses the predefined <span className="bg-purple-100 px-1 rounded">SECURITY_LIST_REQUEST_SINGLE_SYMBOL</span> function
          </p>
        </div>
      </section>
    </div>
  )
}

export default FunctionsVariables 