
# WoBBoB Website

## Overview
This is the official WoBBoB website, featuring:
- **Drum & Bass-themed** design with neon aesthetics.
- **Biography, music player, and AI projects** (Trade 'A' Them Bot & BoBBoT).
- **Merchandise gallery** with ordering options.
- **Adult content & escort page** with age verification.
- **Social media & account login links**.

## Website Structure
- **index.html** - Homepage with an introduction to WoBBoB.
- **about-us.html** - Biography, achievements, and AI projects.
- **articles.html** - AI & music technology blog.
- **bobbot.html** - BoBBoT page (AI-powered chatbot).
- **contact-us.html** - Social media, emails, and login links.
- **gallery.html** - Merchandise and exclusive visuals.
- **trade-a-them-bot.html** - Automated trading bot overview.
- **sitemap.html** - Website navigation structure.

## Assets Included
- **css/** - Stylesheets for website design.
- **js/** - JavaScript files for interactive features.
- **images/** - Website graphics, logos, and merchandise images.

## Setup Instructions
1. **To view the site locally**:
   - Open `index.html` in a web browser.
   - Ensure JavaScript and CSS files are properly linked.
   
2. **To host online**:
   - Upload all files to a web server.
   - Ensure proper linking of assets (CSS, JS, Images).

## API Endpoints

### IP Logging Endpoint
- **URL**: `/api/log-ip.js` (when deployed on Vercel)
- **Method**: GET or POST
- **Description**: Logs visitor IP addresses to Vercel function logs and returns the IP in JSON format
- **Response**: JSON object containing the visitor's IP address and timestamp
- **Headers**: Captures `x-forwarded-for`, `x-real-ip`, and `cf-connecting-ip` headers
- **CORS**: Enabled for cross-origin requests

#### Example Usage:
```javascript
fetch('/api/log-ip.js')
  .then(response => response.json())
  .then(data => console.log('Your IP:', data.ip));
```

#### Example Response:
```json
{
  "success": true,
  "ip": "192.168.1.100",
  "timestamp": "2025-01-20T10:30:00.000Z",
  "message": "IP address logged successfully"
}
```

#### Viewing Logs:
To view the IP logs when deployed on Vercel:
1. Go to your Vercel dashboard at https://vercel.com/dashboard
2. Select your wobbob.pro project
3. Navigate to the "Functions" tab
4. Click on the `log-ip.js` function
5. View the function logs to see logged IP addresses and timestamps

## Contact
For updates and inquiries, connect via:
- Facebook: [dj.wobbob](https://www.facebook.com/dj.wobbob)
- Instagram: [dj.wobbob](https://www.instagram.com/dj.wobbob/)
- SoundCloud: [wobbob](https://soundcloud.com/wobbob)
- TikTok: [djwobbob](https://www.tiktok.com/@djwobbob)
