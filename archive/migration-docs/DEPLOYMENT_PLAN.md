# Strapi Railway Deployment Plan - Minimal & Safe

## 🎯 Objective
Get Strapi operational on Railway with content types, then add content.

## ✅ Completed
- [x] Deploy Railway Strapi template
- [x] Eject to own GitHub repo (keenanbass1/strapi)
- [x] Add FAQ content type (standard patterns only)
- [x] Push to trigger deployment

## 📋 Next Steps

### Phase 1: Core Setup (Today)
- [ ] Create admin user at `/admin`
- [ ] Set public API permissions for FAQ
- [ ] Test FAQ endpoint works

### Phase 2: Essential Content Types (Standard Patterns Only)
Add these one at a time, test each deployment:

#### 1. Services
```
src/api/service/
├── content-types/service/schema.json
├── controllers/service.js  (createCoreController)
├── routes/service.js       (createCoreRouter)
└── services/service.js     (createCoreService)
```
Fields: title, description, icon, sortOrder

#### 2. Testimonials  
```
src/api/testimonial/
└── [same structure]
```
Fields: author, company, content, rating, featured

#### 3. Team Members
```
src/api/team-member/
└── [same structure]
```
Fields: name, role, bio, image, sortOrder

### Phase 3: Add Content
Once all content types deploy successfully:
1. Add content via Strapi admin panel
2. Set all public permissions
3. Test all API endpoints

## 🚨 Safety Rules
1. **NO custom routes** - Only use createCoreRouter
2. **NO custom controllers** - Only use createCoreController  
3. **NO custom services** - Only use createCoreService
4. **Test each deployment** - One content type at a time
5. **Use standard field types** - string, text, richtext, boolean, integer

## 🔧 Commands

### Local Development
```bash
# Install dependencies
npm install

# Run with Railway vars
railway run npm run develop
```

### Deploy
```bash
git add .
git commit -m "Add [content-type] with standard patterns"
git push origin main
# Wait for Railway deployment
```

### Test API
```bash
# After deployment completes
curl https://[your-domain]/api/faqs
curl https://[your-domain]/api/services
curl https://[your-domain]/api/testimonials
curl https://[your-domain]/api/team-members
```

## 📝 Progress Tracking
- [ ] FAQ - Deployed, awaiting admin setup
- [ ] Services - Not started
- [ ] Testimonials - Not started  
- [ ] Team Members - Not started
- [ ] Content populated - Not started
- [ ] Frontend connected - Not started

## ⚠️ If Deployment Fails
1. Check Railway logs for "forEach" errors (indicates custom pattern)
2. Ensure using standard patterns only
3. Check schema.json is valid JSON
4. Verify all 4 files exist (schema, controller, routes, service)

---

**Remember**: Boring is safe. Standard patterns work. No creativity in routing!