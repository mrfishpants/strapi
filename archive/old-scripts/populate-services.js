#!/usr/bin/env node

/**
 * Populate Strapi with services from real NSW Traffic Control data
 * Run: STRAPI_API_TOKEN=your_token node scripts/populate-services.js
 */

const API_BASE = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = '4065a6de4ecd54b7b24e73a03ab4f9766b6206b65acecfed1a7a7b8279f81ec989493575190bb39451250ee47712197c59e7184a3e5b4c0f45f1cc3a6f252a6d2e9d91a25944a9096b2ecd182da4410f6443b6f7cf8357a42e81bf9d6206dc3a6f18f71c17d85eeaa615452d96348e50948d371d4674f91bf0d60901eaf7fdb5';

// Real services data from NSW Traffic Control website
const services = [
  {
    name: 'Construction Traffic Management',
    slug: 'construction-traffic-management',
    shortDescription:
      'Professional traffic control for construction sites, ensuring worker safety and smooth traffic flow around work zones.',
    fullDescription: `Our construction traffic management service provides comprehensive solutions for construction projects of all sizes. We ensure compliance with all NSW traffic management regulations while maintaining efficient traffic flow around your work site.

Key features include:
- Complete work zone setup and management
- Certified traffic controllers on-site
- 24/7 emergency response availability
- Regular safety audits and compliance checks
- Coordination with local authorities
- Custom traffic management plans

Our experienced team works closely with construction managers to minimize disruptions while maximizing safety for workers and the public.`,
    features: ['traffic-management', 'construction', 'safety'],
    sortOrder: 1,
    isActive: true,
  },
  {
    name: 'Special Events Traffic Control',
    slug: 'special-events-traffic-control',
    shortDescription:
      'Expert traffic and crowd control for festivals, sports events, concerts, and public gatherings of any scale.',
    fullDescription: `From local community events to major concerts and sporting events, we provide professional traffic control services that ensure smooth operations and public safety.

Our special events services include:
- Comprehensive event traffic planning
- Pedestrian and vehicle management
- Parking area coordination
- Emergency vehicle access planning
- Crowd control barriers and signage
- Post-event traffic dispersal strategies

We work with event organizers, local councils, and emergency services to deliver seamless traffic management that enhances the event experience.`,
    features: ['traffic-management', 'events', 'planning'],
    sortOrder: 2,
    isActive: true,
  },
  {
    name: 'Emergency Response',
    slug: 'emergency-response',
    shortDescription:
      '24/7 rapid response for traffic emergencies, accidents, and unexpected road hazards across NSW.',
    fullDescription: `When emergencies strike, our rapid response team is ready 24/7 to manage traffic safely and efficiently. We work closely with emergency services to ensure quick incident resolution.

Emergency response services include:
- Immediate deployment within 30 minutes
- Accident scene traffic management
- Road closure implementation
- Detour route establishment
- Coordination with police and emergency services
- Hazard mitigation and public safety

Our emergency response team is equipped with all necessary equipment and trained to handle high-pressure situations professionally.`,
    features: ['emergency', 'traffic-management', '24-7'],
    sortOrder: 3,
    isActive: true,
  },
  {
    name: 'Traffic Management Plans',
    slug: 'traffic-management-plans',
    shortDescription:
      'Professional TMP development and permit assistance to ensure your projects meet all regulatory requirements.',
    fullDescription: `Navigate complex traffic management regulations with our expert TMP services. We create detailed, compliant traffic management plans that get approved quickly.

Our TMP services include:
- Comprehensive site assessment
- Detailed traffic flow analysis
- Risk assessment and mitigation strategies
- Permit application assistance
- Council liaison and approvals
- Regular plan updates and revisions

Every plan is tailored to your specific project needs and designed to meet or exceed all NSW traffic management standards.`,
    features: ['planning', 'permits', 'compliance'],
    sortOrder: 4,
    isActive: true,
  },
  {
    name: 'Road Works Traffic Control',
    slug: 'road-works-traffic-control',
    shortDescription:
      'Specialized traffic control for road maintenance, repairs, and infrastructure projects.',
    fullDescription: `Keep traffic flowing safely during road works with our specialized traffic control services. We manage everything from minor repairs to major infrastructure projects.

Road works services include:
- Lane closure management
- Temporary traffic signals
- Speed reduction zones
- Pedestrian access management
- Night works traffic control
- Multi-stage project coordination

Our teams are experienced in managing traffic around complex road works while maintaining safety and minimizing delays.`,
    features: ['traffic-management', 'road-works', 'infrastructure'],
    sortOrder: 5,
    isActive: true,
  },
  {
    name: 'Equipment Hire',
    slug: 'equipment-hire',
    shortDescription:
      'Quality traffic control equipment for hire, including signs, barriers, lights, and safety equipment.',
    fullDescription: `Access professional-grade traffic control equipment for your projects. We offer flexible hire options with or without operators.

Available equipment includes:
- Variable message signs (VMS)
- Traffic barriers and cones
- Temporary traffic lights
- Arrow boards and warning lights
- Safety barriers and fencing
- Portable speed displays

All equipment is regularly maintained and meets Australian Standards. We provide delivery, setup, and collection services.`,
    features: ['equipment', 'hire', 'self-service'],
    sortOrder: 6,
    isActive: true,
  },
];

async function createService(serviceData) {
  try {
    console.log(`📝 Creating service: ${serviceData.name}...`);
    const response = await fetch(`${API_BASE}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: serviceData })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created service: ${serviceData.name} (ID: ${result.data.id})`);
    return result.data;
  } catch (error) {
    console.error(`❌ Failed to create ${serviceData.name}:`, error.message);
    return null;
  }
}

async function populateServices() {
  console.log('🚀 Starting real services population...\n');
  console.log(`📍 Target: ${API_BASE}`);
  console.log(`🔑 Using API token: ${API_TOKEN.substring(0, 20)}...`);
  console.log('');

  let successCount = 0;
  for (const service of services) {
    const result = await createService(service);
    if (result) successCount++;

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Population complete! Created ${successCount}/${services.length} services.`);

  // Verify the services
  console.log('\n🔍 Verifying services...');
  try {
    const response = await fetch(`${API_BASE}/api/services?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`📊 Total services in Strapi: ${data.data.length}`);

      data.data.forEach(service => {
        console.log(`  - ${service.name} (${service.slug || 'no slug'})`);
      });
    }
  } catch (error) {
    console.error('Error verifying services:', error.message);
  }
}

// Run the script
populateServices().catch(console.error);