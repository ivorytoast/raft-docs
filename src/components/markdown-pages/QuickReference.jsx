import React from 'react'
import DocSection from '../DocSection'

function QuickReference() {
  // Update the fixCommands array with all commands
  const fixCommands = [
    {
      name: 'FIX_SEND',
      desc: 'Send a FIX message to the server',
      usage: 'FIX_SEND <alias> <message template (containing at least 35=<msgtype>)> [-d <delimiter>] [-f <field/group>]* [-F <auto tag>]* [-c]',
      notes: 'The -c flag clears incoming buffer before sending'
    },
    {
      name: 'FIX_ACK',
      desc: 'Acknowledge a FIX message received from the server',
      usage: 'FIX_ACK <alias> <-p <pattern>>* [-d <delimiter>] [-M] [-m <max acks>] [-t <timeout (ms)>] [-r] [-i <field to ignore>]* [-C <compare method>] [-P <ignore policy>]',
      notes: '-M enables multi-ack, -r makes it repeatable'
    },
    {
      name: 'FIX_LOGON',
      desc: 'Log on to the server and create an alias for the session',
      usage: 'FIX_LOGON <username> <password> <senderCompId> <targetCompId> [-A <alias>] [-s <settings file>] [-H <host>] [-V <FIX version>] [-i <ignored message type>]*',
      notes: 'Aliases MUST be unique for each live session'
    },
    {
      name: 'FIX_LOGON_ACK',
      desc: 'Check if an alias is logged in',
      usage: 'FIX_LOGON_ACK <alias>',
      notes: 'Returns true if the alias is logged in'
    },
    {
      name: 'FIX_LOGOFF',
      desc: 'Log off from the server and remove the alias',
      usage: 'FIX_LOGOFF <alias> [-g <custom message>] [-e]',
      notes: '-e checks if incoming buffer is empty before logoff'
    },
    {
      name: 'FIX_LOGOFF_ACK',
      desc: 'Check if an alias is logged off',
      usage: 'FIX_LOGOFF_ACK <alias>',
      notes: 'Inverted FIX_LOGON_ACK - returns true if the alias is logged off'
    },
    {
      name: 'FIX_LOGOFF_ALL',
      desc: 'Log off from the server and remove all aliases',
      usage: 'FIX_LOGOFF_ALL [-t <timeout (ms)>]',
      notes: 'Useful for cleanup at end of script'
    },
    {
      name: 'FIX_CLEAR_BUFFER',
      desc: 'Clear the incoming buffer for a given alias',
      usage: 'FIX_CLEAR_BUFFER <alias> [-t <timeout>] [-m <max messages>] [-p <pattern>]* [-d <delimiter>] [-C <compare method>] [-P <ignore policy>]',
      notes: 'Use -m to limit the number of messages cleared'
    },
    {
      name: 'FIX_CLEAR_BUFFER_ACK',
      desc: 'Check if the incoming buffer for a given alias is empty',
      usage: 'FIX_CLEAR_BUFFER_ACK <alias> [-t <timeout (ms)>] [-I]',
      notes: '-I inverts the result -- returns true if buffer is NOT empty'
    },
    {
      name: 'FIX_PRINT_BUFFER',
      desc: 'Print the incoming buffer for a given alias',
      usage: 'FIX_PRINT_BUFFER <alias> [-t <timeout (ms)>]',
      notes: 'Useful for debugging'
    },
    {
      name: 'FIX_CAPTURE',
      desc: 'Capture a field from a FIX message associated with a given alias',
      usage: 'FIX_CAPTURE <alias> <tag to capture> <capture name> [-t <timeout (ms)>] [-o <true/false>] [-M] [-n <index>] [-d <delimiter>]',
      notes: '-o uses outgoing buffer (default: false), -M enables multi-capture, -n captures specific instance, -d joins multi-match values'
    }
  ]

  // Add all control flow commands
  const controlFlowCommands = [
    {
      name: 'TRUE/FALSE',
      desc: 'Return true/false value',
      usage: 'TRUE or FALSE'
    },
    {
      name: 'NOT',
      desc: 'Invert the result of a command',
      usage: 'NOT [FUNCTION]',
      example: 'NOT [TRUE] or NOT [FIX_LOGON_ACK <alias>]'
    },
    {
      name: 'OR',
      desc: 'Return true if any command is true',
      usage: 'OR [FUNCTION1] [FUNCTION2]',
      example: 'OR [TRUE] [FALSE] or OR [FIX_LOGON_ACK <alias>] [FIX_LOGOFF_ACK <alias>]'
    },
    {
      name: 'IF',
      desc: 'Conditional execution',
      usage: 'IF [CONDITION] [SUCCESS_PATH] [FAILURE_PATH]',
      example: 'IF [FIX_LOGON_ACK <alias>] THEN [PRINT success] ELSE [PRINT failure]'
    },
    {
      name: 'REPEAT',
      desc: 'Repeat a command multiple times',
      usage: 'REPEAT [COMMAND] -X <count>',
      notes: 'Breaks on first failure unless wrapped in IF'
    }
  ]

  // Add miscellaneous commands
  const miscCommands = [
    {
      name: 'PRINT_VAR',
      desc: 'Prints the current value of a live variable',
      usage: 'PRINT_VAR <alias> <variable name> [-n <index>] [-d <delimiter>]',
      notes: '-n specifies index for lookup, -d treats stored values as array with given delimiter'
    },
    {
      name: 'PRINT',
      desc: 'Prints the given tokens',
      usage: 'PRINT [token]* [-o <outstream>]',
      notes: '-o will also attempt to write tokens to file'
    },
    {
      name: 'POST',
      desc: 'Sends a POST message to a given endpoint',
      usage: 'POST <key> <endpoint> <message>',
      notes: 'Stores reply in supplied key'
    },
    {
      name: 'VALIDATE',
      desc: 'Checks if provided message matches the current value in supplied key',
      usage: 'VALIDATE <key (key.field)> <expected value>',
      notes: 'Used in conjunction with POST command'
    },
    {
      name: 'SKIP_PREPROCESSOR',
      desc: 'Bypasses compile-time checks/translation on provided function',
      usage: 'SKIP_PREPROCESSOR <[COMMAND/FUNCTION]>',
      notes: 'Use with caution'
    },
    {
      name: 'WAIT',
      desc: 'Pauses RAFT for specified length of time',
      usage: 'WAIT <-t <timeout (ms)>>',
      notes: 'Useful for adding delays in scripts'
    }
  ]

  // Special characters data
  const specialCharacters = [
    { char: '\n', entity: '&newline;', desc: 'Newline character' },
    { char: ' ', entity: '&space;', desc: 'Space character' },
    { char: '$', entity: '&dollar;', desc: 'Variable reference' },
    { char: '%', entity: '&percent;', desc: 'Percent sign' },
    { char: '&', entity: '&amp;', desc: 'Ampersand' },
    { char: '#', entity: '&hash;', desc: 'Comment marker' },
    { char: '=', entity: '&eq;', desc: 'Equals sign' },
    { char: '[', entity: '&lbrack;', desc: 'Left bracket' },
    { char: ']', entity: '&rbrack;', desc: 'Right bracket' },
    { char: 'SoH', entity: '&fixdelim;', desc: 'FIX delimiter (\\u0001)' },
    { char: '"', entity: '&quote;', desc: 'Quote' },
    { char: '<', entity: '&lt;', desc: 'Less than' },
    { char: '>', entity: '&gt;', desc: 'Greater than' },
    { char: '|', entity: '&pipe;', desc: 'Field separator' },
    { char: '{', entity: '&lcurl;', desc: 'Left curly brace' },
    { char: '}', entity: '&rcurl;', desc: 'Right curly brace' },
    { char: ':', entity: '&colon;', desc: 'Colon' },
    { char: '-', entity: '&dash;', desc: 'Dash' },
    { char: ';', entity: '&semicolon;', desc: 'Semicolon' },
    { char: '_', entity: '&underscore;', desc: 'Underscore' },
    { char: "'", entity: '&apostrophe;', desc: 'Apostrophe' },
    { char: '\\', entity: '&backslash;', desc: 'Backslash' },
    { char: '/', entity: '&frontslash;', desc: 'Forward slash' },
    { char: '`', entity: '&backtick;', desc: 'Backtick' },
    { char: ',', entity: '&comma;', desc: 'Comma' }
  ]

  // Update the endpoints constant with all endpoints
  const endpoints = [
    {
      group: 'Basic Operations',
      items: [
        { path: '/', desc: 'Home page' },
        { path: '/help', desc: 'Help information' },
        { path: '/docs', desc: 'Help information' }
      ]
    },
    {
      group: 'Log Retrieval',
      items: [
        { path: '/retrieve', desc: 'Lists all available RAFT run logs in CDS' },
        { path: '/retrieve/raft', desc: 'Lists all available RAFT run logs in CDS' },
        { path: '/retrieve/ls/raft', desc: 'Lists all available RAFT run logs in CDS' },
        { path: '/retrieve/raft/{log_name}', desc: 'Returns the contents of a specific RAFT run log from CDS' },
        { path: '/retrieve/raft/cat/{log_name}', desc: 'Returns the contents of a specific RAFT run log from CDS' },
        { path: '/retrieve/latest', desc: 'Returns the contents of the latest RAFT run log on CDS' },
        { path: '/retrieve/ls', desc: 'Lists all available logs in CDS' },
        { path: '/retrieve/script/{log_folder}/{log_name}', desc: 'Returns the contents of a specific script log on CDS' },
        { path: '/retrieve/latest/{log_folder}', desc: 'Returns the contents of the latest report for the given folder on CDS' }
      ]
    },
    {
      group: 'Script Execution',
      items: [
        { path: '/execute/{name}', desc: 'Executes a named block directly (assumes all named blocks are unique)' },
        { path: '/execute/{script_id}/{name}', desc: 'Executes a named block based on full block name (e.g. 1/block_name)' },
        { path: '/execute/lookup/{script_name}/{name}', desc: 'Executes a named block based on full block name (with name lookup)' },
        { path: '/run/script/{id}', desc: 'Runs all the blocks within a script based on its ID' },
        { path: '/run/script/all/{id}', desc: 'Runs all the blocks within a script based on its ID' },
        { path: '/run/script/named/{id}', desc: 'Runs only the named blocks within a script based on its ID' },
        { path: '/run/script/unnamed/{id}', desc: 'Runs only the unnamed blocks within a script based on its ID' },
        { path: '/run/script/anonymous/{id}', desc: 'Runs only the unnamed blocks within a script based on its ID' }
      ]
    },
    {
      group: 'Script Lookup Execution',
      items: [
        { path: '/run/script/lookup/{name}', desc: 'Runs all the blocks within a script based on its name' },
        { path: '/run/script/lookup/all/{name}', desc: 'Runs all the blocks within a script based on its name' },
        { path: '/run/script/lookup/named/{name}', desc: 'Runs only the named blocks within a script based on its name' },
        { path: '/run/script/lookup/unnamed/{name}', desc: 'Runs only the unnamed blocks within a script based on its name' },
        { path: '/run/script/lookup/anonymous/{name}', desc: 'Runs only the unnamed blocks within a script based on its name' }
      ]
    },
    {
      group: 'Collection Execution',
      items: [
        { path: '/run/collection/{collection_id}', desc: 'Runs all the scripts within a collection based on its ID' },
        { path: '/run/collection/all/{collection_id}', desc: 'Runs all the scripts within a collection based on its ID' },
        { path: '/run/collection/named/{collection_id}', desc: 'Runs only the named scripts within a collection based on its ID' },
        { path: '/run/collection/unnamed/{collection_id}', desc: 'Runs only the unnamed scripts within a collection based on its ID' },
        { path: '/run/collection/anonymous/{collection_id}', desc: 'Runs only the unnamed scripts within a collection based on its ID' }
      ]
    },
    {
      group: 'Collection Lookup Execution',
      items: [
        { path: '/run/collection/lookup/{name}', desc: 'Runs all the scripts within a collection based on its name' },
        { path: '/run/collection/lookup/all/{name}', desc: 'Runs all the scripts within a collection based on its name' },
        { path: '/run/collection/lookup/named/{name}', desc: 'Runs only the named scripts within a collection based on its name' },
        { path: '/run/collection/lookup/unnamed/{name}', desc: 'Runs only the unnamed scripts within a collection based on its name' },
        { path: '/run/collection/lookup/anonymous/{name}', desc: 'Runs only the unnamed scripts within a collection based on its name' }
      ]
    },
    {
      group: 'Global Execution',
      items: [
        { path: '/run/all', desc: 'Runs all scripts within all collections (only unnamed blocks by default)' },
        { path: '/run/all/all', desc: 'Runs all scripts within all collections (all blocks)' },
        { path: '/run/all/named', desc: 'Runs all scripts within all collections (only named blocks)' },
        { path: '/run/all/unnamed', desc: 'Runs all scripts within all collections (only unnamed blocks)' },
        { path: '/run/all/anonymous', desc: 'Runs all scripts within all collections (only unnamed blocks)' },
        { path: '/run/all/default', desc: 'Runs all scripts within all collections (only unnamed blocks)' }
      ]
    },
    {
      group: 'State & Analysis',
      items: [
        { path: '/state', desc: 'Returns current system state with all block details' },
        { path: '/state/raw', desc: 'Returns the raw state of the system (debugging)' },
        { path: '/state/callable', desc: 'Returns the callable named blocks' },
        { path: '/state/named', desc: 'Returns details of all named blocks' },
        { path: '/state/headers', desc: 'Returns headers of all named blocks' },
        { path: '/state/details', desc: 'Returns details of all named blocks' },
        { path: '/state/unnamed', desc: 'Returns details of all unnamed blocks' },
        { path: '/state/anonymous', desc: 'Returns details of all unnamed blocks' },
        { path: '/analyze/fix', desc: 'FIX message analysis' },
        { path: '/analyze/script', desc: 'Script analysis' }
      ]
    },
    {
      group: 'Validation',
      items: [
        { path: '/internal/posts', desc: 'Internal POST handling' },
        { path: '/validate/', desc: 'Validation endpoint' },
        { path: '/validate/{id}', desc: 'Validate specific ID' }
      ]
    }
  ]

  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">RAFT Quick Reference</h1>

      <DocSection id="fix-commands" number="1" title="FIX Commands">
        <div className="space-y-4">
          {fixCommands.map((cmd, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{cmd.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{cmd.desc}</p>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                {cmd.usage}
              </div>
              {cmd.notes && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  Note: {cmd.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="control-flow" number="2" title="Control Flow Commands">
        <div className="space-y-4">
          {controlFlowCommands.map((cmd, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{cmd.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{cmd.desc}</p>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                {cmd.usage}
              </div>
              {cmd.example && (
                <p className="mt-2 text-sm text-gray-500">
                  Example: <code className="bg-gray-200 px-1 rounded">{cmd.example}</code>
                </p>
              )}
              {cmd.notes && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  Note: {cmd.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="special-characters" number="3" title="Special Characters">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Character</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {specialCharacters.map((char, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
                    {char.char}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-purple-600">
                    {char.entity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {char.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection id="misc-commands" number="4" title="Miscellaneous Commands">
        <div className="space-y-4">
          {miscCommands.map((cmd, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{cmd.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{cmd.desc}</p>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                {cmd.usage}
              </div>
              {cmd.notes && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  Note: {cmd.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="endpoints" number="5" title="RAFT Endpoints">
        <div className="space-y-6">
          {endpoints.map((group, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{group.group}</h3>
              <div className="space-y-2">
                {group.items.map((endpoint, i) => (
                  <div key={i} className="bg-white p-3 rounded border border-gray-200">
                    <code className="text-sm font-mono text-blue-600">{endpoint.path}</code>
                    <p className="text-sm text-gray-600 mt-1">{endpoint.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

export default QuickReference 