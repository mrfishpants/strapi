# Strapi Scripts Documentation

This directory contains utility scripts for managing content in the NSW Traffic Control Strapi CMS.

## 🗂️ Content Population Scripts

These scripts populate specific content types with real data from the original CMS backup:

### Collection Type Scripts
- **`populate-services-fixed.js`** - Populates 11 traffic control services
- **`populate-testimonials.js`** - Populates 7 client testimonials
- **`populate-team-members.js`** - Populates 6 team member profiles
- **`populate-blog-posts-from-backup.js`** - Populates 3 blog posts from backup data
- **`populate-job-openings.js`** - Populates 3 job openings
- **`populate-core-values.js`** - Populates 4 company core values
- **`populate-process.js`** - Populates 4 service process steps

## 🛠️ Utility Scripts

- **`delete-all-properly.js`** - Safely deletes all content from all collection types
- **`backup-content.js`** - Exports all current content to a JSON backup file
- **`health-check.js`** - Verifies all API endpoints are responding correctly

## 📋 Usage

All scripts connect to the production Strapi instance at:
```
https://strapi-production-6dd1.up.railway.app
```

### Running a Script

```bash
# From the project root
node scripts/[script-name].js

# Example: Populate services
node scripts/populate-services-fixed.js

# Example: Delete all content (use with caution!)
node scripts/delete-all-properly.js

# Example: Backup current content
node scripts/backup-content.js

# Example: Check API health
node scripts/health-check.js
```

## ⚠️ Important Notes

1. **No Authentication Required**: The API is currently publicly writable. This should be secured in production.

2. **Single Types**: Single type content (Company Info, Contact Info, etc.) must be created manually through the admin panel. Scripts cannot create single type entries.

3. **Order of Operations**: If starting fresh:
   - Run `delete-all-properly.js` first to clear existing content
   - Then run individual population scripts as needed

4. **Production Data**: All population scripts use real data from the original CMS backup. No placeholder or fake content is created.

## 🔄 Backup Strategy

Before making major changes:
1. Run `backup-content.js` to export current content
2. Make your changes
3. If needed, restore from the backup file created

## 📊 Content Counts

Expected entry counts after population:
- Services: 11
- Testimonials: 7
- Team Members: 6
- FAQs: 6
- Core Values: 4
- Process Steps: 4
- Blog Posts: 3
- Job Openings: 3
- **Total**: 44 entries