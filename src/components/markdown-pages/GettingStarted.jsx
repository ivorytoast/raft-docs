import React from 'react'
import { Link } from 'react-router-dom'
import TemplateText from '../TemplateText'

function GettingStarted() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Reliable & Automated Framework for Testing (RAFT)</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">FIX Testing</h2>
        
        <h3 className="text-xl font-semibold mb-3">Overview</h3>
        <p className="mb-4">
          RAFT provides a framework for testing FIX (Financial Information eXchange) messages. This document outlines how to create and execute basic FIX scripts using RAFT.
        </p>

        <h3 className="text-xl font-semibold mb-3">Basic FIX Script Structure</h3>
        <p className="mb-4">
          A basic RAFT script consists of a series of commands that send and acknowledge FIX messages. The following sections will guide you through creating a simple RAFT script, sending a FIX message, and acknowledging it.
        </p>

        <h3 className="text-xl font-semibold mb-3">Example Script (Basic)</h3>
        <TemplateText
          description="Basic script example"
          text={`FIX_SEND $alias 35=1|112=$message| -d |
FIX_ACK $alias -p 112=<string:$message>`}
        />

        <h3 className="text-xl font-semibold mt-6 mb-3">Creating a Basic FIX Script</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Set Up the FIX Message:</strong> Use the <code className="bg-gray-100 px-1 rounded">FIX_SEND</code> command to construct and send a FIX message. The message should include the necessary tags and values.</li>
          <li><strong>Acknowledge the Message:</strong> Use the <code className="bg-gray-100 px-1 rounded">FIX_ACK</code> command to acknowledge the receipt of the FIX message and its individual fields.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">How To Run The Test Using Intellij IDE</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create a new 'Application' run configuration</li>
          <li>Set the main class to <code className="bg-gray-100 px-1 rounded">com.bgcgroup.fx.raft.RaftMain</code></li>
          <li>CLI Arguments:
            <ul className="list-disc pl-5 mt-2">
              <li>-l</li>
              <li>-d scripts/{'{folder}'}/{'{script_name}'}.txt</li>
            </ul>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Example Script (Advanced)</h2>
        <TemplateText
          description="Advanced script example"
          text={`@SECURITY_TEST_CHECK
$alias
$message=helloworld
FIX_SEND $alias 35=1|112=$message| -d |
FIX_ACK $alias -p 112=<string:$message>`}
        />

        <h3 className="text-xl font-semibold mt-6 mb-3">Creating An Advanced FIX Script</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Define the Alias</strong> (To be explained by Andrey)</li>
          <li><strong>Set Up the FIX Message:</strong> Use the <code className="bg-gray-100 px-1 rounded">FIX_SEND</code> command to construct and send a FIX message. The message should include the necessary tags and values.</li>
          <li><strong>Acknowledge the Message:</strong> Use the <code className="bg-gray-100 px-1 rounded">FIX_ACK</code> command to acknowledge the receipt of the FIX message and its individual fields.</li>
          <li><strong>Execute the Script:</strong> Finally, run the script to send the FIX message and receive the acknowledgment.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">Deep Dive Into the Script</h3>
        <div className="space-y-4">
          <div>
            <code className="bg-gray-100 px-2 py-1 rounded block">@SECURITY_TEST_CHECK</code>
            <p className="mt-2">To be explained by Andrey</p>
          </div>

          <div>
            <code className="bg-gray-100 px-2 py-1 rounded block">$alias</code>
            <p className="mt-2">To be explained by Andrey</p>
          </div>

          <div>
            <code className="bg-gray-100 px-2 py-1 rounded block">$message=helloworld</code>
            <p className="mt-2">This line defines a variable <code className="bg-gray-100 px-1 rounded">$message</code> with the value <code className="bg-gray-100 px-1 rounded">helloworld</code>. This variable can be used in the FIX message to dynamically insert values. It is case-sensitive.</p>
          </div>

          <div>
            <code className="bg-gray-100 px-2 py-1 rounded block">FIX_SEND $alias 35=1|112=$message| -d |</code>
            <p className="mt-2">The actual FIX message is constructed here. The <code className="bg-gray-100 px-1 rounded">35=1</code> indicates the message type (in this case, a logon), and <code className="bg-gray-100 px-1 rounded">112=$message</code> sets the value of tag 112 to the value of the <code className="bg-gray-100 px-1 rounded">$message</code> variable.</p>
          </div>

          <div>
            <code className="bg-gray-100 px-2 py-1 rounded block">
              {'FIX_ACK $alias -p 112=<string:$message>'}
            </code>
            <p className="mt-2">
              This line acknowledges the receipt of the FIX message sent earlier. The <code className="bg-gray-100 px-1 rounded">-p</code> flag specifies the tag to acknowledge. The <code className="bg-gray-100 px-1 rounded">{'<string:$message>'}</code> syntax indicates that the acknowledgment should match the value of the <code className="bg-gray-100 px-1 rounded">$message</code> variable. The <strong>string</strong> is used to specify that the value should be treated as a string. If the value is not a string, it will cause a compile error.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Available Commands</h2>
        <p className="mb-4 italic">To be completed by Andrey with all commands</p>
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
                <td className="px-6 py-4">Sends a FIX message to the specified session alias. The message must include the necessary tags and values.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-mono">FIX_ACK</td>
                <td className="px-6 py-4">Acknowledges the receipt of a FIX message for the specified session alias. This command confirms that the message was processed correctly.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Standard Library</h2>
        <h3 className="text-xl font-semibold mb-3">Overview</h3>
        <p className="mb-4">
          Once users start to create multiple scripts, they will find that there are common patterns and functions that can be reused across different scripts.
          To facilitate this, RAFT provides a standard library of functions and commands that can be used in your scripts. This section outlines the available functions and how to use them effectively.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How To Define The Standard Library</h3>
        <p className="mb-4">
          Create a file called: <code className="bg-gray-100 px-1 rounded">stdlib.txt</code>
          <br />
          <em>(To be explained by Andrey if it has to be called this or can be called anything)</em>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How To Include The Standard Library</h3>
        <p className="mb-4 italic">To be explained by Andrey</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mt-8 mb-4">For More Information</h2>
        <p className="mb-4">
          For detailed information about specific topics, please visit:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><Link to="/pattern-match" className="text-blue-600 hover:text-blue-800">Pattern Matching Guide</Link> - Learn how to match FIX messages</li>
          <li><Link to="/control-flow" className="text-blue-600 hover:text-blue-800">Control Flow Guide</Link> - Learn about control flow in RAFT</li>
          <li><Link to="/logon-logoff" className="text-blue-600 hover:text-blue-800">Logon & Logoff Guide</Link> - Learn about FIX session management</li>
          <li><Link to="/functions-variables" className="text-blue-600 hover:text-blue-800">Functions & Variables Guide</Link> - Learn about functions and variables in RAFT</li>
          <li><Link to="/send-ack" className="text-blue-600 hover:text-blue-800">Send & Ack Guide</Link> - Learn about sending and acknowledging FIX messages</li>
        </ul>
      </section>

    </div>
  )
}

export default GettingStarted 