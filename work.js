export default {
  async fetch(request) {
    try {
      const targetUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
      const modifiedRequest = createModifiedRequest(request, targetUrl);
      
      // 打印调试信息
      console.log('Original Request URL:', request.url);
      console.log('Modified Request URL:', modifiedRequest.url);
      console.log('Modified Request Headers:', modifiedRequest.headers);
      
      const response = await fetch(modifiedRequest);
      
      // 打印调试信息
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      
      return createModifiedResponse(response);
    } catch (error) {
      console.error('Error during fetch:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};

function createModifiedRequest(request, targetUrl) {
  try {
    const originalUrl = new URL(request.url);
    const newUrl = new URL(targetUrl);
    
    // 将原始请求的查询参数附加到新 URL 上
    if (originalUrl.search) {
      newUrl.search = originalUrl.search;
    }
    
    // 创建带有正确 Host 头的新请求
    return new Request(newUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow', // 确保重定向行为一致
    });
  } catch (error) {
    console.error('Error in createModifiedRequest:', error);
    throw error;
  }
}

function createModifiedResponse(response) {
  try {
    // 如果需要，可以在这里对响应进行处理
    // 例如，修改响应头或响应体
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Error in createModifiedResponse:', error);
    throw error;
  }
}
