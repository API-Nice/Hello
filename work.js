export default {
  async fetch(request) {
    const newUrl = new URL('https://generativelanguage.googleapis.com');
    const originalUrl = new URL(request.url);

    // 将查询参数从原始 URL 附加到新 URL 上
    if (originalUrl.search) {
      newUrl.search = originalUrl.search;
    }

    // 创建一个新的 Headers 对象，复制原有的 headers 并添加 Host 头
    const headers = new Headers(request.headers);
    headers.set('Host', newUrl.host);

    // 创建一个带有正确 Host 头的新请求
    const modifiedRequest = new Request(newUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'follow' // 确保跟随重定向
    });

    // 发送修改后的请求
    return fetch(modifiedRequest);
  },
};
