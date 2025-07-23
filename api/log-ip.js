// Vercel serverless function to log visitor IP addresses
export default function handler(req, res) {
  // Extract IP address from various possible headers
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const cfConnectingIp = req.headers['cf-connecting-ip'];
  
  // Get the IP address (x-forwarded-for can contain multiple IPs, take the first one)
  let clientIp = null;
  
  if (forwarded) {
    clientIp = forwarded.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp;
  } else if (cfConnectingIp) {
    clientIp = cfConnectingIp;
  } else {
    // Fallback to connection remote address
    clientIp = req.connection?.remoteAddress || 
               req.socket?.remoteAddress || 
               req.headers['x-forwarded-for'] || 
               'unknown';
  }
  
  // Log the IP address to Vercel function logs
  console.log(`Visitor IP logged: ${clientIp} at ${new Date().toISOString()}`);
  console.log(`Request headers:`, {
    'x-forwarded-for': req.headers['x-forwarded-for'],
    'x-real-ip': req.headers['x-real-ip'],
    'cf-connecting-ip': req.headers['cf-connecting-ip'],
    'user-agent': req.headers['user-agent']
  });
  
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Return JSON response with the IP address
  res.status(200).json({
    success: true,
    ip: clientIp,
    timestamp: new Date().toISOString(),
    message: 'IP address logged successfully'
  });
}