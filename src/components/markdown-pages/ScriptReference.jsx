import React from 'react'
import TemplateText from '../TemplateText'
import DocSection from '../DocSection'

function ScriptReference() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">RAFT Script Reference Guide</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="mb-4">
          Below is a complete RAFT script that demonstrates key features. We'll break down each line in the sections that follow.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description=""
            text={`@raft_docs_basic_reference_script
# Basic RAFT Reference Script
# Define variables for reuse
$alias={USERNAME}
$password={PASSWORD}
$senderID={SENDER_COMPUTER_ID}
$targetID={TARGET_COMP_ID}

# Establish FIX session
FIX_LOGON $alias $password $senderID $targetID

# Wait for connection to stabilize
WAIT -t 1000

# Send a test request message
FIX_SEND $alias 35=1|112=TestRequest123| -d | -F 112
PRINT Sent test request message

# Wait for and verify the response
IF [FIX_ACK $alias -p 112=TestRequest123 -t 5000] [
  PRINT Successfully received test response
] [
  PRINT Failed to receive test response
  FIX_LOGOFF $alias
  EXIT
]

# Send a market data request
FIX_SEND $alias 35=V|262=MDRequest123|263=1|264=0|267=2|269=0|269=1|146=1|55=AAPL -d | -F 262
PRINT Sent market data request for AAPL

# Capture response data
FIX_CAPTURE $alias 55 SYMBOL -o true
FIX_CAPTURE $alias 270 PRICE -o true -n 0

# Display captured data
PRINT Symbol: LOAD_VAR($alias,SYMBOL)
PRINT Price: LOAD_VAR($alias,PRICE)

# Conditional logic based on price
SET price LOAD_VAR($alias,PRICE)
IF [$price &gt; 150] [
  PRINT Price is above threshold
  
  # Send a buy order
  FIX_SEND $alias 35=D|11=Order123|55=AAPL|54=1|38=100|40=2|44=LOAD_VAR($alias,PRICE) -d | -F 11
  
  # Wait for order acknowledgment
  FIX_ACK $alias -p [35=8 150=0 39=0]
  PRINT Order acknowledged
] [
  PRINT Price is below threshold
]

# Repeat an action multiple times
PRINT Starting repeated action
REPEAT [
  PRINT This is repetition number $REPEAT_COUNT
  WAIT -t 500
] -X 3
PRINT Finished repeated action

# Clean up and exit
FIX_LOGOFF $alias
PRINT Script completed successfully`}
          />
        </div>
      </div>

      <DocSection id="script-breakdown" number="1" title="Script Breakdown">
        <p className="mb-4">
          Let's examine each part of the script to understand what it does and how it works.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <TemplateText
            description="Comments"
            text={`# Basic RAFT Reference Script
# Define variables for reuse`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Lines starting with <span className="bg-purple-100 px-1 rounded">#</span> are comments and are ignored during execution. 
            They help document your script and make it more readable.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Variable Definitions</h3>
          <TemplateText
            description="Variable definitions"
            text={`$alias={USERNAME}
$password={PASSWORD}
$senderID={SENDER_COMPUTER_ID}
$targetID={TARGET_COMP_ID}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li>Variables are defined with a <span className="bg-purple-100 px-1 rounded">$</span> prefix</li>
              <li><span className="bg-purple-100 px-1 rounded">{'{USERNAME}'}</span> and similar placeholders are replaced with actual values from your settings</li>
              <li>Using variables makes your script more maintainable and easier to update</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Tip:</strong> Store credentials in variables at the top of your script for easy updates.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">FIX Session Establishment</h3>
          <TemplateText
            description="FIX logon"
            text={`FIX_LOGON $alias $password $senderID $targetID`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">FIX_LOGON</span> establishes a FIX session with the counterparty</li>
              <li>Parameters: username, password, sender computer ID, target computer ID</li>
              <li>This must be the first FIX-related command in your script</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Common Issue:</strong> If logon fails, check that your credentials and computer IDs are correct and that the counterparty is available.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Wait Command</h3>
          <TemplateText
            description="Wait command"
            text={`WAIT -t 1000`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">WAIT</span> pauses script execution for a specified time</li>
              <li><span className="bg-purple-100 px-1 rounded">-t 1000</span> specifies the wait time in milliseconds (1 second in this case)</li>
              <li>Useful for allowing connections to stabilize or simulating user interaction delays</li>
            </ul>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Sending FIX Messages</h3>
          <TemplateText
            description="Sending FIX messages"
            text={`FIX_SEND $alias 35=1|112=TestRequest123| -d | -F 112
PRINT Sent test request message`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">FIX_SEND</span> sends a FIX message to the counterparty</li>
              <li>First parameter is the alias (username) for the session</li>
              <li><span className="bg-purple-100 px-1 rounded">35=1</span> specifies message type 1 (Test Request)</li>
              <li><span className="bg-purple-100 px-1 rounded">112=TestRequest123</span> sets the TestReqID field</li>
              <li><span className="bg-purple-100 px-1 rounded">-d |</span> specifies the pipe character as the field delimiter (instead of the default SOH character)</li>
              <li><span className="bg-purple-100 px-1 rounded">-F 112</span> automatically generates a unique value for field 112 if not provided</li>
              <li><span className="bg-purple-100 px-1 rounded">PRINT</span> outputs text to the console</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Tip:</strong> Use the <span className="bg-purple-100 px-1 rounded">-d |</span> flag to make messages more readable in your script. The actual message will use the proper SOH delimiters.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Conditional Logic with FIX_ACK</h3>
          <TemplateText
            description="Conditional acknowledgment"
            text={`IF [FIX_ACK $alias -p 112=TestRequest123 -t 5000] [
  PRINT Successfully received test response
] [
  PRINT Failed to receive test response
  FIX_LOGOFF $alias
  EXIT
]`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">IF [condition] [true-branch] [false-branch]</span> executes different code based on a condition</li>
              <li><span className="bg-purple-100 px-1 rounded">FIX_ACK</span> waits for a message matching the specified pattern</li>
              <li><span className="bg-purple-100 px-1 rounded">-p 112=TestRequest123</span> specifies the pattern to match (TestReqID field)</li>
              <li><span className="bg-purple-100 px-1 rounded">-t 5000</span> sets a timeout of 5 seconds</li>
              <li>If the message is received within the timeout, the true branch executes</li>
              <li>If the timeout expires, the false branch executes, logging off and exiting</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Common Issue:</strong> If your pattern is too specific, it might not match the actual response. Start with basic patterns and refine as needed.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Complex Message with Groups</h3>
          <TemplateText
            description="Market data request with groups"
            text={`FIX_SEND $alias 35=V|262=MDRequest123|263=1|264=0|267=2|269=0|269=1|146=1|55=AAPL -d | -F 262
PRINT Sent market data request for AAPL`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">35=V</span> specifies a Market Data Request message</li>
              <li><span className="bg-purple-100 px-1 rounded">262=MDRequest123</span> sets the MDReqID field</li>
              <li><span className="bg-purple-100 px-1 rounded">267=2</span> indicates 2 entries in the MDEntryType group</li>
              <li><span className="bg-purple-100 px-1 rounded">269=0|269=1</span> specifies bid (0) and offer (1) entry types</li>
              <li><span className="bg-purple-100 px-1 rounded">55=AAPL</span> sets the Symbol field to AAPL</li>
            </ul>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Capturing Field Values</h3>
          <TemplateText
            description="Capturing values"
            text={`FIX_CAPTURE $alias 55 SYMBOL -o true
FIX_CAPTURE $alias 270 PRICE -o true -n 0`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">FIX_CAPTURE</span> stores field values from incoming messages into variables</li>
              <li>Parameters: alias, field tag, variable name</li>
              <li><span className="bg-purple-100 px-1 rounded">-o true</span> overwrites any existing value in the variable</li>
              <li><span className="bg-purple-100 px-1 rounded">-n 0</span> captures the first occurrence of the field (0-indexed)</li>
            </ul>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Using Captured Values</h3>
          <TemplateText
            description="Using captured values"
            text={`PRINT Symbol: LOAD_VAR($alias,SYMBOL)
PRINT Price: LOAD_VAR($alias,PRICE)`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">LOAD_VAR(alias,variable)</span> retrieves a previously captured value</li>
              <li>Parameters: alias (username), variable name</li>
              <li>This allows you to use captured values in subsequent commands</li>
            </ul>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Variable Assignment and Comparison</h3>
          <TemplateText
            description="Variable assignment and comparison"
            text={`SET price LOAD_VAR($alias,PRICE)
IF [$price &gt; 150] [
  PRINT Price is above threshold
  
  # Send a buy order
  FIX_SEND $alias 35=D|11=Order123|55=AAPL|54=1|38=100|40=2|44=LOAD_VAR($alias,PRICE) -d | -F 11
  
  # Wait for order acknowledgment
  FIX_ACK $alias -p [35=8 150=0 39=0]
  PRINT Order acknowledged
] [
  PRINT Price is below threshold
]`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">SET price LOAD_VAR($alias,PRICE)</span> assigns the captured price to a local variable</li>
              <li><span className="bg-purple-100 px-1 rounded">IF [$price &gt; 150]</span> compares the price to a threshold value</li>
              <li>If the price is above 150, it sends a buy order (35=D) for 100 shares of AAPL</li>
              <li><span className="bg-purple-100 px-1 rounded">54=1</span> indicates a buy order (1 = Buy)</li>
              <li><span className="bg-purple-100 px-1 rounded">FIX_ACK $alias -p [35=8 150=0 39=0]</span> waits for an execution report (35=8) with ExecType=New (150=0) and OrdStatus=New (39=0)</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Tip:</strong> For complex conditions, you can use <span className="bg-purple-100 px-1 rounded">&&</span> for AND and <span className="bg-purple-100 px-1 rounded">||</span> for OR operations.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Repetition</h3>
          <TemplateText
            description="Repetition"
            text={`PRINT Starting repeated action
REPEAT [
  PRINT This is repetition number $REPEAT_COUNT
  WAIT -t 500
] -X 3
PRINT Finished repeated action`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">REPEAT [commands] -X count</span> executes the commands a specified number of times</li>
              <li><span className="bg-purple-100 px-1 rounded">$REPEAT_COUNT</span> is a special variable that contains the current iteration number (0-indexed)</li>
              <li>The example repeats the enclosed commands 3 times, with a 500ms delay between iterations</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Common Issue:</strong> REPEAT loops will exit early if any command inside returns false. Use IF statements to handle potential failures if you need all iterations to complete.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Session Cleanup</h3>
          <TemplateText
            description="Session cleanup"
            text={`FIX_LOGOFF $alias
PRINT Script completed successfully`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="bg-purple-100 px-1 rounded">FIX_LOGOFF</span> properly terminates the FIX session</li>
              <li>Always include this at the end of your script to ensure clean session termination</li>
              <li>The final PRINT confirms the script completed all steps successfully</li>
            </ul>
          </p>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Best Practice:</strong> Always include proper error handling and session cleanup to ensure your script behaves predictably even when errors occur.
            </p>
          </div>
        </div>
      </DocSection>
      
      <DocSection id="common-pitfalls" number="2" title="Common Pitfalls and Troubleshooting">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Connection Issues</h3>
            <p className="text-sm text-gray-600">
              If your FIX_LOGON command fails:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Verify your credentials and computer IDs are correct</li>
                <li>Check that the counterparty system is available</li>
                <li>Ensure your network connection is stable</li>
                <li>Try adding the <span className="bg-purple-100 px-1 rounded">-RESET</span> flag to reset sequence numbers</li>
              </ul>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Message Acknowledgment Failures</h3>
            <p className="text-sm text-gray-600">
              If your FIX_ACK commands time out:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Check that your pattern matches the expected response format</li>
                <li>Increase the timeout value with <span className="bg-purple-100 px-1 rounded">-t</span> for slower systems</li>
                <li>Use more general patterns initially, then refine as needed</li>
                <li>Verify the counterparty is actually sending the expected response</li>
              </ul>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Variable Usage Issues</h3>
            <p className="text-sm text-gray-600">
              Common variable-related problems:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Remember to use <span className="bg-purple-100 px-1 rounded">$</span> when referencing variables</li>
                <li>For captured values, use <span className="bg-purple-100 px-1 rounded">LOAD_VAR(alias,name)</span> syntax</li>
                <li>Variables are case-sensitive</li>
                <li>Check that variables are defined before they are used</li>
              </ul>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Syntax Errors</h3>
            <p className="text-sm text-gray-600">
              To avoid syntax errors:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Match opening and closing brackets <span className="bg-purple-100 px-1 rounded">[ ]</span> carefully</li>
                <li>Use consistent delimiters in FIX messages</li>
                <li>Check command spelling and parameter order</li>
                <li>Use comments to document complex sections</li>
              </ul>
            </p>
          </div>
        </div>
      </DocSection>
      
      <DocSection id="next-steps" number="3" title="Next Steps">
        <p className="mb-4">
          Now that you understand the basics of RAFT scripting, you can:
        </p>
        
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Modify the example script to work with your specific FIX counterparty</li>
          <li>Explore more advanced features like regular expressions in patterns</li>
          <li>Create reusable functions for common operations</li>
          <li>Implement more complex error handling and recovery strategies</li>
          <li>Develop automated testing scripts for your FIX applications</li>
        </ul>
        
        <p>
          Refer to the other documentation pages for more detailed information on specific RAFT features.
        </p>
      </DocSection>
    </div>
  )
}

export default ScriptReference 