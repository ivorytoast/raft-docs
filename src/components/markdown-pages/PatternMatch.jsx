import React from 'react'
import TemplateText from '../TemplateText'

function PatternMatch() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Pattern Matching Guide</h1>

      <section>
        <p className="mb-4 text-gray-900">
          The -p option starts a pattern match. If given "-p C=c", this will scan the message for the presence of the tag C with the exact value of c. In this case, we are making sure there is a "35" tag present in the message, with a value of "8"
        </p>
        <TemplateText
          description="Basic pattern matching example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H cdev2 -s docs_config_gfi.cfg -i SD
NEW_ORDER_SINGLE_BUY_NO_ACK $alias={USERNAME} $symbol=EURUSD $mqsize=15 $fwdprice=11.3 $volatility=21.25 $tablecode=EURUSD_1_1_0_8_3
FIX_ACK {USERNAME} -p [35=8] -t 3000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Now the opposite. The field "35" does NOT equal "10". Therefore, we can say it does NOT equal "10"
        </p>
        <TemplateText
          description="Pattern negation example"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H cdev2 -s docs_config_gfi.cfg -i SD
NEW_ORDER_SINGLE_BUY_NO_ACK $alias={USERNAME} $symbol=EURUSD $mqsize=15 $fwdprice=11.3 $volatility=21.25 $tablecode=EURUSD_1_1_0_8_3
FIX_ACK {USERNAME} -p [!35=10] -t 3000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Multiple fields in a row can be matched by joining them with a delimiter. If a delimiter is not specified with a -d flag, multiple fields must be separated by a /u0001 -- SOH -- character. Note: {'<?>'}  matches any string, so 8528={'<?>'}|6215={'<?>'} -d | simply matches any message that contains fields 8528 and 6215, back to back, with any value (e.g. 8528=hello|6215=world)
        </p>
        <TemplateText
          description="Ordered pattern matching with delimiters"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H bgccdev1
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=ALL_ALL|263=1 -d | -F 320
FIX_ACK {USERNAME} -p 8528=<?>|6215=<?> -d | -t 10000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Patterns can also be matched with Boolean expressions. Whitespace-separated patterns inside [] (square brackets) are treated as an "AND": -p [A=a B=b] matches messages that contain both A=a and B=b anywhere in the message (not necessarily next to each other or in order)
        </p>
        <TemplateText
          description="Boolean AND pattern matching"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H bgccdev1
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=ALL_ALL|263=1 -d | -F 320
FIX_ACK {USERNAME} -p [167=<?> 8528=<?>|6215=<?>] -d | -t 10000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Multiple -p flags are treated as an "OR". If any of the given patterns is a match for a message, the check passes. That is -p A=a -p B=b will match messages that contain at least one of A=a or B=b
        </p>
        <TemplateText
          description="Boolean OR pattern matching"
          text={`FIX_LOGON {USERNAME} {PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H bgccdev1
FIX_SEND {USERNAME} 35=x|320=ID|559=0|55=ALL_ALL|263=1 -d | -F 320
FIX_ACK {USERNAME} -p 12345=fail -p [167=<?> 8528=<?>|6215=<?>] -d | -t 10000
FIX_LOGOFF {USERNAME}`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Field 12345=fail checks for an exact match: a field 12345 with the value "fail". Fields 167 and 8528, on the other hand, are allowed to match {'<?>'}, where {'<?>'} is a wildcard meaning "any" -- as long as the field is present, the match is considered successful. This can be expanded -- pattern matching supports a variety of different matches. The standard structure is as follows {'<type>'}, {'<type:constraint>'}, {'<==val1,val2==>'}, or {'<type:==val1,val2==>'}
        </p>
        <p className="mb-4 text-gray-900">
          Values enclosed in ==val1,val2,val3== means that the field must match one of the given values exactly. If a type is specified, the value must match the type. Currently supported types are char, string, int, float, bool, and timestamp; and constraints are processed differently for each type.
        </p>
        <TemplateText
          description="Type constraints examples"
          text={`# char: <char:a||b||c> where || is "OR"; alternatively use <char:==a,b,c==> or <==a,b,c==>

# string: <string:regex> where the regex is standard java
# since [, ", and ] are treated as special characters, they must be provided 
# using alternative syntax -- &lbrack; for [, &rbrack; for ], and &quot; for "
# Example matching field 12345 with any alphanumeric input with exactly 5-7 characters:
FIX_ACK {USERNAME} -p 12345=<string:^&lbrack;a-zA-Z0-9&rbrack;{5,7}$>

# int: <int:?>5&&?<=10||?==12> where "?" represents the unknown, || is an OR, && is an AND
# Example matching value greater than 5 and less than or equal to 10 -- OR exactly equal to 12:
FIX_ACK {USERNAME} -p 12345=<int:?>5&&?<=10||?==12>

# float: identical to int, but with support for double precision floats
FIX_ACK {USERNAME} -p 12345=<float:?>5.0&&?<=10||?==12.55>

# bool: <bool:true> or <bool:false> 
# Legal values are (case-insensitive): y, n, yes, no, 1, 0, t, true, f, false
FIX_ACK {USERNAME} -p 12345=<bool:true>

# timestamp: <timestamp>, <timestamp:exact>, or <timestamp:function>
# Timestamps can process an exact time (<timestamp:12345>) or use functions:
# NOW(), PLUS()/MINUS() with time units (YEARS, MONTHS, WEEKS, DAYS, HOURS, MINUTES, SECONDS)
# Example checking for timestamp between now and 15 seconds from now:
FIX_ACK {USERNAME} -p 60=<timestamp:?>=NOW()&&?<PLUS(NOW(),SECONDS(15))>`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          What about whitespace? To have whitespace -- add quotes around the whole pattern. Alternatively, multi-line blocks can be enclosed in ``` ```
        </p>
        <TemplateText
          description="Pattern matching with whitespace"
          text={`FIX_LOGON {USERNAME}{PASSWORD} {SENDER_COMPUTER_ID} {TARGET_COMP_ID} -H cdev2 -s docs_config_gfi.cfg -i SD
NEW_ORDER_SINGLE_BUY_NO_ACK $alias={USERNAME} $symbol=EURUSD $mqsize=15 $fwdprice=11.3 $volatility=21.25 
FIX_ACK {USERNAME} -p "!35=It Accepts This Whitespace As    Valid" -t 3000
FIX_LOGOFF {USERNAME}`}
        />
      </section>
    </div>
  )
}

export default PatternMatch 