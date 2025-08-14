# Content Population Plan

## 🎯 Objective
Populate all content types with data that matches the existing website content and original CMS data.

## 📋 Content Types Status

### ✅ Ready for Content
- [x] **FAQ** - Schema deployed, permissions set
- [x] **Services** - Schema deployed, needs permissions  
- [x] **Testimonials** - Schema deployed, needs permissions
- [x] **Team Members** - Schema deployed, needs permissions

## 🎨 Content Sources

### From Original CMS Scripts
We have existing content in the original CMS populate scripts:

1. **FAQ Content**: `/nswtc-cms/scripts/content-types/content/populate-faqs.js`
   - 10 FAQs covering general, services, emergency, pricing, equipment, support
   - All have proper categories, sortOrder, isActive, featured flags

2. **Services Content**: `/nswtc-cms/scripts/populate-strapi-services.js`
   - ~8 services with names, slugs, descriptions, features
   - Need to map to new schema format

3. **Testimonials Content**: `/nswtc-cms/scripts/populate-strapi-testimonials.js`
   - Client testimonials with ratings, companies, positions
   - Need to add sortOrder field

4. **Team Members**: Check if scripts exist or create from website fallback data

## 📝 Content Population Methods

### Method 1: Admin Panel (Recommended for now)
**Pros**: 
- Visual interface
- Immediate feedback
- No API token needed
- Can test each entry

**Cons**: 
- Manual work
- Time consuming for large datasets

### Method 2: API Scripts (Later)
**Pros**: 
- Bulk population
- Repeatable
- Version controlled

**Cons**: 
- Need API tokens
- More complex setup

## 🚀 Phase 1: Manual Population via Admin Panel

### Step 1: Set All Permissions
In Railway admin panel:
- ✅ FAQ: Already set
- ⏳ Services: Enable find/findOne  
- ⏳ Testimonials: Enable find/findOne
- ⏳ Team Members: Enable find/findOne

### Step 2: Core Services (Priority 1)
**From original CMS data**, create these 6 essential services:

1. **Emergency Traffic Control**
   - Name: "Emergency Traffic Control"
   - Slug: "emergency-traffic-control"
   - Short Description: "24/7 emergency response for road incidents and urgent traffic management needs"
   - Features: ["24/7 availability", "Rapid response", "Emergency equipment", "Certified operators"]
   - Sort Order: 10, Featured: true, Active: true

2. **Construction Traffic Management**
   - Name: "Construction Traffic Management" 
   - Slug: "construction-traffic-management"
   - Short Description: "Complete traffic control solutions for construction sites and roadworks"
   - Features: ["Traffic management plans", "Certified controllers", "All equipment provided", "Permit assistance"]
   - Sort Order: 20, Featured: true, Active: true

3. **Event Traffic Control**
   - Name: "Event Traffic Control"
   - Slug: "event-traffic-control"
   - Short Description: "Professional traffic management for festivals, sporting events, and community gatherings"
   - Features: ["Event planning", "Crowd control", "VIP management", "Council liaison"]
   - Sort Order: 30, Featured: true, Active: true

4. **School Zone Management**
   - Name: "School Zone Management"
   - Slug: "school-zone-management"
   - Short Description: "Safe traffic control solutions for school zones and educational facilities"
   - Features: ["School hour management", "Child safety focus", "Regular scheduling", "Trained operators"]
   - Sort Order: 40, Featured: false, Active: true

5. **Utility Work Traffic Control**
   - Name: "Utility Work Traffic Control"
   - Slug: "utility-work-traffic-control"
   - Short Description: "Specialized traffic management for utility installations and maintenance"
   - Features: ["Utility coordination", "Minimal disruption", "Flexible scheduling", "Technical expertise"]
   - Sort Order: 50, Featured: false, Active: true

6. **Traffic Equipment Hire**
   - Name: "Traffic Equipment Hire"
   - Slug: "traffic-equipment-hire"
   - Short Description: "Professional traffic control equipment rental with optional certified operators"
   - Features: ["Equipment only or with operators", "Delivery service", "Compliance documentation", "Flexible rental periods"]
   - Sort Order: 60, Featured: false, Active: true

### Step 3: Key Testimonials (Priority 2)
Create 3-4 testimonials:

1. **Construction Client**
   - Client Name: "Sarah Mitchell"
   - Company: "Sydney Construction Group"
   - Position: "Project Manager"
   - Content: "NSW Traffic Control provided exceptional service for our major roadworks project. Their team was professional, punctual, and ensured zero safety incidents over 3 months."
   - Rating: 5, Sort Order: 10, Active: true

2. **Event Organizer**
   - Client Name: "Michael Roberts"
   - Company: "Metro Events Australia" 
   - Position: "Event Director"
   - Content: "Outstanding traffic management for our 10,000-person festival. The team handled complex logistics seamlessly and received praise from both attendees and local authorities."
   - Rating: 5, Sort Order: 20, Active: true

3. **Government Client**
   - Client Name: "Lisa Chen"
   - Company: "NSW Roads & Maritime"
   - Position: "Senior Traffic Engineer"
   - Content: "Reliable, professional service with excellent compliance standards. NSW Traffic Control consistently delivers quality traffic management solutions on time and within budget."
   - Rating: 5, Sort Order: 30, Active: true

### Step 4: Team Members (Priority 3)
Create 2-3 core team members:

1. **Operations Manager**
   - Name: "John Smith"
   - Position: "Operations Manager"
   - Bio: "15+ years experience in traffic management with military precision and safety focus"
   - Sort Order: 10, Active: true

2. **Senior Traffic Controller**
   - Name: "Emma Johnson"
   - Position: "Senior Traffic Controller"
   - Bio: "Certified traffic controller specializing in emergency response and complex traffic scenarios"
   - Sort Order: 20, Active: true

### Step 5: FAQ Population (Priority 4)
Add the 10 FAQs from the original populate script.

## ✅ Testing Checklist

After each content type population:

### API Tests
```bash
# Test each endpoint returns data
curl https://strapi-production-6dd1.up.railway.app/api/services
curl https://strapi-production-6dd1.up.railway.app/api/testimonials  
curl https://strapi-production-6dd1.up.railway.app/api/team-members
curl https://strapi-production-6dd1.up.railway.app/api/faqs

# Test filtered queries
curl "https://strapi-production-6dd1.up.railway.app/api/services?filters[featured][\$eq]=true"
curl "https://strapi-production-6dd1.up.railway.app/api/faqs?filters[category][\$eq]=general"
```

### Website Integration Tests
1. Check that all fields match website interfaces
2. Verify sortOrder works for ordering
3. Confirm isActive filtering works
4. Test featured content displays correctly

## 🎯 Success Criteria

- [ ] All 4 content types have API permissions set
- [ ] Services: 6 entries created and API working
- [ ] Testimonials: 3 entries created and API working  
- [ ] Team Members: 2 entries created and API working
- [ ] FAQ: 10 entries created and API working
- [ ] All endpoints return proper Strapi v5 format
- [ ] Website can consume all APIs without errors

## 📅 Timeline

**Today**: 
1. Set permissions for all content types
2. Create core Services (6 entries)
3. Test Services API endpoint

**Next**: 
1. Create Testimonials (3 entries)
2. Create Team Members (2 entries) 
3. Bulk populate FAQs
4. Full integration testing

---

**Ready to start once permissions are set for Services, Testimonials, and Team Members!**