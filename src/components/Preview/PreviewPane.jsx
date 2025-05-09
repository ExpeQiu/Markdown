import { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import 'highlight.js/styles/github.css'; // 默认代码高亮样式
import './PreviewPane.css';

// 导入主题样式
import '../../themes/default.css';
import '../../themes/dark.css';
import '../../themes/academic.css';
import '../../themes/technical.css';

/**
 * Markdown预览组件
 * 显示Markdown渲染后的HTML预览
 */
function PreviewPane() {
  const { 
    previewHTML, 
    activeTheme, 
    customCSS, 
    enableCustomCSS 
  } = useAppContext();
  
  const previewRef = useRef(null);
  const customStyleRef = useRef(null);
  
  // 应用自定义CSS
  useEffect(() => {
    if (customStyleRef.current) {
      if (enableCustomCSS && customCSS) {
        // 应用自定义CSS
        customStyleRef.current.textContent = customCSS;
      } else {
        // 清除自定义CSS
        customStyleRef.current.textContent = '';
      }
    }
  }, [customCSS, enableCustomCSS]);
  
  // 生成预览区内容的className，基于当前激活的主题
  const previewClassName = `preview-area preview-${activeTheme}`;
  
  return (
    <section className="preview-pane">
      {/* 用于注入自定义CSS的style标签 */}
      <style ref={customStyleRef}></style>
      
      {/* 预览区域 */}
      <div 
        ref={previewRef}
        className={previewClassName}
        dangerouslySetInnerHTML={{ __html: previewHTML }}
      />
    </section>
  );
}

export default PreviewPane; 