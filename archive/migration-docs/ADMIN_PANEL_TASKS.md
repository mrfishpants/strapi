# Strapi Admin Panel Tasks

## 🎯 Railway Strapi Admin Access
- **URL**: https://strapi-production-6dd1.up.railway.app/admin
- **Status**: Deployment Complete - Content types created

## 🔴 Critical Tasks Required in Admin Panel

### 1. 🔐 Set API Permissions

Go to **Settings > Users & Permissions > Roles > Public** and enable:

#### Collection Types (Allow Create + Find):
- [ ] **blog-posts** - Create, Find, FindOne
- [ ] **job-openings** - Create, Find, FindOne  
- [ ] **core-values** - Create, Find, FindOne
- [ ] **our-processes** - Create, Find, FindOne
- [ ] **case-studies** - Create, Find, FindOne
- [ ] **resources** - Create, Find, FindOne
- [ ] **culture-values** - Create, Find, FindOne
- [ ] **benefits** - Create, Find, FindOne
- [ ] **application-steps** - Create, Find, FindOne
- [ ] **career-faqs** - Create, Find, FindOne

### 2. 📄 Initialize Single Types

Single Types must be manually created in the admin panel:

1. **Company Info** (`/admin/content-manager/single-types/api::company-info.company-info`)
   - Company Name: NSW Traffic Control
   - ABN: 71 655 407 379
   - Established Year: 2020
   - Description: Professional traffic management services
   - Mission: To provide safe, efficient traffic control
   - Vision: To be the most trusted traffic management company

2. **Contact Info** (`/admin/content-manager/single-types/api::contact-info.contact-info`)
   - Phone: 1300 972 872
   - Email: admin@nswtrafficcontrol.com.au
   - Address: 7/10 Pioneer Avenue, Tuggerah NSW 2259
   - Emergency Phone: 1300 972 872

3. **Homepage Setting** 
   - Hero title: Professional Traffic Management Solutions
   - Hero subtitle: Keeping NSW Moving Safely

4. **About Page Setting**
   - Configure about page sections

5. **Services Page Setting**
   - Configure services page sections

6. **Careers Page Setting**
   - Configure careers page sections

7. **Contact Page Setting**
   - Configure contact page sections

8. **Website Settings**
   - Maintenance Mode: false
   - SEO defaults configured

### 3. 📝 Populate Remaining Content

After setting permissions, run these scripts:

```bash
# Blog Posts (3 entries from backup)
node /home/dev/code/clients/nswtc/strapi/scripts/populate-blog-posts-from-backup.js

# Core Values (4 entries)
node /home/dev/code/clients/nswtc/strapi/scripts/populate-core-values.js

# Our Process (4 steps)
node /home/dev/code/clients/nswtc/strapi/scripts/populate-process.js

# Job Openings (3 entries from backup)
node /home/dev/code/clients/nswtc/strapi/scripts/populate-job-openings.js
```

## ✅ Already Populated Content

- **Services**: 11 entries ✅
- **Testimonials**: 7 entries ✅
- **Team Members**: 6 entries ✅
- **FAQs**: 6 entries ✅

## 📡 Current API Status

### Working Endpoints:
- ✅ https://strapi-production-6dd1.up.railway.app/api/services
- ✅ https://strapi-production-6dd1.up.railway.app/api/testimonials
- ✅ https://strapi-production-6dd1.up.railway.app/api/team-members
- ✅ https://strapi-production-6dd1.up.railway.app/api/faqs

### Needs Permission Fix:
- ⚠️ /api/blog-posts (403 Forbidden)
- ⚠️ /api/job-openings (403 Forbidden)
- ⚠️ /api/core-values (403 Forbidden)
- ⚠️ /api/our-processes (403 Forbidden)

### Needs Admin Panel Creation:
- ❌ /api/company-info (404 - Single Type)
- ❌ /api/contact-info (404 - Single Type)
- ❌ All other single types

## 🔗 Quick Links

- **Admin Panel**: https://strapi-production-6dd1.up.railway.app/admin
- **API Base**: https://strapi-production-6dd1.up.railway.app/api
- **Railway Dashboard**: https://railway.app/project/[project-id]

## 📋 Next Steps

1. Access admin panel and login
2. Set public API permissions for restricted content types
3. Create single type entries
4. Run population scripts for remaining content
5. Verify all endpoints return data
6. Update frontend to use new Railway URLs