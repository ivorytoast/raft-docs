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
            <a href="#overview" className="text-blue-600 hover:text-blue-800">
              1. FIX Testing Overview
            </a>
          </li>
          <li>
            <a href="#basic-script" className="text-blue-600 hover:text-blue-800">
              2. Basic Script Structure
            </a>
          </li>
          <li>
            <a href="#running-tests" className="text-blue-600 hover:text-blue-800">
              3. Running Tests
            </a>
          </li>
          <li>
            <a href="#advanced-script" className="text-blue-600 hover:text-blue-800">
              4. Advanced Script Structure
            </a>
            <ul className="pl-4 mt-2 space-y-1">
              <li>
                <a href="#script-breakdown" className="text-blue-600 hover:text-blue-800">
                  4.1 Script Breakdown
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#standard-library" className="text-blue-600 hover:text-blue-800">
              5. Standard Library
            </a>
          </li>
        </ul>
      </div>

      <section id="overview" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          FIX Testing Overview
        </h2>
        <p className="mb-4">
          RAFT provides a framework for testing FIX (Financial Information eXchange) messages. 
          This document outlines how to create and execute basic FIX scripts using RAFT.
        </p>
      </section>

      <section id="basic-script" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Basic Script Structure
        </h2>
        <p className="mb-4">
          A basic RAFT script consists of a series of commands that send and acknowledge FIX messages.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Basic Script Example:</h4>
          <TemplateText
            description="Basic script example"
            text={`FIX_SEND $alias 35=1|112=$message| -d |
FIX_ACK $alias -p 112=<string:$message>`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Simple example showing message sending and acknowledgment
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Key Components:</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Set Up the FIX Message:</strong> Use the <span className="bg-purple-100 px-1 rounded">FIX_SEND</span> command to construct and send a FIX message.</li>
            <li><strong>Acknowledge the Message:</strong> Use the <span className="bg-purple-100 px-1 rounded">FIX_ACK</span> command to acknowledge the receipt.</li>
          </ol>
        </div>
      </section>

      <section id="running-tests" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Running Tests
        </h2>
        <h3 className="text-xl font-semibold mb-3">How To Run The Test Using Intellij IDE</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Create a new 'Application' run configuration</li>
            <li>Set the main class to <span className="bg-purple-100 px-1 rounded">com.bgcgroup.fx.raft.RaftMain</span></li>
            <li>CLI Arguments:
              <ul className="list-disc pl-5 mt-2">
                <li>-l</li>
                <li>-d scripts/{'{folder}'}/{'{script_name}'}.txt</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <section id="advanced-script" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</span>
          Advanced Script Structure
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Advanced Script Example:</h4>
          <TemplateText
            description="Advanced script example"
            text={`@SECURITY_TEST_CHECK
$alias
$message=helloworld
FIX_SEND $alias 35=1|112=$message| -d |
FIX_ACK $alias -p 112=<string:$message>`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Example showing named blocks, variables, and pattern matching
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Script Components:</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Define the Alias</strong> (To be explained by Andrey)</li>
            <li><strong>Set Up the FIX Message:</strong> Use the <span className="bg-purple-100 px-1 rounded">FIX_SEND</span> command to construct and send a FIX message.</li>
            <li><strong>Acknowledge the Message:</strong> Use the <span className="bg-purple-100 px-1 rounded">FIX_ACK</span> command to acknowledge the receipt.</li>
            <li><strong>Execute the Script:</strong> Run the script to send the message and receive acknowledgment.</li>
          </ol>
        </div>

        <div id="script-breakdown" className="mt-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">4.1</span>Script Breakdown
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="py-1">
                <span className="bg-blue-100 pr-2 pl-1 py-1 rounded">@SECURITY_TEST_CHECK</span>
              </div>
              <p className="mt-2 text-gray-600">To be explained by Andrey</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="py-1">
                <span className="bg-blue-100 pr-2 pl-1 py-1 rounded">$alias</span>
              </div>
              <p className="mt-2 text-gray-600">To be explained by Andrey</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="py-1">
                <span className="bg-blue-100 pr-2 pl-1 py-1 rounded">$message=helloworld</span>
              </div>
              <p className="mt-2 text-gray-600">
                This line defines a variable <span className="bg-purple-100 px-1 rounded">$message</span> with the value 
                <span className="bg-purple-100 px-1 rounded">helloworld</span>. This variable can be used in the FIX message 
                to dynamically insert values. It is case-sensitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="available-commands" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4.2</span>
          Available Commands
        </h2>
        <p className="mb-4 italic">To be completed by Andrey with all commands</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Command</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">FIX_SEND</td>
                  <td className="px-6 py-4">Sends a FIX message to the specified session alias.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">FIX_ACK</td>
                  <td className="px-6 py-4">Acknowledges the receipt of a FIX message.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="standard-library" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">5</span>
          Standard Library
        </h2>
        <h3 className="text-xl font-semibold mb-3">Overview</h3>
        <p className="mb-4">
          Once users start to create multiple scripts, they will find that there are common patterns and functions that can be reused across different scripts.
          To facilitate this, RAFT provides a standard library of functions and commands that can be used in your scripts. This section outlines the available functions and how to use them effectively.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How To Define The Standard Library</h3>
        <p className="mb-4">
          Create a file called: <span className="bg-purple-100 px-1 rounded">stdlib.txt</span>
          <br />
          <em>(To be explained by Andrey if it has to be called this or can be called anything)</em>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How To Include The Standard Library</h3>
        <p className="mb-4 italic">To be explained by Andrey</p>
      </section>

      <section id="more-info" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">6</span>
          For More Information
        </h2>
        <p className="mb-4">
          For detailed information about specific topics, please visit:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/pattern-match" className="text-blue-600 hover:text-blue-800">Pattern Matching Guide</Link> - Learn how to match FIX messages</li>
            <li><Link to="/control-flow" className="text-blue-600 hover:text-blue-800">Control Flow Guide</Link> - Learn about control flow in RAFT</li>
            <li><Link to="/logon-logoff" className="text-blue-600 hover:text-blue-800">Logon & Logoff Guide</Link> - Learn about FIX session management</li>
            <li><Link to="/functions-variables" className="text-blue-600 hover:text-blue-800">Functions & Variables Guide</Link> - Learn about functions and variables in RAFT</li>
            <li><Link to="/send-ack" className="text-blue-600 hover:text-blue-800">Send & Ack Guide</Link> - Learn about sending and acknowledging FIX messages</li>
          </ul>
        </div>
      </section>

    </div>
  )
}

export default GettingStarted 