import React from 'react'
import TemplateText from '../TemplateText'

function SendAck() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">FIX Send and Ack Guide</h1>

      <section>
        <p className="mb-4 text-gray-900">
          Sending a FIX message requires an alias to be logged on (For logon information, please see the logon-logoff docs).
        </p>
        <p className="mb-4 text-gray-900">
          In the example below, user logs in and sends a test request message. Note that the FIX_SEND command does not require headers/trailers to be specified. A delimiter can be set via the -d flag; if one is not specified, it is assumed to be the SoH character (/u0001).
        </p>
        <TemplateText
          description="Basic send example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=sendtest| -d |
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Messages can be "acked" with the FIX_ACK command. This command simply looks at the most recent incoming message and attempts to match it to the provided pattern. (For more information on pattern matching, please see the pattern matching guide)
        </p>
        <p className="mb-4 text-gray-900">
          In this example, user sends a test request with the field 112 set to "acktest". FIX_ACK checks the incoming response for field 112 with the text "acktest".
        </p>
        <TemplateText
          description="Basic ack example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=acktest| -d |
FIX_ACK {USERNAME} -p 112=acktest
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          After sending a FIX message out, there is always a delay before receiving the response. This means that, by design, a FIX_ACK must wait a short period of time before checking whether or not a message has been received. The default wait is 10 seconds, but this value can be adjusted with the -t flag, which takes a millisecond wait period (e.g. -t 2500 specifies a timeout of 2500 ms or 2.5 seconds). Note that, by default, FIX_ACK will only wait for a message to arrive if there are no "un-acked" messages pending; if there is already a message pending, the -t flag is ignored (see the max-acks and clear buffer instructions below for more information). In other words, -t specifies a timeout only if there are no messages available for immediate ack.
        </p>
        <p className="mb-4 text-gray-900">
          Most RAFT commands support the -t flag, but waits can also be specified explicitly with the WAIT -t timeout command. In the example below, a user logs in, does nothing for 1 second, sends a message, then waits up to 2.5 seconds to receive the reply.
        </p>
        <TemplateText
          description="Timeouts and waits example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
WAIT -t 1000
FIX_SEND {USERNAME} 35=1|112=acktest| -d |
FIX_ACK {USERNAME} -p 112=acktest -t 2500
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Incoming FIX messages are stored in memory until they are deleted by an ack or the buffer size is exceeded (the buffer size can be adjusted in the config file). The FIX_PRINT_BUFFER command displays the messages currently pending for a particular user. The -t flag can be passed to wait for -t milliseconds before printing.
        </p>
        <TemplateText
          description="Print buffer example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=acktest| -d |
FIX_PRINT_BUFFER {USERNAME} -t 1000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          By default, acks destroy a message on match. This means that the same message cannot be acked twice in a row. If an ack should restore the message instead of deleting it, the -r flag needs to be specified
        </p>
        <TemplateText
          description="Repeatable ack example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=ackrepeatfail| -d |
FIX_ACK {USERNAME} -p 112=ackrepeatfail
# ERROR: cannot ack the same message twice without -r! 
# FIX_ACK {USERNAME} -p 112=ackrepeatfail
FIX_SEND {USERNAME} 35=1|112=ackrepeatpass| -d |
FIX_ACK {USERNAME} -p 112=ackrepeatpass -r
FIX_ACK {USERNAME} -p 112=ackrepeatpass
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          FIX acks only consider the most recent incoming message for comparison. This can be changed to compare up to -m messages, discarding any mismatches. Setting -m 3, for example, will try to match the three most recent messages.
        </p>
        <p className="mb-4 text-gray-900">
          The -m flag can also be combined with a timeout setting: -m 3 -t 2500 will compare up to 3 messages and wait up to 2.5 seconds if fewer than three messages are currently pending. If there are more than 3 messages pending, the ack will NOT wait for more messages to arrive.
        </p>
        <p className="mb-4 text-gray-900">
          The -m flag can also be combined with the -r (repeatable) flag. If a match is found, only the matching message is restored; any messages that may have been processed and discarded are discarded for good.
        </p>
        <TemplateText
          description="Max acks example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=first| -d |
