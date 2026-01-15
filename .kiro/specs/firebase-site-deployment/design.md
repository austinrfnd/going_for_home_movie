# Design Document: Firebase Site Deployment

## Overview

This design describes the architecture and implementation approach for deploying the "Going for Home" documentary website to Firebase Hosting with integrated analytics. The solution restructures the existing single-file HTML mockup into a production-ready project structure, configures Firebase Hosting for optimal performance, and integrates Firebase Analytics for visitor tracking.

The deployment targets Firebase's free Spark plan, which provides 10GB storage, 360MB/day bandwidth, SSL certificates, and one custom domain—sufficient for a documentary film promotional site.

## Architecture

```mermaid
graph TB
    subgraph "Development"
        M[mockup-v3.1-elevated.html] --> B[Build Process]
        B --> P[public/]
    end
    
    subgraph "public/ Directory"
        P --> I[index.html]
        P --> S[styles.css]
        P --> J[main.js]
        P --> A[assets/]
        A --> H[hero_image.png]
    end
    
    subgraph "Firebase Project"
        FC[firebase.json]
        FR[.firebaserc]
    end
    
    subgraph "Firebase Hosting"
        CDN[Global CDN]
        SSL[SSL Certificate]
        DOM[Custom Domain]
    end
    
    subgraph "Firebase Analytics"
        SDK[Analytics SDK]
        PV[Page Views]
        CE[Custom Events]
    end
    
    P --> |firebase deploy| CDN
    FC --> CDN
    CDN --> SSL
    SSL --> DOM
    I --> SDK
    SDK --> PV
    SDK --> CE
```

### Deployment Flow

1. Developer runs `firebase deploy` from project root
2. Firebase CLI reads `firebase.json` configuration
3. Contents of `public/` directory are uploaded to Firebase Hosting
4. Assets are distributed to global CDN edge locations
5. SSL certificate is provisioned/renewed automatically
6. Site becomes available at Firebase URL and custom domain

## Components and Interfaces

### 1. Project File Structure

```
going-for-home/
├── .firebaserc              # Firebase project alias configuration
├── firebase.json            # Firebase Hosting configuration
├── public/                  # Deployable assets (hosting root)
│   ├── index.html          # Main HTML document
│   ├── styles.css          # Extracted CSS styles
│   ├── main.js             # Extracted JavaScript
│   └── assets/
│       └── hero_image.png  # Hero/parallax background image
└── requirements/            # Original mockups (not deployed)
    ├── mockup-v3.1-elevated.html
    └── design-spec-v3.1.md
```

### 2. Firebase Configuration (firebase.json)

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=3600"
          }
        ]
      }
    ]
  }
}
```

### 3. Firebase Project Configuration (.firebaserc)

```json
{
  "projects": {
    "default": "going-for-home"
  }
}
```

### 4. HTML Document Structure (index.html)

The HTML document will be restructured from the mockup with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Going for Home - A Documentary</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="A documentary following the Altadena community rebuilding after the Eaton Canyon fire, centered on a Little League season.">
  <meta name="keywords" content="documentary, Going for Home, Altadena, Little League, Eaton Canyon fire">
  
  <!-- Open Graph / Social Sharing -->
  <meta property="og:title" content="Going for Home - A Documentary">
  <meta property="og:description" content="After the devastating Eaton Canyon fire, a Little League team becomes an anchor for a fractured community.">
  <meta property="og:image" content="/assets/hero_image.png">
  <meta property="og:type" content="website">
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://player.vimeo.com">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/styles.css">
  
  <!-- Firebase SDK -->
  <script type="module">
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js';
    import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js';
    
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDSFqcuGBvv67zKj5LBYpQzLRf_hEo0fsg",
      authDomain: "going-for-home.firebaseapp.com",
      projectId: "going-for-home",
      storageBucket: "going-for-home.firebasestorage.app",
      messagingSenderId: "163190919110",
      appId: "1:163190919110:web:ed0ce514b42239df206cc7",
      measurementId: "G-4VV21PZC47"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    // Expose for use in main.js
    window.firebaseAnalytics = { analytics, logEvent };
  </script>
</head>
<body>
  <!-- Page content from mockup -->
  
  <!-- Main JavaScript -->
  <script src="/main.js"></script>
</body>
</html>
```

