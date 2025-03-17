import React from 'react'

function SpecialCharacters() {
  const specialCharacters = [
    { char: '\n', entity: '&newline;', desc: 'Newline character', example: 'PRINT hello&newline;world' },
    { char: ' ', entity: '&space;', desc: 'Space character', example: 'hello&space;world' },
    { char: '$', entity: '&dollar;', desc: 'Dollar sign (for variables)', example: '$variable or &dollar;variable' },
    { char: '%', entity: '&percent;', desc: 'Percent sign', example: '100&percent;' },
    { char: '&', entity: '&amp;', desc: 'Ampersand', example: 'A&amp;B' },
    { char: '#', entity: '&hash;', desc: 'Hash (for comments)', example: '&hash; Comment' },
    { char: '=', entity: '&eq;', desc: 'Equals sign', example: 'field&eq;value' },
    { char: '[', entity: '&lbrack;', desc: 'Left bracket', example: '&lbrack;condition&rbrack;' },
    { char: ']', entity: '&rbrack;', desc: 'Right bracket', example: '&lbrack;condition&rbrack;' },
    { char: 'SoH', entity: '&fixdelim;', desc: 'FIX delimiter (\\u0001)', example: 'field=value&fixdelim;' },
    { char: '"', entity: '&quote;', desc: 'Quote', example: '&quote;text&quote;' },
    { char: '<', entity: '&lt;', desc: 'Less than', example: 'if [x &lt; 10]' },
    { char: '>', entity: '&gt;', desc: 'Greater than', example: 'if [x &gt; 10]' },
    { char: '|', entity: '&pipe;', desc: 'Pipe (field separator)', example: 'field1=value1&pipe;field2=value2' },
    { char: '{', entity: '&lcurl;', desc: 'Left curly brace', example: '&lcurl;USERNAME&rcurl;' },
    { char: '}', entity: '&rcurl;', desc: 'Right curly brace', example: '&lcurl;USERNAME&rcurl;' },
    { char: ':', entity: '&colon;', desc: 'Colon', example: 'label&colon;value' },
    { char: '-', entity: '&dash;', desc: 'Dash', example: 'field&dash;name' },
    { char: ';', entity: '&semicolon;', desc: 'Semicolon', example: 'cmd1&semicolon;cmd2' },
    { char: '_', entity: '&underscore;', desc: 'Underscore', example: 'field&underscore;name' },
    { char: "'", entity: '&apostrophe;', desc: 'Apostrophe', example: '&apostrophe;text&apostrophe;' },
    { char: '\\', entity: '&backslash;', desc: 'Backslash', example: 'path&backslash;file' },
    { char: '/', entity: '&frontslash;', desc: 'Forward slash', example: 'path&frontslash;file' },
    { char: '`', entity: '&backtick;', desc: 'Backtick', example: '&backtick;code&backtick;' },
    { char: ',', entity: '&comma;', desc: 'Comma', example: 'value1&comma;value2' }
  ]

  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">RAFT Special Characters Reference</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="mb-4 text-gray-600">
          When writing RAFT scripts, you can use these special character entities to represent characters that might otherwise be interpreted as syntax or be difficult to type directly.
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Character
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Example
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-600">
                    {char.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Note:</h3>
          <p className="text-sm text-yellow-700">
            The characters '&lt;' and '&gt;' are also automatically converted to their Unicode equivalents ("\u003C" and "\u003E") 
            as they are special characters in HTML.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecialCharacters 