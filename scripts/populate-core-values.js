#!/usr/bin/env node

/**
 * Populate Core Values
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

const coreValues = [
  {
    title: "Safety First",
    description: "Safety is our top priority. We protect workers, motorists, and pedestrians through rigorous safety protocols and continuous training.",
    icon: "Shield",
    sortOrder: 1
  },
  {
    title: "Reliability",
    description: "Available 24/7, we deliver consistent, dependable service that our clients can count on for any project or emergency.",
    icon: "Clock",
    sortOrder: 2
  },
  {
    title: "Professionalism",
    description: "Our certified controllers maintain the highest standards of conduct, appearance, and expertise in every situation.",
    icon: "Award",
    sortOrder: 3
  },
  {
    title: "Innovation",
    description: "We embrace new technologies and methods to improve traffic management efficiency and safety outcomes.",
    icon: "Lightbulb",
    sortOrder: 4
  }
];

async function createCoreValue(value) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/core-values`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: value })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Created: ${value.title}`);
      return result.data;
    } else {
      console.error(`❌ Failed to create ${value.title}:`, result.error?.message || response.statusText);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${value.title}:`, error.message);
    return null;
  }
}

async function populateCoreValues() {
  console.log('🚀 Populating Core Values...\n');

  let successCount = 0;
  let failCount = 0;

  for (const value of coreValues) {
    const result = await createCoreValue(value);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} core values`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} core values`);
    console.log('\n⚠️  If you see "Forbidden" errors, please:');
    console.log('1. Go to Strapi Admin Panel');
    console.log('2. Navigate to Settings > Users & Permissions > Roles > Public');
    console.log('3. Enable "create" and "find" for core-values');
  }
  console.log('='.repeat(50));
}

// Run the population
populateCoreValues().catch(console.error);