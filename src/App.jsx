import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import GettingStarted from './components/markdown-pages/GettingStarted'
import ComponentBuilder from './components/pages/ComponentBuilder'
import Features from './components/markdown-pages/Features'
import Examples from './components/markdown-pages/Examples'
import MarkdownPage from './components/MarkdownPage'
import FIXExamples from './components/markdown-pages/FIXExamples'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<GettingStarted />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="features" element={<Features />} />
        <Route path="examples" element={<Examples />} />
        <Route path="markdown" element={<MarkdownPage />} />
        <Route path="fix-examples" element={<FIXExamples />} />
        <Route path="components" element={<ComponentBuilder />} />
      </Route>
    </Routes>
  )
}

export default App
