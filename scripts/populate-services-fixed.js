/**
 * Populate Services in Railway Strapi
 * Fixed version that handles duplicate slugs
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

const services = [
  {
    title: "Traffic Control",
    slug: "traffic-control",
    description: "Professional traffic control services for construction sites, events, and emergencies. Our certified traffic controllers ensure safe and efficient traffic flow while protecting workers and the public.",
    shortDescription: "Certified traffic controllers for safe work zones",
    icon: "Shield",
    features: [
      "24/7 Emergency Response",
      "Certified Traffic Controllers",
      "Work Zone Protection",
      "Pedestrian Management"
    ],
    sortOrder: 1,
    isActive: true
  },
  {
    title: "Traffic Management Plans",
    slug: "traffic-management-plans",
    description: "Comprehensive traffic management plans (TMPs) designed and approved by certified professionals. We handle all aspects from initial assessment to council approvals.",
    shortDescription: "Council-approved traffic management plans",
    icon: "Map",
    features: [
      "RMS Approved Plans",
      "Council Liaison",
      "Risk Assessment",
      "Site-Specific Solutions"
    ],
    sortOrder: 2,
    isActive: true
  },
  {
    title: "Event Traffic Management",
    slug: "event-traffic-management",
    description: "Specialized traffic management for events of all sizes. From local community events to major festivals, we ensure smooth traffic flow and pedestrian safety.",
    shortDescription: "Expert traffic solutions for events",
    icon: "Calendar",
    features: [
      "Event Planning Support",
      "Crowd Control",
      "Parking Management",
      "VIP Route Planning"
    ],
    sortOrder: 3,
    isActive: true
  },
  {
    title: "Construction Site Traffic",
    slug: "construction-site-traffic",
    description: "Dedicated traffic management for construction projects. We coordinate with contractors to maintain site access while ensuring public safety and minimal disruption.",
    shortDescription: "Safe traffic flow around construction sites",
    icon: "Truck",
    features: [
      "Site Access Control",
      "Heavy Vehicle Management",
      "Long-term Solutions",
      "Safety Compliance"
    ],
    sortOrder: 4,
    isActive: true
  },
  {
    title: "Emergency Response",
    slug: "emergency-response",
    description: "Rapid deployment for emergency situations requiring immediate traffic control. Available 24/7 for accidents, road hazards, and urgent infrastructure repairs.",
    shortDescription: "24/7 emergency traffic control",
    icon: "AlertTriangle",
    features: [
      "24/7 Availability",
      "Rapid Response Team",
      "Emergency Services Coordination",
      "Incident Management"
    ],
    sortOrder: 5,
    isActive: true
  },
  {
    title: "Permit & Compliance",
    slug: "permit-compliance",
    description: "Complete permit and compliance management for your traffic control needs. We handle all documentation, approvals, and ensure full regulatory compliance.",
    shortDescription: "Permit management and compliance",
    icon: "FileCheck",
    features: [
      "Permit Applications",
      "Regulatory Compliance",
      "Documentation Management",
      "Audit Support"
    ],
    sortOrder: 6,
    isActive: true
  }
];

async function deleteExistingServices() {
  console.log('🗑️  Cleaning existing services...');
  
  try {
    // Get all existing services
    const response = await fetch(`${STRAPI_URL}/api/services?pagination[limit]=100`, {
      headers
    });
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      console.log(`Found ${data.data.length} existing services to delete`);
      
      // Delete each service
      for (const service of data.data) {
        await fetch(`${STRAPI_URL}/api/services/${service.id}`, {
          method: 'DELETE',
          headers
        });
        console.log(`  ✅ Deleted: ${service.attributes.title}`);
      }
    } else {
      console.log('  No existing services found');
    }
  } catch (error) {
    console.error('Error cleaning services:', error);
  }
}

async function createService(serviceData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: serviceData })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Created: ${serviceData.title}`);
      return result.data;
    } else {
      console.error(`❌ Failed to create ${serviceData.title}:`, result.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${serviceData.title}:`, error.message);
    return null;
  }
}

async function populateServices() {
  console.log('🚀 Starting Services population...\n');

  // First, clean existing services to avoid duplicates
  await deleteExistingServices();
  
  console.log('\n📝 Creating new services...');
  
  let successCount = 0;
  let failCount = 0;

  for (const service of services) {
    const result = await createService(service);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} services`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} services`);
  }
  console.log('='.repeat(50));
}

// Run the population
populateServices().catch(console.error);