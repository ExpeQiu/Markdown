/**
 * 导出工具函数
 * 提供将Markdown文档导出为PNG和PDF的功能
 */

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * 将预览区域导出为PNG图片
 * @param {HTMLElement} previewElement - 预览区域DOM元素
 * @param {string} fileName - 导出的文件名（不包含扩展名）
 * @param {Function} onProgress - 进度回调函数（0-100）
 * @param {Function} onComplete - 完成回调函数（返回下载URL）
 * @param {Function} onError - 错误回调函数
 */
export async function exportToPNG(previewElement, fileName, onProgress, onComplete, onError) {
  try {
    // 进度开始
    onProgress && onProgress(10);
    
    // 使用html2canvas将DOM元素转换为canvas
    const canvas = await html2canvas(previewElement, {
      scale: 2, // 提高图像质量
      useCORS: true, // 允许跨域图片
      logging: false, // 关闭日志
      backgroundColor: '#ffffff', // 背景色为白色
      onclone: (document) => {
        // 可以在这里修改克隆的DOM，例如添加临时样式
        onProgress && onProgress(30);
      }
    });
    
    // 进度更新
    onProgress && onProgress(70);
    
    // 从canvas获取图像数据URL
    const imgData = canvas.toDataURL('image/png');
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `${fileName || 'markdown-export'}.png`;
    
    // 进度更新
    onProgress && onProgress(90);
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 完成回调
    onProgress && onProgress(100);
    onComplete && onComplete(imgData);
  } catch (error) {
    console.error('导出为PNG失败:', error);
    onError && onError(error);
  }
}

/**
 * 将预览区域导出为PDF文档
 * @param {HTMLElement} previewElement - 预览区域DOM元素
 * @param {string} fileName - 导出的文件名（不包含扩展名）
 * @param {Object} options - PDF导出选项
 * @param {string} options.paperSize - 纸张大小（'a4'或'letter'）
 * @param {string} options.orientation - 方向（'portrait'或'landscape'）
 * @param {Function} onProgress - 进度回调函数（0-100）
 * @param {Function} onComplete - 完成回调函数
 * @param {Function} onError - 错误回调函数
 */
export async function exportToPDF(previewElement, fileName, options, onProgress, onComplete, onError) {
  try {
    // 默认选项
    const defaultOptions = {
      paperSize: 'a4',
      orientation: 'portrait'
    };
    
    // 合并选项
    const pdfOptions = { ...defaultOptions, ...options };
    
    // 进度开始
    onProgress && onProgress(10);
    
    // 使用html2canvas将DOM元素转换为canvas
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (document) => {
        onProgress && onProgress(30);
      }
    });
    
    // 进度更新
    onProgress && onProgress(60);
    
    // 获取canvas尺寸
    const imgWidth = pdfOptions.orientation === 'portrait' ? 210 : 297;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    // 创建PDF文档
    const pdf = new jsPDF({
      orientation: pdfOptions.orientation,
      unit: 'mm',
      format: pdfOptions.paperSize
    });
    
    // 将canvas添加到PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    
    // 处理多页（如果内容超过一页）
    let heightLeft = imgHeight;
    let position = 0;
    const pageHeight = pdfOptions.orientation === 'portrait' ? 
      (pdfOptions.paperSize === 'a4' ? 297 : 279.4) : 
      (pdfOptions.paperSize === 'a4' ? 210 : 215.9);
    
    // 进度更新
    onProgress && onProgress(75);
    
    // 添加后续页面（如果需要）
    while (heightLeft > pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, -position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // 进度更新
    onProgress && onProgress(90);
    
    // 保存PDF文件
    pdf.save(`${fileName || 'markdown-export'}.pdf`);
    
    // 完成回调
    onProgress && onProgress(100);
    onComplete && onComplete();
  } catch (error) {
    console.error('导出为PDF失败:', error);
    onError && onError(error);
  }
} 