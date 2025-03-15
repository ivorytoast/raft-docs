import React from 'react'
import TemplateText from '../TemplateText'

function LogonLogoff() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Logon & Logoff Guide</h1>

      <section>
        <p className="mb-4 text-gray-900">
          Baseline BGC (uses default server -- currently bgccdev1, but this might change)
        </p>
        <TemplateText
          description="Basic logon/logoff example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          With Alias
        </p>
        <TemplateText
          description="Using alias variable"
          text={`$alias={USERNAME}
FIX_LOGON $alias {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID}
FIX_LOGOFF $alias`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          With Host: Remember, you need to use a BGC host for BGC Target_Comp, and vice versa for GFI
        </p>
        <TemplateText
          description="Specifying host"
          text={`$host=bgccdev1
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H $host
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          With Fix Version
        </p>
        <TemplateText
          description="Specifying FIX version"
          text={`$fixVersion=4.4
FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -V $fixVersion
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          With Settings: This allows a user to specify their own unique settings if the defaults do not satisfy their requirements
        </p>
        <TemplateText
          description="Using custom settings file"
          text={`$settingsFile=docs_config_gfi.cfg
FIX_LOGON {USERNAME} {PASSWORD} JPAPI GFI -s $settingsFile
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Sessions are identified by the alias. Usually, the alias is just the name of the user. If, however, there are two users with the same name, one of the sessions must be given a custom alias. This is done via the -A flag -- although the user is the session is identified by the customalias parameter ("myalias" by default)
        </p>
        <TemplateText
          description="Using custom alias"
          text={`$alias={USERNAME}
$customalias=myalias
FIX_LOGON $alias {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -A $customalias
FIX_LOGOFF $customalias`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Combining all of the above...
        </p>
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
      </section>
    </div>
  )
}

export default LogonLogoff 