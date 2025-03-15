import React from 'react'
import TemplateText from '../TemplateText'

function FunctionsVariables() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Functions and Variables Guide</h1>

      <section>
        <p className="mb-4 text-gray-900">
          Blocks of text starting with "@" are treated as "named" blocks. The commands inside a block are executed in order.
        </p>
        <TemplateText
          description="Simple block example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          A block can contain either commands to run directly or "calls" to other blocks loaded into RAFT. For example, the command below simply executes raft_docs_simple_block
        </p>
        <TemplateText
          description="Chaining blocks example"
          text={`raft_docs_simple_block`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Blocks can also define variables in their headers. The variable names are defined after a "$" character. Variables can be defined as $name, $name=defaultValue, or $name=defaultValue:{'<constraint>'}. For valid constraint patterns, please see the pattern matching guide or the pattern_match docs file.
        </p>
        <p className="mb-4 text-gray-900">
          If a default value is not specified, the variable name is used; if a default constraint is not provided, any value is automatically permitted. That is, $alias is equivalent to $alias=alias:{'<string>'}.
        </p>
        <p className="mb-4 text-gray-900">
          Constraints ensure that the value provided by the caller matches the expected type/values of the current block. In this example, the line target=BGC:{'<string:BGC>'} requires any value passed to "$target" to match the regex BGC exactly; attempting to call the block with $target=GFI would cause a compilation error.
        </p>
        <p className="mb-4 text-gray-900">
          Note: the first non-$ line is treated as the end of the header and the beginning of the body. In the example below, since FIX_LOGON and FIX_LOGOFF are system-defined, the $alias, $password, $sender, and $target are replaced with their actual values.
        </p>
        <TemplateText
          description="Block with arguments definition"
          text={`$alias
$password=p
$sender=helloworld:<string>
$target=BGC:<string:BGC>
FIX_LOGON $alias $password $sender $target
FIX_LOGOFF $alias`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          The block above provides the function definition. It can be called directly with "name $variable=actualValue" where $variable corresponds to the target block's variable -- e.g. raft_docs_block_with_arguments_definition $alias=hello would call raft_docs_block_with_arguments_definition with alias set to hello. Variables can also be passed through: $targetVariable=$currentVariable. This syntax looks up the value of the variable in the current block and passes it to the target.
        </p>
        <p className="mb-4 text-gray-900">
          In the example below, $myalias defaults to qa.tradera and is fed to raft_docs_block_with_arguments_definition as the alias. The sender value is hardcoded directly as PFXO_IPV_MD1. Note that the block raft_docs_block_with_arguments_definition provides defaults for password and target, so they can be safely omitted.
        </p>
        <TemplateText
          description="Calling block with arguments"
          text={`$myalias={USERNAME}
raft_docs_block_with_arguments_definition $alias=$myalias $sender={SENDER_COMPUTER_ID}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          The $variable syntax performs all the checks at compile-time; that is, by the time RAFT runs, the lines and variables are replaced with their actual values (macros). In some situations, we may want to capture live values from an incoming FIX message (such as identifiers) and retrieve them for subsequent processing. The FIX_CAPTURE {'<alias>'} {'<tag number>'} {'<variable name>'} [-o true/false] can be used to do just that: if the -o flag is set to true, FIX_CAPTURE will look at the latest outgoing message and capture the value of the field; otherwise, the most recent incoming message is used. Variables can be loaded via LOAD_VAR(alias,variableName).
        </p>
        <p className="mb-4 text-gray-900">
          The code below sends a basic security list request for TSTMKT, captures the outgoing message's 320 field into LIVEVARSAMPLE, then loads the saved result into the ACK and ensures that it was processed.
        </p>
        <TemplateText
          description="Live variables simple example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=TSTMKT|263=1 -d | -F 320
FIX_CAPTURE {USERNAME} 320 LIVEVARSIMPLE -o true
FIX_ACK {USERNAME} -p [35=y 320=LOAD_VAR({USERNAME},LIVEVARSIMPLE) 893=Y]
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Common functions are defined inside the standard library ("stdlib.txt"). While, technically, all the resources in the repo are shared, stdlib should contain the most commonly used patterns. One such example, is the SECURITY_LIST_REQUEST_SINGLE_SYMBOL function -- which is nearly identical to the code above, without the FIX_LOGON and FIX_LOGOFF:
        </p>
        <TemplateText
          description="Standard library example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
SECURITY_LIST_REQUEST_SINGLE_SYMBOL $alias={USERNAME}
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          If repeating groups are present in a FIX message, it's possible for a tag to appear more than once. In that case, direct variable capture may not work. Instead, FIX_CAPTURE can take additional flags: -n for the index of the desired field (0-indexed) or -M true to capture all values associated with a particular tag (separated by the specified delimiter).
        </p>
        <p className="mb-4 text-gray-900">
          The example below is almost identical to the one above: the difference is that FIX_CAPTURE now looks for field 320 with index 0 (i.e. the first appeareance). If there were multiple 320=val fields, they could be indexed by providing a different value.
        </p>
        <TemplateText
          description="Live variables advanced example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=TSTMKT|263=1 -d | -F 320
FIX_CAPTURE {USERNAME} 320 LIVEVARADVANCED -o true -n 0
FIX_ACK {USERNAME} -p [35=y 320=LOAD_VAR({USERNAME},LIVEVARADVANCED) 893=Y]
FIX_LOGOFF {USERNAME}`}
        />
      </section>
    </div>
  )
}

export default FunctionsVariables 