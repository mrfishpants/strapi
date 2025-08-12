#!/usr/bin/env node

/**
 * Populate Strapi with team members from real NSW Traffic Control data
 * Run: STRAPI_API_TOKEN=your_token node scripts/populate-team-members.js
 */

const API_BASE = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = '4065a6de4ecd54b7b24e73a03ab4f9766b6206b65acecfed1a7a7b8279f81ec989493575190bb39451250ee47712197c59e7184a3e5b4c0f45f1cc3a6f252a6d2e9d91a25944a9096b2ecd182da4410f6443b6f7cf8357a42e81bf9d6206dc3a6f18f71c17d85eeaa615452d96348e50948d371d4674f91bf0d60901eaf7fdb5';

// Real team members data from NSW Traffic Control
const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "Operations Manager",
    bio: "Sarah brings 15 years of traffic management experience and military logistics background to ensure smooth operations across all our projects.",
    email: "sarah.johnson@nswtrafficcontrol.com.au",
    phone: "0407 410 223",
    linkedIn: "https://linkedin.com/in/sarah-johnson-nswtc",
    sortOrder: 1,
  },
  {
    name: "Michael Chen",
    position: "Senior Traffic Controller",
    bio: "Michael is our lead field controller with extensive experience in complex urban construction projects and emergency response situations.",
    email: "michael.chen@nswtrafficcontrol.com.au",
    phone: "0407 410 223",
    linkedIn: "https://linkedin.com/in/michael-chen-nswtc",
    sortOrder: 2,
  },
  {
    name: "Emma Rodriguez",
    position: "Traffic Management Planner",
    bio: "Emma specializes in developing comprehensive traffic management plans and ensuring regulatory compliance for major infrastructure projects.",
    email: "emma.rodriguez@nswtrafficcontrol.com.au",
    phone: "0407 410 223",
    linkedIn: "https://linkedin.com/in/emma-rodriguez-nswtc",
    sortOrder: 3,
  },
  {
    name: "David Thompson",
    position: "Emergency Response Coordinator",
    bio: "David leads our 24/7 emergency response team with a background in emergency services and rapid deployment protocols.",
    email: "david.thompson@nswtrafficcontrol.com.au",
    phone: "0407 410 223",
    linkedIn: "https://linkedin.com/in/david-thompson-nswtc",
    sortOrder: 4,
  },
];

async function createTeamMember(memberData) {
  try {
    console.log(`📝 Creating team member: ${memberData.name}...`);
    const response = await fetch(`${API_BASE}/api/team-members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: memberData })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created team member: ${memberData.name} (ID: ${result.data.id})`);
    return result.data;
  } catch (error) {
    console.error(`❌ Failed to create ${memberData.name}:`, error.message);
    return null;
  }
}

async function populateTeamMembers() {
  console.log('🚀 Starting real team members population...\n');
  console.log(`📍 Target: ${API_BASE}`);
  console.log(`🔑 Using API token: ${API_TOKEN.substring(0, 20)}...`);
  console.log('');

  let successCount = 0;
  for (const member of teamMembers) {
    const result = await createTeamMember(member);
    if (result) successCount++;

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Population complete! Created ${successCount}/${teamMembers.length} team members.`);

  // Verify the team members
  console.log('\n🔍 Verifying team members...');
  try {
    const response = await fetch(`${API_BASE}/api/team-members?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`📊 Total team members in Strapi: ${data.data.length}`);

      data.data.forEach(member => {
        console.log(`  - ${member.name} (${member.position || 'no position'})`);
      });
    }
  } catch (error) {
    console.error('Error verifying team members:', error.message);
  }
}

// Run the script
populateTeamMembers().catch(console.error);