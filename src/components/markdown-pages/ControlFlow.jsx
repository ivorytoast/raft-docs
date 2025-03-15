import React from 'react'
import TemplateText from '../TemplateText'

function ControlFlow() {
  return (
    <div className="space-y-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Control Flow Guide</h1>

      <section>
        <p className="mb-4 text-gray-900">
          Every executed RAFT command can be interpreted as a Boolean value. For most operations -- like a FIX_ACK, for example -- the Boolean value is simply true on success and false on failure. However, Booleans can be specified manually with TRUE and FALSE.
        </p>
        <p className="mb-4 text-gray-900">
          Below is a command that simply runs PRINT (which simply prints the given line and returns true) and runs TRUE (which does nothing and returns true)
        </p>
        <TemplateText
          description="Basic boolean operations"
          text={`PRINT testing print succcess
TRUE`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Additionally, OR and NOT are supported: NOT [] takes exactly one command inside the bracket arguments (a Boolean or a RAFT line) and inverts the result. OR [] [] takes two bracketed arguments and returns true if either argument is true.
        </p>
        <p className="mb-4 text-gray-900">
          Note that an AND [] [] operator is not provided: the execution of multiple RAFT commands in order is, in itself, an AND operation!
        </p>
        <p className="mb-4 text-gray-900">
          All four lines below should evaluate to true (assuming that FIX was able to connect in fix_docs_baseline_logon_logoff)
        </p>
        <TemplateText
          description="OR and NOT operations"
          text={`TRUE
NOT [FALSE]
OR [FALSE] [fix_docs_baseline_logon_logoff]
NOT [NOT [ OR [FALSE] [fix_docs_baseline_logon_logoff ] ] ]`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          RAFT can use Booleans in different forms of control flow. The IF [] [] [] command (alternatively IF [] THEN [] ELSE []) evaluates a command within the IF [] block; if true, the code within the second [] (the "then" block) is executed, otherwise the "else" block is executed. Any of the blocks are allowed to remain empty (an if-then statement with no else body is simply written as IF [condition] THEN [success] ELSE []
        </p>
        <TemplateText
          description="IF THEN ELSE example"
          text={`IF [TRUE] [PRINT this is the true branch] [PRINT this the false branch]`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          Commands can also be repeated a certain number of times with the REPEAT [] command which takes an -X flag that specifies the number of iterations to perform. Note that REPEAT [] breaks on failure -- that is, if any command returns failure, the remaining commands will NOT execute. That is "REPEAT [FALSE] -X 5" will break as soon as the first iteration is run.
        </p>
        <TemplateText
          description="REPEAT command examples"
          text={`REPEAT [PRINT testing repeat] -X 5
REPEAT [FALSE] -X 5`}
        />
      </section>

      <section>
        <p className="mb-4 text-gray-900">
          One important word of caution about control flow is the potential complexity associated with nesting together multiple IF-THEN statements. IFs are preprocessed by default, and IF statements CAN be fed to other IF statements. For smaller blocks this isn't an issue, but even with a few levels of nesting, the complexity can skyrocket and bring RAFT to a halt.
        </p>
        <p className="mb-4 text-gray-900">
          This complexity can be avoided by using the SKIP_PREPROCESSOR [] command: anything wrapped inside the brackets will NOT be checked at compile-time and simply be evaluated as RAFT runs. This means that SKIP_PREPROCESSOR is, by design, less safe: errors that could have been caught during compilation are now ignored.
        </p>
        <p className="mb-4 text-gray-900">
          Also, runtime evaluation might mean slower execution of each command (because the command has to be interpreted in real time), so SKIP_PREPROCESSOR [] should not be used for time-sensitive execution or stress-testing.
        </p>
        <p className="mb-4 text-gray-900">
          Words of warning aside, however, for most cases (especially cases in which control flow operators are nested within each other), the benefits of skipping the preprocessor far outweigh the inconveniences.
        </p>
        <TemplateText
          description="SKIP_PREPROCESSOR example"
          text={`SKIP_PREPROCESSOR [IF [TRUE] [IF [TRUE] [PRINT nested true, skipped preprocessor] [PRINT nested false, skipped preprocessor]] [PRINT false, how did I get here!?]]`}
        />
      </section>
    </div>
  )
}

export default ControlFlow 