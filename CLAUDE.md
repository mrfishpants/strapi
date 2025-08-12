# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi v5.18.1 CMS application for NSW Traffic Control (NSWTC) deployed on Railway. It uses PostgreSQL as the database and provides content management for a traffic control company website.

## Development Commands

```bash
# Development server (with live reload)
yarn dev
# or
yarn develop

# Production build
yarn build

# Start production server
yarn start

# Strapi console access
yarn console

# Check for upgrades
yarn upgrade:dry
yarn upgrade
```

## Local Development Setup

This project is configured for Railway deployment but can be developed locally:

1. Install dependencies: `yarn install`
2. Install Railway CLI and login: `railway login`
3. Link to Railway project: `railway link`
4. Run with Railway environment: `railway run yarn develop`
5. Access admin panel at: `http://127.0.0.1:1337/admin`

## Database Configuration

- **Production**: PostgreSQL via Railway (DATABASE_URL environment variable)
- **Local Development**: Connects to Railway's PostgreSQL via TCP proxy
- Configuration: `config/database.js`

## Content Types Architecture

The CMS is being migrated to match website expectations exactly. Current content types:

### Collection Types (src/api/)
- **FAQ** ✅ Complete - Categories: general, services, emergency, pricing, equipment, support
- **Service** ✅ Complete - Traffic control services with features and descriptions
- **Testimonial** ✅ Complete - Client testimonials with ratings and photos
- **Team Member** ✅ Complete - Staff profiles with contact information

### Content Type Structure
Each content type follows Strapi v5 conventions:
```
src/api/[content-type]/
├── content-types/[content-type]/schema.json
├── controllers/[content-type].js
├── routes/[content-type].js
└── services/[content-type].js
```

### Standard Implementation Pattern
All content types use the standard Strapi core functions:
- Controllers: `createCoreController('api::name.name')`
- Routes: `createCoreRouter('api::name.name')`
- Services: `createCoreService('api::name.name')`

## API Endpoints

Available endpoints (all require public permissions in admin):
- `GET /api/faqs` - FAQ entries with categories
- `GET /api/services` - Traffic control services
- `GET /api/testimonials` - Client testimonials
- `GET /api/team-members` - Team member profiles

## Environment Configuration

Key environment variables (configured in Railway):
- `DATABASE_URL` - PostgreSQL connection string
- `APP_KEYS` - Application keys for security
- `HOST` - Server host (0.0.0.0)
- `PORT` - Server port (1337)
- `URL` - Public URL for the application

## Deployment

- **Platform**: Railway (automatic deployments from main branch)
- **Build Config**: `railway.json` uses RAILPACK builder
- **Database**: PostgreSQL managed by Railway
- **File Storage**: Local provider (media persisted between deploys)

## Content Migration Strategy

The project follows a strict content migration plan:
1. Copy exact schemas from working CMS
2. Match website interfaces perfectly
3. Use only safe Strapi patterns
4. Test each deployment
5. Migrate content last

## Admin Panel

After deployment, visit `/admin` to:
1. Create admin user (first time only)
2. Set public permissions for API endpoints
3. Manage content types and entries
4. Configure user roles and permissions

## File Structure Notes

- `config/` - Strapi configuration files
- `src/api/` - Content type definitions
- `src/extensions/` - Plugin extensions (JWT config)
- `public/uploads/` - Media file storage
- `database/migrations/` - Database migration files