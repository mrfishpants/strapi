# NSW Traffic Control - Content Types Migration Matrix

## 🎯 **Migration Process Overview**

### **Critical Migration Principles**

**⚠️ STRICT REPLICATION REQUIRED**: This migration must create an **IDENTICAL** copy of the original self-hosted Strapi CMS that was running at `cms.keenanbass.com`. We are NOT building a new CMS - we are **replicating an existing, working system**.

### **Data Sources Hierarchy (Use ONLY These):**
1. **Primary**: `/home/dev/code/clients/nswtc/nswtc-cms/` (Original CMS source code)
2. **Backup**: `/home/dev/code/clients/nswtc/nswtc-cms/backups/strapi-backup-latest.json` (Real content data)
3. **Scripts**: `/home/dev/code/clients/nswtc/nswtc-website/scripts/populate-strapi-*.js` (Approved content)

### **Schema Replication Process:**
1. **Copy Exact Schemas**: Use original schemas from `/nswtc-cms/src/api/[type]/content-types/[type]/schema.json`
2. **Clean for Strapi v5**: Remove ONLY invalid `column` properties (database-specific configs)
3. **Preserve Everything Else**: Keep all field types, validations, enums, relationships EXACTLY as original
4. **Match Structure**: Ensure collectionName, singularName, pluralName match exactly

### **Content Population Rules:**
- ✅ **USE ONLY**: Real data from backup JSON and approved scripts
- ❌ **NEVER CREATE**: Placeholder, fake, or example content
- ❌ **NO HALLUCINATION**: Do not invent business details, testimonials, blog posts, or any content
- ✅ **PRESERVE EXISTING**: Keep all original content metadata, dates, categories, etc.

### **Validation Requirements:**
- [ ] Each content type schema must match original exactly (minus column properties)
- [ ] All original content must be preserved and accessible
- [ ] API endpoints must return same structure as original CMS
- [ ] No content should be lost or modified during migration

---

## 📊 Progress Tracking

**Total Content Types**: 20  
**Completed**: 6/20 (30%)  
**Remaining**: 14/20 (70%)

---

## 🗂️ Collection Types Progress (14 total)

| # | Content Type | Status | Schema | Controllers | Data Source | Data Status | Notes |
|---|--------------|---------|---------|-------------|-------------|-------------|-------|
| 1 | ✅ **faq** | ✅ Created | ✅ Done | ✅ Done | Backup JSON | ❌ Pending | Basic FAQ entries |
| 2 | ✅ **service** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ✅ **DONE** | 5/6 populated (1 duplicate) |
| 3 | ✅ **team-member** | ✅ Created | ✅ Done | ✅ Done | CMS Scripts | ✅ **DONE** | 4/4 real members |
| 4 | ✅ **testimonial** | ✅ Created | ✅ Done | ✅ Done | Website + Backup | ✅ **DONE** | 4/4 real testimonials |
| 5 | ❌ **blog-post** | ❌ Missing | ❌ TODO | ❌ TODO | Backup JSON | ❌ Pending | 4 real blog posts |
| 6 | ❌ **job-opening** | ❌ Missing | ❌ TODO | ❌ TODO | Backup JSON | ❌ Pending | Job listings |
| 7 | ❌ **case-study** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Project case studies |
| 8 | ❌ **resource** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Downloads/resources |
| 9 | ❌ **core-value** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Company core values |
| 10 | ❌ **culture-value** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Company culture |
| 11 | ❌ **benefit** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Employee benefits |
| 12 | ❌ **application-step** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Job application process |
| 13 | ❌ **career-faq** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Career-specific FAQs |
| 14 | ❌ **our-process** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Service process steps |

---

## 📄 Single Types Progress (6 total)

| # | Content Type | Status | Schema | Controllers | Data Source | Data Status | Notes |
|---|--------------|---------|---------|-------------|-------------|-------------|-------|
| 1 | ✅ **company-info** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ❌ Missing Endpoint | Single type not visible in Railway |
| 2 | ✅ **contact-info** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ❌ Missing Endpoint | Single type not visible in Railway |
| 3 | ❌ **about-page-setting** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | About page configuration |
| 4 | ❌ **careers-page-setting** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Careers page configuration |
| 5 | ❌ **contact-page-setting** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Contact page configuration |
| 6 | ❌ **services-page-setting** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Services page configuration |
| 7 | ❌ **homepage-setting** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Homepage configuration |
| 8 | ❌ **website-settings** | ❌ Missing | ❌ TODO | ❌ TODO | TBD | ❌ Pending | Global site settings |

