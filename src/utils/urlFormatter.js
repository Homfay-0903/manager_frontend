// utils/urlFormatter.js
export const formatResourceUrl = (url) => {
    if (!url) return '';
    
    // 生产环境：将开发环境地址转换为相对路径
    if (import.meta.env.PROD && (url.includes('127.0.0.1:3007') || url.includes('localhost:3007'))) {
        const filename = url.split('/').pop();
        return `/upload/${filename}`;
    }
    
    // 开发环境：保持原样
    return url;
};