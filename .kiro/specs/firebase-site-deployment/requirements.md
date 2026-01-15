# Requirements Document

## Introduction

This document specifies the requirements for deploying the "Going for Home" documentary film website to Firebase Hosting. The project involves restructuring an existing HTML mockup for production deployment, integrating Firebase Analytics for visitor tracking, and configuring the hosting environment to support a custom domain. The goal is to create a production-ready deployment that stays within Firebase's free tier limits while providing a professional, performant website.

## Glossary

- **Firebase_Hosting**: Google's web hosting service that serves static content (HTML, CSS, JS, images) via a global CDN
- **Firebase_Analytics**: Google's analytics service integrated with Firebase for tracking user behavior and site metrics
- **Firebase_CLI**: Command-line interface tool for managing Firebase projects and deployments
- **Firebase_Project**: A container in Firebase console that groups hosting, analytics, and other Firebase services
- **Site_Assets**: Static files including HTML, CSS, JavaScript, images, and fonts required for the website
- **Custom_Domain**: A user-owned domain name (e.g., goingforhome.com) connected to Firebase Hosting
- **SSL_Certificate**: Security certificate automatically provisioned by Firebase for HTTPS connections
- **CDN**: Content Delivery Network that caches and serves content from edge locations globally

## Requirements

### Requirement 1: Project Structure Setup

**User Story:** As a developer, I want to restructure the mockup into a production-ready file organization, so that the site is maintainable and deployable.

#### Acceptance Criteria

1. THE Build_System SHALL create a `public/` directory containing all deployable assets
2. THE Build_System SHALL extract inline CSS from the mockup into a separate `styles.css` file
3. THE Build_System SHALL extract inline JavaScript from the mockup into a separate `main.js` file
4. THE Build_System SHALL create an `assets/` subdirectory for images within the public folder
5. THE Build_System SHALL update HTML references to point to the extracted CSS and JS files
6. THE Build_System SHALL preserve all existing functionality after restructuring

### Requirement 2: Firebase Project Configuration

**User Story:** As a developer, I want to initialize and configure a Firebase project, so that I can deploy the site to Firebase Hosting.

#### Acceptance Criteria

1. THE Firebase_CLI SHALL initialize a Firebase project in the repository root
2. THE Firebase_Configuration SHALL specify `public/` as the hosting directory in `firebase.json`
3. THE Firebase_Configuration SHALL configure single-page application rewrites to `index.html`
4. THE Firebase_Configuration SHALL set appropriate cache headers for static assets
5. WHEN deploying, THE Firebase_Hosting SHALL serve all files from the `public/` directory
6. THE Firebase_Configuration SHALL include a `.firebaserc` file specifying the project alias

### Requirement 3: Firebase Analytics Integration

**User Story:** As a site owner, I want Google Analytics integrated via Firebase, so that I can track visitor behavior and site performance.

#### Acceptance Criteria

1. THE Analytics_Integration SHALL include the Firebase SDK scripts in the HTML head
2. THE Analytics_Integration SHALL initialize Firebase with the project configuration
3. THE Analytics_Integration SHALL enable automatic page view tracking
4. WHEN a user navigates between sections, THE Analytics_System SHALL log navigation events
5. WHEN the trailer play button is clicked, THE Analytics_System SHALL log a custom event
6. THE Analytics_Configuration SHALL use environment-appropriate Firebase config values

### Requirement 4: Asset Optimization

**User Story:** As a site visitor, I want the site to load quickly, so that I have a good user experience.

#### Acceptance Criteria

1. THE Firebase_Configuration SHALL set cache-control headers of 1 year for versioned assets
2. THE Firebase_Configuration SHALL set cache-control headers of 1 hour for HTML files
3. THE Site_Assets SHALL include properly sized hero image optimized for web delivery
4. THE HTML_Document SHALL include preconnect hints for Google Fonts and Vimeo
5. THE HTML_Document SHALL specify appropriate meta tags for SEO and social sharing

### Requirement 5: Custom Domain Configuration

**User Story:** As a site owner, I want to connect my custom domain to Firebase Hosting, so that visitors can access the site via a branded URL.

#### Acceptance Criteria

1. THE Firebase_Hosting SHALL support adding a custom domain through the Firebase console
2. THE Documentation SHALL include step-by-step instructions for DNS configuration
3. WHEN a custom domain is connected, THE Firebase_Hosting SHALL automatically provision an SSL certificate
4. THE Firebase_Configuration SHALL support both apex domain and www subdomain
5. THE Documentation SHALL specify the required DNS records (A records and TXT verification)

### Requirement 6: Deployment Workflow

**User Story:** As a developer, I want a simple deployment process, so that I can easily publish updates to the site.

#### Acceptance Criteria

1. THE Deployment_Process SHALL be executable via a single `firebase deploy` command
2. THE Firebase_CLI SHALL validate the project configuration before deployment
3. WHEN deployment completes, THE Firebase_CLI SHALL output the live site URL
4. THE Documentation SHALL include deployment commands and prerequisites
5. IF deployment fails, THEN THE Firebase_CLI SHALL provide actionable error messages

### Requirement 7: Free Tier Compliance

**User Story:** As a site owner, I want to stay within Firebase's free tier limits, so that I don't incur unexpected costs.

#### Acceptance Criteria

1. THE Site_Assets SHALL total less than 10GB to stay within free storage limits
2. THE Documentation SHALL note the 360MB/day bandwidth limit on the free tier
3. THE Documentation SHALL include guidance on monitoring usage in Firebase console
4. THE Firebase_Configuration SHALL avoid features that require paid plans (Cloud Functions, etc.)
