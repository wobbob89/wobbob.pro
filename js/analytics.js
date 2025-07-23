/**
 * Client-side analytics tracking
 * Sends visitor activity data to serverless analytics endpoint
 */

(function() {
    'use strict';

    // Analytics configuration
    const ANALYTICS_ENDPOINT = '/api/analytics';
    
    /**
     * Sends analytics data to the serverless endpoint
     * @param {Object} data - Analytics data to send
     */
    function sendAnalyticsData(data) {
        // Only send analytics in browser environment
        if (typeof window === 'undefined') return;
        
        try {
            fetch(ANALYTICS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(error => {
                // Silently fail to avoid disrupting user experience
                console.debug('Analytics tracking failed:', error);
            });
        } catch (error) {
            console.debug('Analytics tracking error:', error);
        }
    }

    /**
     * Tracks a page view
     * @param {string} pageName - Name of the page being viewed
     */
    function trackPageView(pageName) {
        const data = {
            page: pageName || document.title || window.location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        sendAnalyticsData(data);
    }

    /**
     * Initialize analytics tracking when page loads
     */
    function initializeAnalytics() {
        // Track initial page view
        const pageName = document.title || window.location.pathname.replace(/^\//, '') || 'home';
        trackPageView(pageName);
        
        // Track navigation changes for single-page applications
        let currentPath = window.location.pathname;
        setInterval(() => {
            if (window.location.pathname !== currentPath) {
                currentPath = window.location.pathname;
                const newPageName = document.title || currentPath.replace(/^\//, '') || 'home';
                trackPageView(newPageName);
            }
        }, 1000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAnalytics);
    } else {
        initializeAnalytics();
    }

})();