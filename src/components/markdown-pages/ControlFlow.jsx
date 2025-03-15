import React from 'react'
import TemplateText from '../TemplateText'

function ControlFlow() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Control Flow Guide</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#boolean-basics" className="text-blue-600 hover:text-blue-800">
              1. Boolean Operations Basics
            </a>
          </li>
          <li>
            <a href="#logical-operators" className="text-blue-600 hover:text-blue-800">
              2. Logical Operators
            </a>
          </li>
          <li>
            <a href="#conditional-flow" className="text-blue-600 hover:text-blue-800">
              3. Conditional Flow (IF/THEN/ELSE)
            </a>
          </li>
          <li>
            <a href="#loops" className="text-blue-600 hover:text-blue-800">
              4. Loops and Repetition
            </a>
          </li>
          <li>
            <a href="#advanced" className="text-blue-600 hover:text-blue-800">
              5. Advanced Control Flow
            </a>
          </li>
        </ul>
      </div>

      <section id="boolean-basics" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          Boolean Operations Basics
        </h2>
        <p className="mb-4">
          Every executed RAFT command can be interpreted as a Boolean value. For most operations -- like a 
          <span className="bg-purple-100 px-1 rounded">FIX_ACK</span>, for example -- the Boolean value is 
          simply true on success and false on failure.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Basic Boolean Commands:</h4>
          <TemplateText
            description="Basic boolean operations"
            text={`PRINT testing print succcess
TRUE`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <span className="bg-purple-100 px-1 rounded">PRINT</span> prints the line and returns true
            <br />
            <span className="bg-purple-100 px-1 rounded">TRUE</span> does nothing and returns true
          </p>
        </div>
      </section>

      <section id="logical-operators" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Logical Operators
        </h2>
        <p className="mb-4">
          RAFT supports <span className="bg-purple-100 px-1 rounded">OR</span> and 
          <span className="bg-purple-100 px-1 rounded">NOT</span> operations:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><span className="bg-purple-100 px-1 rounded">NOT []</span> - Takes one command and inverts the result</li>
          <li><span className="bg-purple-100 px-1 rounded">OR [] []</span> - Takes two commands and returns true if either is true</li>
          <li>Note: AND is implicit - multiple commands in sequence act as AND operations</li>
        </ul>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="OR and NOT operations"
            text={`TRUE
NOT [FALSE]
OR [FALSE] [fix_docs_baseline_logon_logoff]
NOT [NOT [ OR [FALSE] [fix_docs_baseline_logon_logoff ] ] ]`}
          />
          <p className="mt-2 text-sm text-gray-600">
            All lines above evaluate to true (assuming successful FIX connection)
          </p>
        </div>
      </section>

      <section id="conditional-flow" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Conditional Flow
        </h2>
        <p className="mb-4">
          The <span className="bg-purple-100 px-1 rounded">IF [] [] []</span> command (alternatively 
          <span className="bg-purple-100 px-1 rounded">IF [] THEN [] ELSE []</span>) provides conditional execution.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Basic IF/THEN/ELSE:</h4>
          <TemplateText
            description="IF THEN ELSE example"
            text={`IF [TRUE] [PRINT this is the true branch] [PRINT this the false branch]`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Empty blocks are allowed: <span className="bg-purple-100 px-1 rounded">IF [condition] THEN [success] ELSE []</span>
          </p>
        </div>
      </section>

      <section id="loops" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</span>
          Loops and Repetition
        </h2>
        <p className="mb-4">
          The <span className="bg-purple-100 px-1 rounded">REPEAT []</span> command with 
          <span className="bg-purple-100 px-1 rounded">-X</span> flag specifies iterations to perform.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="REPEAT command examples"
            text={`REPEAT [PRINT testing repeat] -X 5
REPEAT [FALSE] -X 5`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Note: REPEAT breaks on failure - remaining iterations are skipped if a command returns false
          </p>
        </div>
      </section>

      <section id="advanced" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">5</span>
          Advanced Control Flow
        </h2>
        <p className="mb-4">
          For complex nested operations, use <span className="bg-purple-100 px-1 rounded">SKIP_PREPROCESSOR []</span> 
          to avoid compilation complexity.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Benefits of SKIP_PREPROCESSOR:</h4>
          <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-gray-600">
            <li>Avoids preprocessor complexity with nested IF statements</li>
            <li>Evaluates commands at runtime instead of compile-time</li>
            <li>Trade-off: Less compile-time safety for better performance</li>
          </ul>

          <TemplateText
            description="SKIP_PREPROCESSOR example"
            text={`SKIP_PREPROCESSOR [IF [TRUE] [IF [TRUE] [PRINT nested true, skipped preprocessor] [PRINT nested false, skipped preprocessor]] [PRINT false, how did I get here!?]]`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Example of deeply nested IF statements that would be complex to preprocess
          </p>
        </div>
      </section>
    </div>
  )
}

export default ControlFlow 