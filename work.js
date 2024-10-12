export default {
  async fetch(request) {
    // 创建一个新的 URL 对象，其中包含想要转发的目标 URL
    const newUrl = new URL('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent');
    
    // 如果原始请求有查询参数，我们需要将其附加到新 URL 上
    const originalUrl = new URL(request.url);
    if (originalUrl.search) {
      newUrl.search = originalUrl.search;
    }
    
    // 直接使用新的 URL 来发送请求
    return fetch(newUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  },
};
