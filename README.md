# NSW Traffic Control - Strapi CMS

Content Management System for NSW Traffic Control website, deployed on Railway with PostgreSQL.

## 🌐 Production URLs

- **CMS**: https://strapi-production-6dd1.up.railway.app
- **Admin Panel**: https://strapi-production-6dd1.up.railway.app/admin
- **API Base**: https://strapi-production-6dd1.up.railway.app/api

## ✨ Features

- Strapi v5.18.1
- PostgreSQL Database
- 22 Content Types (14 collections, 8 single types)
- Public API endpoints for frontend consumption
- Media persistence between deployments

## 📡 Available API Endpoints

### Collection Types (with content)
- `GET /api/services` - Traffic control services (11 entries)
- `GET /api/testimonials` - Client testimonials (7 entries)
- `GET /api/team-members` - Team member profiles (6 entries)
- `GET /api/faqs` - Frequently asked questions (6 entries)
- `GET /api/core-values` - Company core values (4 entries)
- `GET /api/our-processes` - Service process steps (4 entries)
- `GET /api/blog-posts` - Blog articles (3 entries)
- `GET /api/job-openings` - Career opportunities (3 entries)

### Collection Types (ready for content)
- `GET /api/culture-values`
- `GET /api/case-studies`
- `GET /api/resources`
- `GET /api/benefits`
- `GET /api/application-steps`
- `GET /api/career-faqs`

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd strapi
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up Railway CLI**
   ```bash
   # Install Railway CLI (if not already installed)
   # See: https://docs.railway.app/develop/cli#installation
   
   # Login to Railway
   railway login
   
   # Link to the project
   railway link
   ```

4. **Run development server**
   ```bash
   # This connects to Railway's PostgreSQL database
   railway run yarn develop
   ```

5. **Access local admin**
   - Open http://127.0.0.1:1337/admin

## 🛠️ Scripts

See `scripts/README.md` for documentation on available utility scripts.

## 📝 Admin Panel Setup

Single types need to be configured manually in the admin panel:
1. Navigate to Content Manager > Single Types
2. Create entries for:
   - Company Info
   - Contact Info
   - Homepage Settings
   - About Page Settings
   - Services Page Settings
   - Careers Page Settings
   - Contact Page Settings
   - Website Settings

## 🚀 Deployment

The main branch automatically deploys to Railway. The deployment includes:
- Automatic builds using Railway's builder
- Database migrations
- Media persistence
- Environment variable management

## 📦 Environment Variables

Required environment variables (configured in Railway):
- `DATABASE_URL` - PostgreSQL connection string
- `APP_KEYS` - Application security keys
- `HOST` - Server host (0.0.0.0)
- `PORT` - Server port (1337)
- `URL` - Public application URL