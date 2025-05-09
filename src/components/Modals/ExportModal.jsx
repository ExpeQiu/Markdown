import { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { exportToPDF, exportToPNG } from '../../utils/export';
import './ExportModal.css';

/**
 * 导出弹窗组件
 * 提供导出为PDF和PNG的选项
 */
function ExportModal({ onClose }) {
  const { documentTitle } = useAppContext();
  
  // 状态
  const [format, setFormat] = useState('pdf');
  const [paperSize, setPaperSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [progress, setProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);
  
  // 获取预览区域的引用
  const previewRef = useRef(document.querySelector('.preview-area'));
  
  // 处理格式选择变更
  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };
  
  // 处理纸张大小选择变更
  const handlePaperSizeChange = (e) => {
    setPaperSize(e.target.value);
  };
  
  // 处理方向选择变更
  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };
  
  // 处理导出过程中的进度更新
  const handleExportProgress = (progress) => {
    setProgress(progress);
  };
  
  // 处理导出完成
  const handleExportComplete = () => {
    setIsExporting(false);
    setProgress(100);
    
    // 2秒后关闭弹窗
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  
  // 处理导出错误
  const handleExportError = (error) => {
    setIsExporting(false);
    setError(`导出失败: ${error.message || '未知错误'}`);
  };
  
  // 处理确认导出按钮点击
  const handleExportClick = async () => {
    setIsExporting(true);
    setError(null);
    setProgress(0);
    
    // 获取预览区域元素
    const previewElement = previewRef.current || document.querySelector('.preview-area');
    
    if (!previewElement) {
      setError('无法找到预览区域');
      setIsExporting(false);
      return;
    }
    
    try {
      // 根据选择的格式执行不同的导出
      if (format === 'pdf') {
        await exportToPDF(
          previewElement,
          documentTitle,
          { paperSize, orientation },
          handleExportProgress,
          handleExportComplete,
          handleExportError
        );
      } else if (format === 'png') {
        await exportToPNG(
          previewElement,
          documentTitle,
          handleExportProgress,
          handleExportComplete,
          handleExportError
        );
      }
    } catch (err) {
      handleExportError(err);
    }
  };
  
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>导出文档</h4>
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        
        <div className="modal-body">
          {!isExporting ? (
            <div className="export-options">
              <div className="form-group">
                <label htmlFor="export-format">导出格式:</label>
                <select 
                  id="export-format"
                  value={format}
                  onChange={handleFormatChange}
                  disabled={isExporting}
                >
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                </select>
              </div>
              
              {format === 'pdf' && (
                <>
                  <div className="form-group">
                    <label htmlFor="pdf-paper-size">纸张大小:</label>
                    <select 
                      id="pdf-paper-size"
                      value={paperSize}
                      onChange={handlePaperSizeChange}
                      disabled={isExporting}
                    >
                      <option value="a4">A4</option>
                      <option value="letter">Letter</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="pdf-orientation">方向:</label>
                    <select 
                      id="pdf-orientation"
                      value={orientation}
                      onChange={handleOrientationChange}
                      disabled={isExporting}
                    >
                      <option value="portrait">纵向 (Portrait)</option>
                      <option value="landscape">横向 (Landscape)</option>
                    </select>
                  </div>
                </>
              )}
              
              {format === 'png' && (
                <div className="form-info">
                  <p>PNG 将导出当前文档的完整视图。</p>
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="export-progress">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-text">
                {progress < 100 ? '导出中...' : '导出完成!'}
                {progress > 0 && progress < 100 && ` (${progress}%)`}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="cancel-button" 
            onClick={onClose}
            disabled={isExporting}
          >
            取消
          </button>
          <button 
            className="export-button"
            onClick={handleExportClick}
            disabled={isExporting}
          >
            {isExporting ? '处理中...' : '确认导出'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal; 