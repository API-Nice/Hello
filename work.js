export default {
  async fetch(request) {
    // 创建一个新的 URL 对象，其中包含想要转发的目标 URL
    const newUrl = new URL('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent');
    
    // 如果原始请求有查询参数，我们需要将其附加到新 URL 上
    const originalUrl = new URL(request.url);
    if (originalUrl.search) {
      newUrl.search = originalUrl.search;
    }
    
    // 使用新的 URL 来创建一个带有正确 Host 头的新请求
    const modifiedRequest = new Request(newUrl.toString(), request); // 这会复制原始请求的所有属性，包括 headers 和 body
    
    // 发送修改后的请求
    return fetch(modifiedRequest, { method: request.method, body: request.body });
  },
};
