import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import ThemeSelector from './ThemeSelector';
import CustomCssEditor from './CustomCssEditor';
import './StylePanel.css';

/**
 * 样式面板组件
 * 提供主题选择和自定义CSS功能
 */
function StylePanel() {
  // 获取上下文数据
  const { 
    activeTheme,
    setActiveTheme,
    themes,
    customCSS, 
    setCustomCSS,
    enableCustomCSS,
    setEnableCustomCSS
  } = useAppContext();
  
  // 标签页状态
  const [activeTab, setActiveTab] = useState('themes');
  
  // 处理标签切换
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  // 处理主题选择
  const handleThemeSelect = (themeId) => {
    setActiveTheme(themeId);
  };
  
  // 处理CSS变更
  const handleCssChange = (css) => {
    setCustomCSS(css);
  };
  
  // 处理CSS启用状态切换
  const handleEnableCustomCss = (enabled) => {
    setEnableCustomCSS(enabled);
  };
  
  // 处理应用CSS按钮点击
  const handleApplyCss = () => {
    // 如果CSS还未启用，则启用它
    if (!enableCustomCSS) {
      setEnableCustomCSS(true);
    }
    
    // 可以添加额外的验证或处理逻辑
    // 例如检查CSS是否有效
  };
  
  return (
    <aside className="styling-panel">
      <h3>样式与排版</h3>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'themes' ? 'active' : ''}`}
          onClick={() => handleTabChange('themes')}
        >
          主题模板
        </button>
        <button 
          className={`tab-button ${activeTab === 'custom-css' ? 'active' : ''}`}
          onClick={() => handleTabChange('custom-css')}
        >
          自定义 CSS
        </button>
      </div>
      
      {activeTab === 'themes' ? (
        <ThemeSelector 
          themes={themes}
          activeTheme={activeTheme}
          onThemeSelect={handleThemeSelect}
        />
      ) : (
        <CustomCssEditor 
          value={customCSS}
          enabled={enableCustomCSS}
          onChange={handleCssChange}
          onToggle={handleEnableCustomCss}
          onApply={handleApplyCss}
        />
      )}
    </aside>
  );
}

export default StylePanel;