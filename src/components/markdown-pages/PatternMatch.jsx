import React from 'react'
import TemplateText from '../TemplateText'

function PatternMatch() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Pattern Matching Guide</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#basic-patterns" className="text-blue-600 hover:text-blue-800">
              1. Basic Pattern Matching
            </a>
          </li>
          <li>
            <a href="#advanced-patterns" className="text-blue-600 hover:text-blue-800">
              2. Advanced Pattern Matching
            </a>
            <ul className="pl-4 mt-2 space-y-1">
              <li>
                <a href="#regex" className="text-blue-600 hover:text-blue-800">
                  2.1 Regular Expressions
                </a>
              </li>
              <li>
                <a href="#multi-value" className="text-blue-600 hover:text-blue-800">
                  2.2 Multi-Value Patterns
                </a>
              </li>
              <li>
                <a href="#type-constraints" className="text-blue-600 hover:text-blue-800">
                  2.3 Type Constraints
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <section id="basic-patterns" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          Basic Pattern Matching
        </h2>

        <p className="mb-4">
          The simplest form of pattern matching is exact value matching.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Basic pattern matching"
            text={`FIX_SEND $alias 35=1|112=test| -d |
FIX_ACK $alias -p 112=test`}
          />
          <p className="mt-2 text-sm text-gray-600">
            This example shows exact matching where field 112 must exactly equal "test"
          </p>
        </div>
      </section>

      <section id="advanced-patterns" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Advanced Pattern Matching
        </h2>

        <div id="regex" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">2.1</span>Regular Expressions
          </h3>
          <p className="mb-4">
            For more complex matching needs, regular expressions can be used.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <TemplateText
              description="Regex pattern matching"
              text={`FIX_ACK $alias -p 112=<string:test.*>`}
            />
            <p className="mt-2 text-sm text-gray-600">
              Matches any string starting with "test"
            </p>
          </div>
        </div>

        <div id="multi-value" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">2.2</span>Multi-Value Patterns
          </h3>
          <p className="mb-4">
            Multiple fields can be matched in sequence using delimiters. The default delimiter is <span className="bg-purple-100 px-1 rounded">SOH (/u0001)</span>, 
            but can be specified using the -d flag.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <TemplateText
              description="Ordered pattern matching with delimiters"
              text={`FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=ALL_ALL|263=1 -d | -F 320
FIX_ACK {USERNAME} -p 8528=<?>|6215=<?> -d | -t 10000`}
            />
            <p className="mt-2 text-sm text-gray-600">
              <span className="bg-purple-100 px-1 rounded">{'<?>'}</span> matches any value, so this matches any message containing fields 8528 and 6215 in sequence
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-md font-semibold mb-2 text-gray-700">Pattern Negation:</h4>
            <TemplateText
              description="Pattern negation"
              text={`FIX_ACK {USERNAME} -p [!35=10]`}
            />
            <p className="mt-2 text-sm text-gray-600">
              The <span className="bg-purple-100 px-1 rounded">!</span> prefix means "does NOT equal"
            </p>
          </div>
        </div>

        <div id="boolean-operations" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">2.3</span>Boolean Operations
          </h3>
          <p className="mb-4">
            Patterns can be combined using Boolean expressions. Square brackets <span className="bg-purple-100 px-1 rounded">[]</span> 
            with whitespace-separated patterns create an "AND" condition.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-md font-semibold mb-2 text-gray-700">AND Operation:</h4>
            <TemplateText
              description="Boolean AND pattern matching"
              text={`FIX_ACK {USERNAME} -p [167=<?> 8528=<?>|6215=<?>]`}
            />
            <p className="mt-2 text-sm text-gray-600">
              Matches messages that contain both field 167 AND the sequence 8528,6215
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-md font-semibold mb-2 text-gray-700">OR Operation:</h4>
            <TemplateText
              description="Boolean OR pattern matching"
              text={`FIX_ACK {USERNAME} -p 12345=fail -p [167=<?> 8528=<?>|6215=<?>]`}
            />
            <p className="mt-2 text-sm text-gray-600">
              Multiple <span className="bg-purple-100 px-1 rounded">-p</span> flags create an OR condition
            </p>
          </div>
        </div>

        <div id="type-constraints" className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">2.4</span>Type Constraints
          </h3>
          <p className="mb-4">
            Values can be constrained by type and specific conditions using the syntax:
            <span className="bg-purple-100 px-1 rounded">{'<type>'}</span>, 
            <span className="bg-purple-100 px-1 rounded">{'<type:constraint>'}</span>, or
            <span className="bg-purple-100 px-1 rounded">{'<type:==val1,val2==>'}</span>
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-2 text-gray-700">Character Type:</h4>
              <TemplateText
                description="Character constraints"
                text={`FIX_ACK {USERNAME} -p field=<char:a||b||c>
# Alternative: <char:==a,b,c==> or <==a,b,c==>`}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-2 text-gray-700">String Type (Regex):</h4>
              <TemplateText
                description="String pattern with regex"
                text={`# Match exactly 5-7 alphanumeric characters
FIX_ACK {USERNAME} -p 12345=<string:^[a-zA-Z0-9]{5,7}$>`}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-2 text-gray-700">Numeric Types:</h4>
              <TemplateText
                description="Integer and float constraints"
                text={`# Integer: greater than 5 AND less than or equal to 10, OR exactly 12
FIX_ACK {USERNAME} -p field=<int:?>5&&?<=10||?==12>

# Float: similar syntax with decimal support
FIX_ACK {USERNAME} -p price=<float:?>5.0&&?<=10||?==12.55>`}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-2 text-gray-700">Timestamp Type:</h4>
              <TemplateText
                description="Timestamp constraints"
                text={`# Check for timestamp between now and 15 seconds from now
FIX_ACK {USERNAME} -p 60=<timestamp:?>=NOW()&&?<PLUS(NOW(),SECONDS(15))>`}
              />
            </div>
          </div>
        </div>

        <div id="whitespace" className="mt-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            <span className="text-blue-600 mr-2">2.5</span>Handling Whitespace
          </h3>
          <p className="mb-4">
            To include whitespace in patterns, either:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Enclose the pattern in quotes</li>
            <li>Use multi-line blocks with triple backticks</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg">
            <TemplateText
              description="Pattern matching with whitespace"
              text={`FIX_ACK {USERNAME} -p "35=It Accepts This Whitespace As    Valid"`}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PatternMatch 