### 5. Analytics Integration (main.js additions)

```javascript
// Analytics event logging
function logAnalyticsEvent(eventName, params = {}) {
  if (window.firebaseAnalytics) {
    const { analytics, logEvent } = window.firebaseAnalytics;
    logEvent(analytics, eventName, params);
  }
}

// Track page/section navigation
function showPage(pageId) {
  // ... existing navigation code ...
  
  // Log navigation event
  logAnalyticsEvent('page_view', {
    page_title: pageId,
    page_location: window.location.href
  });
}

// Track trailer plays
function playTrailer() {
  // ... existing trailer code ...
  
  // Log trailer play event
  logAnalyticsEvent('video_start', {
    video_title: 'Going for Home Trailer',
    video_provider: 'vimeo'
  });
}
```

## Data Models

### Firebase Configuration Schema

| Field | Type | Description |
|-------|------|-------------|
| `hosting.public` | string | Directory containing deployable files |
| `hosting.ignore` | string[] | Glob patterns for files to exclude |
| `hosting.rewrites` | object[] | URL rewrite rules for SPA routing |
| `hosting.headers` | object[] | Custom HTTP header configurations |

### Analytics Event Schema

| Event Name | Parameters | Trigger |
|------------|------------|---------|
| `page_view` | `page_title`, `page_location` | Section navigation |
| `video_start` | `video_title`, `video_provider` | Trailer play button click |
| `screen_view` | `screen_name` | Initial page load |

### Cache Header Configuration

| Asset Type | Cache-Control Value | TTL |
|------------|---------------------|-----|
| Images (png, jpg, svg, webp) | `public, max-age=31536000, immutable` | 1 year |
| CSS/JS files | `public, max-age=31536000, immutable` | 1 year |
| HTML files | `public, max-age=3600` | 1 hour |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Firebase Configuration Validity

*For any* valid firebase.json configuration, the `hosting.public` field SHALL equal "public" and the configuration SHALL parse as valid JSON.

**Validates: Requirements 2.2**

### Property 2: Cache Header Configuration Completeness

*For any* asset type (images, CSS/JS, HTML), the firebase.json configuration SHALL specify appropriate Cache-Control headers where images and CSS/JS have max-age=31536000 (1 year) and HTML has max-age=3600 (1 hour).

**Validates: Requirements 2.4, 4.1, 4.2**

### Property 3: HTML Performance Optimization Tags

*For any* production index.html, the document SHALL contain preconnect link tags for all external resource domains (fonts.googleapis.com, fonts.gstatic.com, player.vimeo.com) and SHALL contain meta tags for description, og:title, og:description, and og:image.

**Validates: Requirements 4.4, 4.5**

### Property 4: Free Tier Storage Compliance

*For any* deployment, the total size of all files in the public/ directory SHALL be less than 10GB.

**Validates: Requirements 7.1**

### Property 5: Free Tier Feature Compliance

*For any* firebase.json configuration, the configuration SHALL NOT include references to Cloud Functions, Cloud Firestore rules, or other paid-tier features.

**Validates: Requirements 7.4**

### Property 6: Project Structure Completeness

*For any* production build, the public/ directory SHALL contain index.html, styles.css, main.js, and assets/hero_image.png, and index.html SHALL reference both styles.css and main.js via link and script tags respectively.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

## Error Handling

### Build Process Errors

| Error Condition | Handling Strategy |
|-----------------|-------------------|
| Missing mockup file | Exit with error message indicating expected file path |
| Invalid HTML in mockup | Log parsing errors, attempt graceful extraction |
| Missing hero image | Warn but continue; document placeholder requirement |
| Write permission denied | Exit with clear error about directory permissions |

### Deployment Errors

| Error Condition | Handling Strategy |
|-----------------|-------------------|
| Firebase CLI not installed | Provide installation instructions in error message |
| Not authenticated | Prompt user to run `firebase login` |
| Invalid firebase.json | Firebase CLI provides validation errors; fix and retry |
| Project not found | Verify project ID in .firebaserc matches Firebase console |
| Quota exceeded | Alert user about free tier limits; suggest optimization |

