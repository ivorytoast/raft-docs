import React from 'react'
import TemplateText from '../TemplateText'

function SendAck() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">FIX Send and Ack Guide</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#basic-send" className="text-blue-600 hover:text-blue-800">
              1. Basic Message Sending
            </a>
          </li>
          <li>
            <a href="#message-ack" className="text-blue-600 hover:text-blue-800">
              2. Message Acknowledgment
            </a>
          </li>
          <li>
            <a href="#timing" className="text-blue-600 hover:text-blue-800">
              3. Timing and Waits
            </a>
          </li>
          <li>
            <a href="#advanced-send" className="text-blue-600 hover:text-blue-800">
              4. Advanced Message Building
            </a>
            <ul className="pl-4 mt-2 space-y-1">
              <li>
                <a href="#templates" className="text-blue-600 hover:text-blue-800">
                  4.1 Using Templates
                </a>
              </li>
              <li>
                <a href="#groups" className="text-blue-600 hover:text-blue-800">
                  4.2 Working with Groups
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <section id="basic-send" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          Basic Message Sending
        </h2>
        <p className="mb-4">
          Sending a FIX message requires an alias to be logged on. The message can be sent using simple syntax
          without specifying headers/trailers.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Basic Send Example:</h4>
          <TemplateText
            description="Basic send example"
            text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=sendtest| -d |
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Use <span className="bg-purple-100 px-1 rounded">-d</span> flag to specify delimiter (default is SOH character)
          </p>
        </div>
      </section>

      <section id="message-ack" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Message Acknowledgment
        </h2>
        <p className="mb-4">
          Messages can be "acked" with the <span className="bg-purple-100 px-1 rounded">FIX_ACK</span> command to verify
          the content of incoming messages.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Basic ack example"
            text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=acktest| -d |
FIX_ACK {USERNAME} -p 112=acktest
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            The <span className="bg-purple-100 px-1 rounded">-p</span> flag specifies the pattern to match in the response
          </p>
        </div>
      </section>

      <section id="timing" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Timing and Waits
        </h2>
        <p className="mb-4">
          Response times can be controlled using the <span className="bg-purple-100 px-1 rounded">-t</span> flag
          or explicit <span className="bg-purple-100 px-1 rounded">WAIT</span> commands.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Wait Examples:</h4>
          <TemplateText
            description="Timing control example"
            text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
WAIT -t 1000
FIX_SEND {USERNAME} 35=1|112=timing| -d |
FIX_ACK {USERNAME} -p 112=timing -t 2500
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">WAIT -t 1000</span>: Wait 1 second</li>
              <li><span className="bg-purple-100 px-1 rounded">-t 2500</span>: Wait up to 2.5 seconds for response</li>
            </ul>
          </p>
        </div>
      </section>

      <section id="advanced-send" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</span>
          Advanced Message Building
        </h2>

        <div id="templates" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">4.1</span>Templates and Fields
          </h3>
          <p className="mb-4">
            Messages can be built using templates and the <span className="bg-purple-100 px-1 rounded">-f</span> flag
            for field specification.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-md font-semibold mb-2 text-gray-700">Field Setting Examples:</h4>
            <TemplateText
              description="Advanced send examples"
              text={`FIX_SEND {USERNAME} 35=1 -F 112
# Use field names (with caution)
FIX_SEND {USERNAME} 35=1 -F TestReqID`}
            />
            <p className="mt-2 text-sm text-gray-600">
              <span className="bg-purple-100 px-1 rounded">-F</span> flag automatically generates an ID value
            </p>
          </div>
        </div>

        <div id="groups" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">4.2</span>Working with Groups
          </h3>
          <p className="mb-4">
            Groups can be specified using nested syntax with the <span className="bg-purple-100 px-1 rounded">-f</span> flag.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <TemplateText
              description="Group handling example"
              text={`# Market data request with two MDEntryTypes (bid/offer)
FIX_SEND {USERNAME} 35=V|262=ID|263=1|264=0|267=2|269=0|269=1|146=1|55=TSTMKT -d | -F 262

# Alternative syntax using groups
FIX_SEND {USERNAME} 35=V|262=ID|263=1|264=0|267=0|146=1|55=TSTMKT -f [267 [269=0]] -f [267 [269=1]] -d | -F 262`}
            />
            <p className="mt-2 text-sm text-gray-600">
              Both examples create identical messages with different syntax approaches
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SendAck 