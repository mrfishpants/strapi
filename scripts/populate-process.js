#!/usr/bin/env node

/**
 * Populate Our Process Steps
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

const processSteps = [
  {
    title: "Initial Consultation",
    description: "We assess your project requirements, site conditions, and traffic management needs.",
    icon: "MessageSquare",
    details: {
      duration: "24-48 hours",
      deliverables: ["Site assessment", "Initial recommendations", "Cost estimate"]
    },
    sortOrder: 1,
    isActive: true
  },
  {
    title: "Traffic Management Plan",
    description: "Our experts create a comprehensive TMP that meets all regulatory requirements.",
    icon: "Map",
    details: {
      duration: "2-5 days",
      deliverables: ["Detailed TMP", "Risk assessment", "Permit applications"]
    },
    sortOrder: 2,
    isActive: true
  },
  {
    title: "Approval & Permits",
    description: "We handle all permit applications and council approvals for full compliance.",
    icon: "FileCheck",
    details: {
      duration: "5-10 days",
      deliverables: ["Council approvals", "RMS permits", "Compliance certificates"]
    },
    sortOrder: 3,
    isActive: true
  },
  {
    title: "Implementation",
    description: "Our certified traffic controllers deploy with all necessary equipment.",
    icon: "Users",
    details: {
      duration: "As per project",
      deliverables: ["Traffic control services", "Equipment setup", "Safety monitoring"]
    },
    sortOrder: 4,
    isActive: true
  }
];

async function createProcessStep(step) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/our-processes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: step })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Created: Step ${step.sortOrder} - ${step.title}`);
      return result.data;
    } else {
      console.error(`❌ Failed to create Step ${step.sortOrder}:`, result.error?.message || response.statusText);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating Step ${step.sortOrder}:`, error.message);
    return null;
  }
}

async function populateProcessSteps() {
  console.log('🚀 Populating Our Process Steps...\n');

  let successCount = 0;
  let failCount = 0;

  for (const step of processSteps) {
    const result = await createProcessStep(step);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} process steps`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} process steps`);
    console.log('\n⚠️  If you see "Forbidden" errors, please:');
    console.log('1. Go to Strapi Admin Panel');
    console.log('2. Navigate to Settings > Users & Permissions > Roles > Public');
    console.log('3. Enable "create" and "find" for our-processes');
  }
  console.log('='.repeat(50));
}

// Run the population
populateProcessSteps().catch(console.error);