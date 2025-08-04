// .netlify/functions/test.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message: 'Test function works!',
      method: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  };
};
