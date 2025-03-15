import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/markdown-pages/HomePage'
import GettingStarted from './components/markdown-pages/GettingStarted'
import ComponentBuilder from './components/pages/ComponentBuilder'
import FIXExamples from './components/markdown-pages/FIXExamples'
import PatternMatch from './components/markdown-pages/PatternMatch'
import ControlFlow from './components/markdown-pages/ControlFlow'
import LogonLogoff from './components/markdown-pages/LogonLogoff'
import FunctionsVariables from './components/markdown-pages/FunctionsVariables'
import SendAck from './components/markdown-pages/SendAck'
import SimpleFIXBreakdown from './components/SimpleFIXBreakdown'
import ScriptReference from './components/markdown-pages/ScriptReference'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="pattern-match" element={<PatternMatch />} />
        <Route path="fix-examples" element={<FIXExamples />} />
        <Route path="components" element={<ComponentBuilder />} />
        <Route path="control-flow" element={<ControlFlow />} />
        <Route path="logon-logoff" element={<LogonLogoff />} />
        <Route path="functions-variables" element={<FunctionsVariables />} />
        <Route path="send-ack" element={<SendAck />} />
        <Route path="fix-breakdown" element={<SimpleFIXBreakdown />} />
        <Route path="script-reference" element={<ScriptReference />} />
      </Route>
    </Routes>
  )
}

export default App
