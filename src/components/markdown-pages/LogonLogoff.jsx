import React from 'react'
import TemplateText from '../TemplateText'

function LogonLogoff() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Logon & Logoff Guide</h1>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#basic-usage" className="text-blue-600 hover:text-blue-800">
              1. Basic Usage
            </a>
          </li>
          <li>
            <a href="#using-alias" className="text-blue-600 hover:text-blue-800">
              2. Using Aliases
            </a>
          </li>
          <li>
            <a href="#host-config" className="text-blue-600 hover:text-blue-800">
              3. Host Configuration
            </a>
          </li>
          <li>
            <a href="#custom-settings" className="text-blue-600 hover:text-blue-800">
              4. Custom Settings
            </a>
          </li>
          <li>
            <a href="#complete-example" className="text-blue-600 hover:text-blue-800">
              5. Complete Example
            </a>
          </li>
        </ul>
      </div>

      <section id="basic-usage" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
          Basic Usage
        </h2>
        <p className="mb-4">
          The most basic form of FIX session management. Uses the default server (currently bgccdev1).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Basic logon/logoff example"
            text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Basic parameters: username, password, sender computer ID, and target computer ID
          </p>
        </div>
      </section>

      <section id="using-alias" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
          Using Aliases
        </h2>
        <p className="mb-4">
          Using variables to store and reuse credentials makes scripts more maintainable.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Using alias variable"
            text={`$alias={USERNAME}
FIX_LOGON $alias {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF $alias`}
          />
          <p className="mt-2 text-sm text-gray-600">
            The <span className="bg-purple-100 px-1 rounded">$alias</span> variable can be reused throughout the script
          </p>
        </div>
      </section>

      <section id="host-config" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">3</span>
          Host Configuration
        </h2>
        <p className="mb-4">
          Host configuration requires matching the correct host type (BGC/GFI) with the corresponding Target_Comp.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Specifying host"
            text={`$host=bgccdev1
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H $host
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Use <span className="bg-purple-100 px-1 rounded">-H</span> flag to specify the host
          </p>
        </div>
      </section>

      <section id="custom-settings" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">4</span>
          Custom Settings
        </h2>
        <p className="mb-4">
          Customize session behavior by providing your own settings file.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Using custom settings file"
            text={`$settingsFile=docs_config_gfi.cfg
FIX_LOGON {USERNAME} {PASSWORD} JPAPI GFI -s $settingsFile
FIX_LOGOFF {USERNAME}`}
          />
          <p className="mt-2 text-sm text-gray-600">
            Use <span className="bg-purple-100 px-1 rounded">-s</span> flag to specify a custom settings file
          </p>
        </div>
      </section>

      <section id="complete-example" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">5</span>
          Complete Example
        </h2>
        <p className="mb-4">
          A comprehensive example combining all available options and best practices.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <TemplateText
            description="Complete example with all options"
            text={`$alias={USERNAME}
$password={PASSWORD}
$senderCompID={SENDER_COMPUTER_ID}
$targetCompID={TARGET_COMP_ID}
$host=bgccdev1
$fixVersion=4.4
$settingsFile=docs_config_gfi.cfg
FIX_LOGON $alias $password $senderCompID $targetCompID -H $host -V $fixVersion -s $settingsFile
FIX_LOGOFF $alias`}
          />
          <p className="mt-2 text-sm text-gray-600">
            <strong>Key Features:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Variable definitions for better maintainability</li>
              <li>Host specification with <span className="bg-purple-100 px-1 rounded">-H</span> flag</li>
              <li>FIX version control with <span className="bg-purple-100 px-1 rounded">-V</span> flag</li>
              <li>Custom settings with <span className="bg-purple-100 px-1 rounded">-s</span> flag</li>
            </ul>
          </p>
        </div>
      </section>
    </div>
  )
}

export default LogonLogoff 