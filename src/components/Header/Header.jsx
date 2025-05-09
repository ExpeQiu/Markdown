import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Header.css';

/**
 * 页眉组件
 * 显示应用Logo、文档标题和操作按钮
 */
function Header({ onExportClick }) {
  const { documentTitle, setDocumentTitle } = useAppContext();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // 处理标题更改
  const handleTitleChange = (e) => {
    setDocumentTitle(e.target.value);
  };
  
  // 处理标题编辑状态切换
  const toggleTitleEdit = () => {
    setIsEditingTitle(!isEditingTitle);
  };
  
  // 处理按键事件（回车键提交修改）
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };
  
  // 处理保存按钮点击
  const handleSaveClick = () => {
    // 在实际应用中，这里可能需要调用API或保存至云端
    // 现在只是一个视觉反馈，因为我们已经在上下文中自动保存
    alert('文档已保存');
  };
  
  return (
    <header className="app-header">
      <div className="logo">MarkCraft</div>
      
      <div className="document-title-container">
        {isEditingTitle ? (
          <input
            type="text"
            className="document-title"
            value={documentTitle}
            onChange={handleTitleChange}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div 
            className="document-title" 
            onClick={toggleTitleEdit}
            title="点击编辑标题"
          >
            {documentTitle}
          </div>
        )}
      </div>
      
      <div className="actions">
        <button 
          className="secondary" 
          onClick={handleSaveClick}
          title="保存文档"
        >
          保存
        </button>
        <button 
          className="primary" 
          onClick={onExportClick}
          title="导出文档"
        >
          导出
        </button>
      </div>
    </header>
  );
}

export default Header; 