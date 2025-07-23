/**
 * Serverless analytics endpoint for visitor tracking
 * Collects and stores visitor activity data for site analytics
 */

export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Extract visitor data from request
      const { page, timestamp, userAgent } = req.body;
      
      // Get visitor network information for analytics
      const visitorIP = req.headers['x-forwarded-for'] || 
                       req.headers['x-real-ip'] || 
                       req.connection?.remoteAddress || 
                       req.socket?.remoteAddress ||
                       (req.connection?.socket ? req.connection.socket.remoteAddress : null);

      // Create analytics record
      const analyticsData = {
        page: page || 'unknown',
        timestamp: timestamp || new Date().toISOString(),
        userAgent: userAgent || req.headers['user-agent'] || 'unknown',
        visitorInfo: visitorIP || 'unknown',
        referrer: req.headers.referer || 'direct'
      };

      // In a production environment, you would store this data in a database
      // For now, we'll log it (this would typically be sent to analytics service)
      console.log('Analytics data collected:', {
        page: analyticsData.page,
        timestamp: analyticsData.timestamp,
        hasVisitorInfo: !!analyticsData.visitorInfo
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Analytics data recorded successfully'
      });

    } catch (error) {
      console.error('Analytics endpoint error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process analytics data'
      });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}