### Runtime Errors (Analytics)

| Error Condition | Handling Strategy |
|-----------------|-------------------|
| Firebase SDK fails to load | Site continues to function; analytics silently disabled |
| Invalid Firebase config | Console warning; site functions without analytics |
| Network offline | Analytics events queued; sent when connection restored |

## Testing Strategy

### Unit Tests

Unit tests verify specific examples and edge cases:

1. **Configuration File Tests**
   - Verify firebase.json parses as valid JSON
   - Verify .firebaserc contains valid project reference
   - Verify cache headers are correctly formatted

2. **HTML Structure Tests**
   - Verify index.html contains required meta tags
   - Verify preconnect links are present
   - Verify CSS and JS file references are correct
   - Verify Firebase SDK initialization code is present

3. **File Structure Tests**
   - Verify public/ directory exists
   - Verify all required files are present
   - Verify no unexpected files are included

### Property-Based Tests

Property-based tests validate universal properties across all inputs. Each test should run a minimum of 100 iterations.

**Testing Framework:** For this project, we'll use shell scripts with assertions for configuration validation, as the deployment is primarily configuration-driven rather than code-driven.

1. **Property Test: Cache Header Configuration**
   - **Feature: firebase-site-deployment, Property 2: Cache Header Configuration Completeness**
   - Generate various asset file extensions
   - Verify each maps to correct cache header in configuration

2. **Property Test: Free Tier Compliance**
   - **Feature: firebase-site-deployment, Property 4: Free Tier Storage Compliance**
   - Calculate total size of public/ directory
   - Assert total is under 10GB limit

3. **Property Test: Configuration Validity**
   - **Feature: firebase-site-deployment, Property 1: Firebase Configuration Validity**
   - Parse firebase.json
   - Verify required fields are present and valid

### Integration Tests

1. **Local Preview Test**
   - Run `firebase serve` locally
   - Verify site loads at localhost
   - Verify all sections navigate correctly
   - Verify trailer plays

2. **Deployment Dry Run**
   - Run `firebase deploy --only hosting --dry-run` (if available)
   - Verify no configuration errors

### Manual Verification Checklist

- [ ] Site loads at Firebase hosting URL
- [ ] All four sections (About, Screenings, Team, Contact) accessible
- [ ] Trailer plays when clicked
- [ ] Mobile menu functions correctly
- [ ] Parallax effects work on scroll
- [ ] Analytics events appear in Firebase console
- [ ] Page loads in under 3 seconds on 3G connection

## Custom Domain Setup Guide

### Prerequisites
- Access to domain registrar DNS settings
- Firebase project with Hosting enabled
- Site successfully deployed to Firebase

### Step 1: Add Custom Domain in Firebase Console
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., `goingforhome.com`)
4. Firebase will provide verification TXT record

### Step 2: DNS Configuration

Add the following DNS records at your domain registrar:

**For apex domain (goingforhome.com):**
```
Type: A
Name: @
Value: 151.101.1.195
TTL: 3600

Type: A
Name: @
Value: 151.101.65.195
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: going-for-home.web.app
TTL: 3600
```

**Verification TXT record:**
```
Type: TXT
Name: @
Value: [provided by Firebase]
TTL: 3600
```

### Step 3: SSL Certificate Provisioning
- Firebase automatically provisions SSL certificate
- May take up to 24 hours for DNS propagation
- Certificate auto-renews

### Step 4: Verify Setup
- Visit https://yourdomain.com
- Verify HTTPS lock icon appears
- Test both apex and www versions

## Style Guide Document Structure

The style guide (to be created as `STYLE_GUIDE.md`) will document:

1. **Color Palette** - All CSS custom properties with hex values and usage
2. **Typography** - Font families, sizes, weights, and hierarchy
3. **Spacing** - Consistent padding/margin values
4. **Components** - Button styles, cards, navigation patterns
5. **Animations** - Timing functions, durations, and effects
6. **Responsive Breakpoints** - Media query values and behavior changes

This will be extracted from the design-spec-v3.1.md and formatted for developer reference.