FIX_SEND {USERNAME} 35=1|112=second| -d |
FIX_SEND {USERNAME} 35=1|112=third| -d |
# ERROR: trying to ack 112=first will fail, because the most recent message has 112=third!
# FIX_ACK {USERNAME} -p 112=first
FIX_ACK {USERNAME} -p 112=first -m 3
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          The max acks setting (-m) ignores and discards any mismatching messages. If, instead, a certain number of exact matches is expected, the -M flag can be specified in conjunction with the -m flag (if the -m flag isn't set to specify the number of expected matches, 1 is used).
        </p>
        <p className="mb-4 text-gray-900">
          In the example below, the FIX_ACK multi-matches exactly three times on tag 112 with the value first, second, or third. For more information on pattern matching, please see the pattern matching guide.
        </p>
        <TemplateText
          description="Multi ack example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=first| -d |
FIX_SEND {USERNAME} 35=1|112=second| -d |
FIX_SEND {USERNAME} 35=1|112=third| -d |
FIX_ACK {USERNAME} -p 112=<==first,second,third==> -d | -M -m 3
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Pending messages can be cleared manually without acking with the FIX_CLEAR_BUFFER command. By default, FIX_CLEAR_BUFFER clears all the messages currently pending for a user.
        </p>
        <p className="mb-4 text-gray-900">
          Much like acking, specifying the -m flag will clear up to -m messages from the buffer. Specifying the -t flag will wait up to -t milliseconds in case the buffer is empty but the -m limit has not yet been reached.
        </p>
        <p className="mb-4 text-gray-900">
          FIX_CLEAR_BUFFER also supports conditional deletion based on a pattern. In other words, while the message at the top of the buffer matches a certain pattern, the message is cleared. The pattern is specified with the -p flag (for more information, please see the pattern matching guide) and can be combined with other flags.
        </p>
        <TemplateText
          description="Clear buffer example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1|112=first| -d |
FIX_SEND {USERNAME} 35=1|112=second| -d |
FIX_SEND {USERNAME} 35=1|112=third| -d |
FIX_SEND {USERNAME} 35=1|112=fourth| -d |
FIX_SEND {USERNAME} 35=1|112=fifth| -d |
# The following print should display acks for all five test requests
FIX_PRINT_BUFFER {USERNAME} -t 1000
# Two messages -- first and second -- are cleared:
FIX_CLEAR_BUFFER {USERNAME} -m 2
FIX_PRINT_BUFFER {USERNAME}
# Clear only messages that match 112=third or 112=fourth:
FIX_CLEAR_BUFFER {USERNAME} -p 112=<==third,fourth==>
FIX_PRINT_BUFFER {USERNAME}
# Clear any messages remaining in the buffer:
FIX_CLEAR_BUFFER {USERNAME}
FIX_PRINT_BUFFER {USERNAME}
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Outgoing messages can be created with the "simple" syntax (see above) or built from a starting template. FIX_SEND requires a 35=[Message Type] field to be set manually (e.g. 35=1, in the example above, for a test request), but additional fields and groups can be specified with the -f flag.
        </p>
        <p className="mb-4 text-gray-900">
          The -f flag can take either a field=value pair in -f x=y format or nested groups in the following format: -f [groupHeaderTag [groupValue1=value1 groupValue2=value2 ...] -F 123 -F 456]
        </p>
        <p className="mb-4 text-gray-900">
          Here the groupHeaderTag corresponds to the NumInGroup tag that defines the group being set. Additionally, the groups can be nested further than one level -- a groupValue1=value1 can be in tag=value format or in [nestedGroupHeader [...]] format. For example, in a 35=AB (New Order - Multileg) message, a NoHedgeLegs (7464) can be added with nested NoHedgeSecurityAltId (10604) data with the following syntax: 35=AB... -f [7464 [9074=2 9016=1 ... [10604 [10605=... 10606=...]]
        </p>
        <p className="mb-4 text-gray-900">
          In the -f [groupHeaderTag [groupValue1=value1 groupValue2=value2 ...] -F 123 -F 456] example above, the group takes additional -F flags. These are optional "auto value" setters: -F {'<tag>'} sets the tag in the specified group to a random ID value. Setting the -F flag in the message as a whole (not inside a nested group) sets the field within the message (rather than a particular group).
        </p>
        <p className="mb-4 text-gray-900">
          For example 35=1 -F 112 will create a test request message with a tag 112 set to a random ID. To see an example of how to capture/ack randomized IDs, please see the live variables examples under the functions and variables documentation.
        </p>
        <p className="mb-4 text-gray-900">
          Provided field names can take an integer tag to set or the field name as specified by the quickfixj data dictionary (XML file) associated with the session. Caution is recommended if using names rather than tags: field names in the RoE may diverge from those in the XML.
        </p>
        <p className="mb-4 text-gray-900">
          The primary use case for advanced sending syntax is to ensure code reusability: while messages can be created directly with the "simple" copy-paste syntax, the advanced syntax is designed to help create groups via variables allowing for more modular code.
        </p>
        <TemplateText
          description="Advanced send examples"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=1 -F 112
# Use with caution: if TestReqID changes in the XML, the following line will fail!
FIX_SEND {USERNAME} 35=1 -F TestReqID
FIX_PRINT_BUFFER {USERNAME} -t 1000
FIX_CLEAR_BUFFER {USERNAME}
# The following message is a market data request for the symbol TSTMKT
# Note that 267 is the NumInGroup header for NoMDEntries and the 2 values
# it sees -- 269=0 and 269=1 are separate groups where MDEntryType is set to bid
# and MDEntryType is set to offer. The ID field MDReqID (262) is set automatically;
# a default value for the ID is provided first, to ensure that the actual ID value
# is created before 263=1|264=0... portion.
FIX_SEND {USERNAME} 35=V|262=ID|263=1|264=0|267=2|269=0|269=1|146=1|55=TSTMKT -d | -F 262
FIX_PRINT_BUFFER {USERNAME} -t 1000
# The same message can be created with:
FIX_SEND {USERNAME} 35=V|262=ID|263=1|264=0|267=0|146=1|55=TSTMKT -f [267 [269=0]] -f [267 [269=1]] -d | -F 262
FIX_PRINT_BUFFER {USERNAME} -t 1000
FIX_LOGOFF {USERNAME}`}
        />
      </section>
    </div>
  )
}

export default SendAck 