---

## 🎯 Priority Implementation Order

### **Phase 1: Core Content (High Priority)**
- [ ] **blog-post** (4 real posts available)
- [ ] **job-opening** (Real job data available)
- [ ] **core-value** (Company values)
- [ ] **our-process** (Service process)

### **Phase 2: Careers Section (Medium Priority)**
- [ ] **culture-value** (Company culture)
- [ ] **benefit** (Employee benefits)
- [ ] **application-step** (Application process)
- [ ] **career-faq** (Career FAQs)

### **Phase 3: Additional Content (Medium Priority)**
- [ ] **case-study** (Project showcases)
- [ ] **resource** (Downloads/resources)

### **Phase 4: Page Settings (Low Priority)**
- [ ] **homepage-setting** (Homepage config)
- [ ] **about-page-setting** (About page config)
- [ ] **services-page-setting** (Services page config)
- [ ] **careers-page-setting** (Careers page config)
- [ ] **contact-page-setting** (Contact page config)
- [ ] **website-settings** (Global settings)

### **Phase 5: Fix Existing Issues**
- [ ] **Fix Single Types** (company-info, contact-info endpoints)
- [ ] **Fix Service Duplicate** (Construction Traffic Management)
- [ ] **Populate FAQ** (Empty content type)

---

## 📋 Implementation Checklist Template

For each content type, complete these steps:

### **Step 1: Schema Creation**
- [ ] Copy schema from original CMS
- [ ] Remove invalid `column` properties (Strapi v5)
- [ ] Add required defaults for required fields
- [ ] Save as `src/api/[name]/content-types/[name]/schema.json`

### **Step 2: Controller/Route/Service Creation**
- [ ] Create `src/api/[name]/controllers/[name].js`
- [ ] Create `src/api/[name]/routes/[name].js` 
- [ ] Create `src/api/[name]/services/[name].js`

### **Step 3: Deployment & Testing**
- [ ] Deploy to Railway (auto-deploy on commit)
- [ ] Test endpoint: `GET /api/[plural-name]`
- [ ] Verify in Railway admin panel

### **Step 4: Data Population**
- [ ] Create population script in `/scripts/`
- [ ] Extract real data from sources
- [ ] Run population script
- [ ] Verify data in admin panel

---

## 🛠️ Commands Reference

```bash
# Check endpoint exists
curl -H "Authorization: Bearer TOKEN" https://strapi-production-6dd1.up.railway.app/api/[endpoint]

# Run population script
node scripts/populate-[content-type].js

# Deploy changes (auto-deploy on commit)
git add . && git commit -m "Add [content-type] content type"
```

---

## 📊 Data Sources Identified

| Source | Content Types | Status |
|--------|---------------|---------|
| Website Scripts | services, testimonials, company-info | ✅ Used |
| CMS Scripts | team-members | ✅ Used |
| Backup JSON | blog-posts, job-openings, testimonials | ⏳ Partially used |
| Original Schemas | All content types | ✅ Available |

---

## 🚨 Known Issues & Critical Reminders

### **Migration Issues:**
1. **Single Types Missing**: company-info and contact-info return 404 in Railway
2. **Service Duplicate**: Construction Traffic Management failed due to existing slug
3. **FAQ Empty**: Content type exists but no data populated
4. **Column Properties**: Original schemas contain invalid `column` configs for Strapi v5

### **🚨 CRITICAL CONTENT RULES:**
- **❌ NO FAKE DATA**: Do not create any placeholder content during this migration
- **❌ NO PLACEHOLDER TEXT**: Do not use "Lorem ipsum" or generic examples
- **❌ NO INVENTED CONTENT**: Do not create sample blog posts, testimonials, or team members
- **✅ REAL DATA ONLY**: Use exclusively the content from backup JSON and approved scripts
- **✅ PRESERVE ORIGINALS**: Maintain all original dates, categories, and metadata
- **⚠️ WHEN IN DOUBT**: Leave content type empty rather than populate with fake data

---

## ✅ Completion Criteria

- [ ] All 20 content types created and working
- [ ] All content types populated with real data  
- [ ] All API endpoints returning 200 OK
- [ ] Admin panel shows all content types
- [ ] Population scripts organized in `/scripts/`
- [ ] Documentation updated

**Target**: 100% content type migration complete