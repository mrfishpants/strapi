#!/usr/bin/env node

/**
 * Populate Services Content Type
 * Creates 6 core services for NSW Traffic Control website
 */

const API_BASE = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = '4065a6de4ecd54b7b24e73a03ab4f9766b6206b65acecfed1a7a7b8279f81ec989493575190bb39451250ee47712197c59e7184a3e5b4c0f45f1cc3a6f252a6d2e9d91a25944a9096b2ecd182da4410f6443b6f7cf8357a42e81bf9d6206dc3a6f18f71c17d85eeaa615452d96348e50948d371d4674f91bf0d60901eaf7fdb5';

const services = [
  {
    name: 'Emergency Traffic Control',
    slug: 'emergency-traffic-control',
    shortDescription: '24/7 emergency response for road incidents and urgent traffic management needs',
    fullDescription: 'Our emergency traffic control service provides immediate response for urgent situations. Available 24/7, our certified operators deploy quickly with specialized equipment to manage traffic flow during incidents, ensuring public safety and minimal disruption.',
    features: ['24/7 availability', 'Rapid response', 'Emergency equipment', 'Certified operators'],
    sortOrder: 10,
    featured: true,
    isActive: true
  },
  {
    name: 'Construction Traffic Management',
    slug: 'construction-traffic-management', 
    shortDescription: 'Complete traffic control solutions for construction sites and roadworks',
    fullDescription: 'Comprehensive traffic management for construction projects of all sizes. We provide certified controllers, traffic management plans, and all necessary equipment to ensure safe work zones while maintaining traffic flow.',
    features: ['Traffic management plans', 'Certified controllers', 'All equipment provided', 'Permit assistance'],
    sortOrder: 20,
    featured: true,
    isActive: true
  },
  {
    name: 'Event Traffic Control',
    slug: 'event-traffic-control',
    shortDescription: 'Professional traffic management for festivals, sporting events, and community gatherings',
    fullDescription: 'Specialized traffic control for events ensures safe access and smooth traffic flow. Our experienced team handles everything from small community events to large festivals and sporting venues.',
    features: ['Event planning', 'Crowd control', 'VIP management', 'Council liaison'],
    sortOrder: 30,
    featured: true,
    isActive: true
  },
  {
    name: 'School Zone Management',
    slug: 'school-zone-management',
    shortDescription: 'Safe traffic control solutions for school zones and educational facilities',
    fullDescription: 'Dedicated school zone traffic management prioritizing child safety. Our trained operators understand the unique requirements of educational environments and work closely with schools to ensure safe passage.',
    features: ['School hour management', 'Child safety focus', 'Regular scheduling', 'Trained operators'],
    sortOrder: 40,
    featured: false,
    isActive: true
  },
  {
    name: 'Utility Work Traffic Control',
    slug: 'utility-work-traffic-control',
    shortDescription: 'Specialized traffic management for utility installations and maintenance',
    fullDescription: 'Expert traffic control for utility work including telecommunications, water, gas, and electrical installations. We coordinate with utility companies to minimize disruption while maintaining safety standards.',
    features: ['Utility coordination', 'Minimal disruption', 'Flexible scheduling', 'Technical expertise'],
    sortOrder: 50,
    featured: false,
    isActive: true
  },
  {
    name: 'Traffic Equipment Hire',
    slug: 'traffic-equipment-hire',
    shortDescription: 'Professional traffic control equipment rental with optional certified operators',
    fullDescription: 'Comprehensive equipment hire service for contractors and organizations. Choose equipment-only rental or full-service options with certified operators. All equipment meets Australian standards.',
    features: ['Equipment only or with operators', 'Delivery service', 'Compliance documentation', 'Flexible rental periods'],
    sortOrder: 60,
    featured: false,
    isActive: true
  }
];

async function createService(serviceData) {
  try {
    const response = await fetch(`${API_BASE}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        data: serviceData
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created: ${serviceData.name} (ID: ${result.data.id})`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create ${serviceData.name}:`, error.message);
    return null;
  }
}

async function populateServices() {
  console.log('🚀 Starting Services population...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const service of services) {
    console.log(`Creating: ${service.name}...`);
    const result = await createService(service);
    
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n📊 Population Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📝 Total: ${services.length}`);

  if (successCount > 0) {
    console.log('\n🔗 Test the API:');
    console.log(`curl "${API_BASE}/api/services"`);
    console.log(`curl "${API_BASE}/api/services?filters[featured][$eq]=true"`);
  }
}

// Run the population
populateServices().catch(console.error);