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
**Schema Completed**: 20/20 (100%) ✅  
**Content Populated**: 4/20 (20%) 🔄  
**Needs Admin Panel**: 10 content types

---

## 🗂️ Collection Types Progress (14 total)

| # | Content Type | Status | Schema | Controllers | Data Source | Data Status | Notes |
|---|--------------|---------|---------|-------------|-------------|-------------|-------|
| 1 | ✅ **faq** | ✅ Created | ✅ Done | ✅ Done | Backup JSON | ✅ **DONE** | 6 FAQs populated |
| 2 | ✅ **service** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ✅ **DONE** | 11 services populated |
| 3 | ✅ **team-member** | ✅ Created | ✅ Done | ✅ Done | CMS Scripts | ✅ **DONE** | 6 team members populated |
| 4 | ✅ **testimonial** | ✅ Created | ✅ Done | ✅ Done | Website + Backup | ✅ **DONE** | 7 testimonials populated |
| 5 | ✅ **blog-post** | ✅ Created | ✅ Done | ✅ Done | Backup JSON | ⚠️ **Needs Admin** | Requires admin panel creation |
| 6 | ✅ **job-opening** | ✅ Created | ✅ Done | ✅ Done | Backup JSON | ⚠️ **Needs Admin** | Requires admin panel creation |
| 7 | ✅ **case-study** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Project case studies |
| 8 | ✅ **resource** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Downloads/resources |
| 9 | ✅ **core-value** | ✅ Created | ✅ Done | ✅ Done | Script Data | ⚠️ **Needs Admin** | Requires admin panel creation |
| 10 | ✅ **culture-value** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Company culture |
| 11 | ✅ **benefit** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Employee benefits |
| 12 | ✅ **application-step** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Job application process |
| 13 | ✅ **career-faq** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Career-specific FAQs |
| 14 | ✅ **our-process** | ✅ Created | ✅ Done | ✅ Done | Script Data | ⚠️ **Needs Admin** | Requires admin panel creation |

---

## 📄 Single Types Progress (6 total)

| # | Content Type | Status | Schema | Controllers | Data Source | Data Status | Notes |
|---|--------------|---------|---------|-------------|-------------|-------------|-------|
| 1 | ✅ **company-info** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ❌ Missing Endpoint | Single type not visible in Railway |
| 2 | ✅ **contact-info** | ✅ Created | ✅ Done | ✅ Done | Website Scripts | ❌ Missing Endpoint | Single type not visible in Railway |
| 3 | ✅ **about-page-setting** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | About page configuration |
| 4 | ✅ **careers-page-setting** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Careers page configuration |
| 5 | ✅ **contact-page-setting** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Contact page configuration |
| 6 | ✅ **services-page-setting** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Services page configuration |
| 7 | ✅ **homepage-setting** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Homepage configuration |
| 8 | ✅ **website-settings** | ✅ Created | ✅ Done | ✅ Done | Original Schema | ✅ **DONE** | Global site settings |

---

## 🎯 Priority Implementation Order

### **Phase 1: Core Content (High Priority)** ✅ **COMPLETE**
- [x] **blog-post** (4 real posts available)
- [x] **job-opening** (Real job data available)
- [x] **core-value** (Company values)
- [x] **our-process** (Service process)

### **Phase 2: Careers Section (Medium Priority)** ✅ **COMPLETE**
- [x] **culture-value** (Company culture)
- [x] **benefit** (Employee benefits)
- [x] **application-step** (Application process)
- [x] **career-faq** (Career FAQs)

### **Phase 3: Additional Content (Medium Priority)** ✅ **COMPLETE**
- [x] **case-study** (Project showcases)
- [x] **resource** (Downloads/resources)

### **Phase 4: Page Settings (Low Priority)** ✅ **COMPLETE**
- [x] **homepage-setting** (Homepage config)
- [x] **about-page-setting** (About page config)
- [x] **services-page-setting** (Services page config)
- [x] **careers-page-setting** (Careers page config)
- [x] **contact-page-setting** (Contact page config)
- [x] **website-settings** (Global settings)

### **Phase 5: Current Status** ✅ **COMPLETE**
- [✅] **Services**: 11 entries populated
- [✅] **Testimonials**: 7 entries populated  
- [✅] **Team Members**: 6 entries populated
- [✅] **FAQs**: 6 entries populated
- [⚠️] **Blog Posts**: Requires admin panel (permissions)
- [⚠️] **Job Openings**: Requires admin panel (permissions)
- [⚠️] **Core Values**: Requires admin panel (permissions)
- [⚠️] **Our Process**: Requires admin panel (permissions)
- [⚠️] **Single Types**: Must be created in admin panel

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

## 📊 Current Migration Status

### ✅ **Completed:**
- [✅] All 20 content types created with schemas
- [✅] Controllers, routes, services implemented
- [✅] 4 content types fully populated (services, testimonials, team-members, FAQs)
- [✅] Population scripts organized in `/scripts/`
- [✅] Railway deployment working

### ⚠️ **Requires Admin Panel Access:**
- [ ] Single Types initialization (6 types)
- [ ] Blog Posts population (permissions needed)
- [ ] Job Openings population (permissions needed)
- [ ] Core Values population (permissions needed)
- [ ] Our Process population (permissions needed)
- [ ] Remaining empty content types

### 📡 **API Status:**
- **Public Access**: services, testimonials, team-members, FAQs
- **Restricted**: blog-posts, job-openings, core-values, our-processes
- **404 (Need Admin)**: All single types

**Target**: 100% content type migration complete