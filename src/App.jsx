import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import EditorPane from './components/Editor/EditorPane'
import PreviewPane from './components/Preview/PreviewPane'
import StylePanel from './components/StylePanel/StylePanel'
import Footer from './components/Footer/Footer'
import ExportModal from './components/Modals/ExportModal'
import { AppProvider } from './context/AppContext'

function App() {
  // 控制导出弹窗显示状态
  const [showExportModal, setShowExportModal] = useState(false)
  
  return (
    <AppProvider>
      <div className="app-container">
        <Header onExportClick={() => setShowExportModal(true)} />
        
        <div className="main-content">
          <EditorPane />
          <PreviewPane />
          <StylePanel />
        </div>
        
        <Footer />
        
        {showExportModal && (
          <ExportModal 
            onClose={() => setShowExportModal(false)} 
          />
        )}
      </div>
    </AppProvider>
  )
}

export default App 