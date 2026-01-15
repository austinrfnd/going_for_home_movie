# Implementation Plan: Firebase Site Deployment

## Overview

This plan converts the "Going for Home" documentary mockup into a production-ready site deployed on Firebase Hosting with integrated analytics. Tasks are organized to build incrementally, with each step validating before proceeding.

## Tasks

- [x] 1. Create production file structure
  - [x] 1.1 Create public/ directory and assets/ subdirectory
    - Create `public/` folder at project root
    - Create `public/assets/` subfolder for images
    - _Requirements: 1.1, 1.4_
  
  - [x] 1.2 Extract CSS from mockup into styles.css
    - Copy all content from `<style>` tag in mockup to `public/styles.css`
    - Preserve all CSS custom properties, animations, and media queries
    - _Requirements: 1.2_
  
  - [x] 1.3 Extract JavaScript from mockup into main.js
    - Copy all content from `<script>` tag in mockup to `public/main.js`
    - Add analytics event logging functions
    - _Requirements: 1.3_
  
  - [x] 1.4 Create production index.html
    - Create `public/index.html` with external CSS/JS references
    - Add SEO meta tags (description, keywords)
    - Add Open Graph meta tags for social sharing
    - Add preconnect hints for Google Fonts, Vimeo, and Google Tag Manager
    - Include Firebase SDK initialization in head
    - _Requirements: 1.5, 4.4, 4.5, 3.1, 3.2, 3.3_
  
  - [x] 1.5 Copy and optimize hero image
    - Copy `hero_image.png` to `public/assets/`
    - Update image reference in parallax section CSS
    - _Requirements: 4.3_

- [x] 2. Configure Firebase project
  - [x] 2.1 Create firebase.json configuration
    - Set hosting.public to "public"
    - Configure SPA rewrites to index.html
    - Set cache headers: 1 year for images/CSS/JS, 1 hour for HTML
    - Add ignore patterns for non-deployable files
    - _Requirements: 2.2, 2.3, 2.4, 4.1, 4.2_
  
  - [x] 2.2 Create .firebaserc project configuration
    - Set default project alias to "going-for-home"
    - _Requirements: 2.6_
  
  - [x] 2.3 Update Firebase config values in index.html
    - Replace placeholder values (YOUR_API_KEY, etc.) with actual Firebase config from design.md
    - Update Firebase SDK version to 12.8.0 as specified in design
    - _Requirements: 3.1, 3.2, 3.6_
  
  - [x] 2.4 Write configuration validation tests
    - **Property 1: Firebase Configuration Validity**
    - **Property 2: Cache Header Configuration Completeness**
    - **Validates: Requirements 2.2, 2.4, 4.1, 4.2**

- [x] 3. Integrate Firebase Analytics
  - [x] 3.1 Add analytics event logging to main.js
    - Create logAnalyticsEvent helper function
    - Add page_view event to showPage function
    - Add video_start event to playTrailer function
    - _Requirements: 3.4, 3.5_
  
  - [ ] 3.2 Write analytics integration tests
    - Verify logAnalyticsEvent function exists
    - Verify showPage calls analytics
    - Verify playTrailer calls analytics
    - _Requirements: 3.4, 3.5_

- [x] 4. Checkpoint - Verify local build
  - Ensure all files are in correct locations
  - Verify index.html loads styles.css and main.js correctly
  - Test site functionality locally (navigation, trailer, mobile menu)
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Create documentation
  - [ ] 5.1 Create DEPLOYMENT.md with setup instructions
    - Document Firebase CLI installation steps
    - Document Firebase project creation in console
    - Document firebase login and init commands
    - Include deployment command: `firebase deploy`
    - _Requirements: 6.1, 6.4_
  
  - [ ] 5.2 Add custom domain setup guide to DEPLOYMENT.md
    - Document DNS A record configuration
    - Document TXT verification record
    - Document www CNAME setup
    - Note SSL auto-provisioning
    - _Requirements: 5.2, 5.5_
  
  - [ ] 5.3 Add free tier monitoring guidance to DEPLOYMENT.md
    - Document 10GB storage limit
    - Document 360MB/day bandwidth limit
    - Explain how to check usage in Firebase console
    - _Requirements: 7.2, 7.3_

- [x] 6. Create style guide document
  - [x] 6.1 Create STYLE_GUIDE.md
    - Document color palette with CSS custom properties
    - Document typography (fonts, sizes, weights)
    - Document spacing conventions
    - Document component patterns (buttons, cards, navigation)
    - Document animation timing and effects
    - Document responsive breakpoints
    - _Requirements: Style guide creation from context_

- [ ] 7. Final validation
  - [ ] 7.1 Write free tier compliance tests
    - **Property 4: Free Tier Storage Compliance**
    - **Property 5: Free Tier Feature Compliance**
    - **Validates: Requirements 7.1, 7.4**
  
  - [ ] 7.2 Write HTML structure validation tests
    - **Property 3: HTML Performance Optimization Tags**
    - **Property 6: Project Structure Completeness**
    - **Validates: Requirements 1.1-1.5, 4.4, 4.5**

- [ ] 8. Final checkpoint - Ready for deployment
  - Verify all files present in public/ directory
  - Verify firebase.json and .firebaserc are configured
  - Verify documentation is complete
  - Ensure all tests pass, ask the user if questions arise.
  - Note: Actual deployment requires Firebase CLI login and project setup in Firebase console

## Notes

- All tasks are required for comprehensive deployment
- Firebase project ID is "going-for-home" - already configured in design.md
- Firebase config values are set (apiKey, appId, measurementId, etc.)
- Hero image optimization is manual - consider using tools like ImageOptim or Squoosh for compression
- Actual deployment (`firebase deploy`) should be run manually after completing these tasks
