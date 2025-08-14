# Content Migration Plan - CMS to Railway Strapi

This document maps exactly what the website expects vs what we have vs what we need to create.

## 🎯 Strategy
1. **Copy exact schemas** from working CMS
2. **Match website interfaces** perfectly  
3. **Use safe Strapi patterns only**
4. **Test each deployment**
5. **Migrate content last**

## 📊 Content Type Analysis

### ✅ FAQ - COMPLETED & FIXED
- **Status**: ✅ Schema matches original CMS
- **Website expects**: `text` answer, 6 categories, `isActive` field
- **CMS has**: Exact match ✅
- **Action**: Ready for content population

### 🔄 Services - NEEDS CREATION
**Website Interface** (`/src/types/strapi.ts:69-80`):
```typescript
interface Service {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon?: StrapiMedia;
  features: string[];
  sortOrder: number;
  isActive: boolean;
}
```

**Original CMS Schema** (exact match needed):
```json
{
  "name": "string", "required": true, "minLength": 3, "maxLength": 100
  "slug": "uid", "required": true, "targetField": "name"
  "shortDescription": "string", "required": true, "maxLength": 200
  "fullDescription": "richtext"
  "icon": "media", "multiple": true, "allowedTypes": ["images","files","videos","audios"]
  "features": "json"
  "sortOrder": "integer"
  "isActive": "boolean"
  "featured": "boolean", "default": false
}
```

### 🔄 Testimonials - NEEDS CREATION  
**Website Interface** (`/src/types/strapi.ts:103-114`):
```typescript
interface Testimonial {
  id: number;
  documentId: string;
  clientName: string;
  company?: string;
  content: string;
  rating: number;
  photo?: StrapiMedia;
  position?: string;
  isActive: boolean;
  sortOrder: number;
}
```

**Original CMS Schema** (exact match needed):
```json
{
  "clientName": "string", "required": true
  "company": "string", "required": false
  "position": "string", "required": false
  "content": "text", "required": true
  "rating": "integer", "required": true, "min": 1, "max": 5, "default": 5
  "photo": "media", "multiple": false, "allowedTypes": ["images"]
  "isActive": "boolean", "required": true, "default": true
}
```

**⚠️ MISMATCH**: Website expects `sortOrder` but CMS schema doesn't have it!

### 🔄 Team Members - NEEDS CREATION
**Website Interface** (`/src/types/strapi.ts:133-145`):
```typescript
interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position: string;
  bio?: string;
  photo?: StrapiMedia;
  email?: string;
  phone?: string;
  linkedIn?: string;
  sortOrder: number;
  isActive: boolean;
}
```

**Original CMS Schema** (missing `isActive`!):
```json
{
  "name": "string", "required": true
  "position": "string", "required": true
  "bio": "text", "required": false
  "photo": "media", "multiple": false, "allowedTypes": ["images"]
  "email": "email", "required": false
  "phone": "string", "required": false
  "linkedIn": "string", "required": false
  "sortOrder": "integer", "required": true, "default": 0
}
```

**⚠️ MISMATCH**: Website expects `isActive` but CMS schema doesn't have it!

## 🛠️ Implementation Plan

### Phase 1: Create Missing Content Types (This Week)

#### 1. Services Content Type
```bash
src/api/service/
├── content-types/service/schema.json    # Copy from CMS + verify website match
├── controllers/service.js               # createCoreController
├── routes/service.js                    # createCoreRouter  
└── services/service.js                  # createCoreService
```

#### 2. Testimonials Content Type
```bash
src/api/testimonial/
├── content-types/testimonial/schema.json    # ADD sortOrder field!
├── controllers/testimonial.js               # createCoreController
├── routes/testimonial.js                    # createCoreRouter
└── services/testimonial.js                  # createCoreService
```

#### 3. Team Members Content Type  
```bash
src/api/team-member/
├── content-types/team-member/schema.json    # ADD isActive field!
├── controllers/team-member.js               # createCoreController
├── routes/team-member.js                    # createCoreRouter
└── services/team-member.js                  # createCoreService
```

### Phase 2: Content Population (After All Types Work)

#### Priority Order:
1. **Company Info** (singleType - contact details)
2. **Contact Info** (singleType - contact page) 
3. **Services** (collection - 8-10 services)
4. **Testimonials** (collection - 6-8 testimonials)
5. **Team Members** (collection - 3-5 members)
6. **FAQ** (collection - 10 FAQs) ✅ Schema ready

## 🚨 Schema Corrections Needed

### Fix 1: Testimonials Schema
**Add missing field**:
```json
"sortOrder": {
  "type": "integer", 
  "required": true,
  "default": 0
}
```

### Fix 2: Team Members Schema  
**Add missing field**:
```json
"isActive": {
  "type": "boolean",
  "required": true, 
  "default": true
}
```

## ✅ Safe Deployment Checklist

### For Each Content Type:
- [ ] Copy exact schema from working CMS
- [ ] Verify matches website interface
- [ ] Use ONLY standard patterns:
  - `createCoreController('api::name.name')`
  - `createCoreRouter('api::name.name')`  
  - `createCoreService('api::name.name')`
- [ ] Test deployment success
- [ ] Test API endpoint: `curl /api/[plural-name]`
- [ ] Set public permissions in admin
- [ ] Add test content entry
- [ ] Verify website integration

### Deployment Commands:
```bash
# After creating each content type
git add .
git commit -m "Add [ContentType] with exact CMS schema and safe patterns"
git push origin main

# Wait for Railway deployment (2-3 minutes)
# Test: curl https://strapi-production-6dd1.up.railway.app/api/[content-type]
```

## 📋 Expected API Endpoints

Once complete, website will use:
- ✅ `GET /api/faqs` - Ready
- 🔄 `GET /api/services` - Pending  
- 🔄 `GET /api/testimonials` - Pending
- 🔄 `GET /api/team-members` - Pending
- 🔄 `GET /api/company-info` - Pending (singleType)
- 🔄 `GET /api/contact-info` - Pending (singleType)

## 🎯 Success Criteria

1. **All API endpoints return data**
2. **Website displays content correctly**  
3. **No schema mismatches**
4. **All deployments successful**
5. **Admin panel fully functional**

---

**Next Action**: Create Services content type with exact CMS schema match.