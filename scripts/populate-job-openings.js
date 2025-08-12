#!/usr/bin/env node

/**
 * Populate Job Openings from backup data
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

const jobOpenings = [
  {
    title: "Senior Traffic Controller",
    slug: "senior-traffic-controller",
    location: "Sydney Metro",
    type: "full-time",
    department: "Operations",
    description: "<p>We're seeking an experienced Senior Traffic Controller to join our growing team in Sydney. This role involves leading traffic control operations on major construction and infrastructure projects.</p>\n\n<h3>Key Responsibilities:</h3>\n<ul>\n<li>Lead traffic control operations on major projects</li>\n<li>Supervise junior traffic controllers</li>\n<li>Ensure compliance with all safety regulations</li>\n<li>Coordinate with project managers and contractors</li>\n<li>Provide training and mentorship to team members</li>\n</ul>",
    requirements: "<ul>\n<li>Current Traffic Control qualification</li>\n<li>Minimum 5 years traffic control experience</li>\n<li>White Card and Working at Heights certification</li>\n<li>Strong leadership and communication skills</li>\n<li>Clean driving record and reliable vehicle</li>\n<li>Availability for shift work and weekends</li>\n</ul>",
    benefits: "<ul>\n<li>Competitive salary package</li>\n<li>Company vehicle and fuel card</li>\n<li>Comprehensive health insurance</li>\n<li>Professional development opportunities</li>\n<li>Annual performance bonuses</li>\n<li>Flexible working arrangements</li>\n</ul>",
    applicationDeadline: "2025-08-15",
    isActive: true,
    sortOrder: 1
  },
  {
    title: "Traffic Management Planner",
    slug: "traffic-management-planner",
    location: "Central Coast",
    type: "full-time",
    department: "Planning",
    description: "<p>Join our planning team as a Traffic Management Planner, responsible for developing comprehensive traffic management plans for construction and infrastructure projects.</p>\n\n<h3>Key Responsibilities:</h3>\n<ul>\n<li>Develop detailed traffic management plans</li>\n<li>Conduct site assessments and risk analyses</li>\n<li>Liaise with councils and RMS for approvals</li>\n<li>Support implementation of traffic control measures</li>\n<li>Ensure compliance with all regulations</li>\n</ul>",
    requirements: "<ul>\n<li>Relevant qualification in civil engineering or traffic management</li>\n<li>Experience with AutoCAD and traffic planning software</li>\n<li>Knowledge of NSW traffic regulations and RMS requirements</li>\n<li>Strong analytical and problem-solving skills</li>\n<li>Excellent written and verbal communication</li>\n<li>Current driver's license</li>\n</ul>",
    benefits: "<ul>\n<li>Competitive salary with performance incentives</li>\n<li>Professional development budget</li>\n<li>Modern office environment</li>\n<li>Health and wellness programs</li>\n<li>Flexible work arrangements</li>\n<li>Career advancement opportunities</li>\n</ul>",
    applicationDeadline: "2025-07-30",
    isActive: true,
    sortOrder: 2
  },
  {
    title: "Emergency Response Coordinator",
    slug: "emergency-response-coordinator",
    location: "Newcastle",
    type: "full-time",
    department: "Emergency Services",
    description: "<p>We're looking for an Emergency Response Coordinator to manage our 24/7 emergency traffic control services across the Hunter Valley region.</p>\n\n<h3>Key Responsibilities:</h3>\n<ul>\n<li>Coordinate emergency traffic control responses</li>\n<li>Maintain 24/7 emergency response capability</li>\n<li>Liaise with police, fire, and ambulance services</li>\n<li>Manage emergency response teams and equipment</li>\n<li>Develop emergency response procedures</li>\n</ul>",
    requirements: "<ul>\n<li>Emergency services or traffic management background</li>\n<li>Strong coordination and communication skills</li>\n<li>Ability to work under pressure</li>\n<li>Availability for on-call duties</li>\n<li>Current traffic control qualifications</li>\n<li>Clean driving record</li>\n</ul>",
    benefits: "<ul>\n<li>Excellent salary package with on-call allowances</li>\n<li>Company vehicle and equipment</li>\n<li>Comprehensive training program</li>\n<li>Health and safety benefits</li>\n<li>Professional development support</li>\n<li>Team building activities</li>\n</ul>",
    applicationDeadline: "2025-08-01",
    isActive: true,
    sortOrder: 3
  }
];

async function createJobOpening(job) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/job-openings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: job })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Created: ${job.title}`);
      return result.data;
    } else {
      console.error(`❌ Failed to create ${job.title}:`, result.error?.message || response.statusText);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${job.title}:`, error.message);
    return null;
  }
}

async function populateJobOpenings() {
  console.log('🚀 Populating Job Openings...\n');

  let successCount = 0;
  let failCount = 0;

  for (const job of jobOpenings) {
    const result = await createJobOpening(job);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} job openings`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} job openings`);
    console.log('\n⚠️  If you see "Forbidden" errors, please:');
    console.log('1. Go to Strapi Admin Panel');
    console.log('2. Navigate to Settings > Users & Permissions > Roles > Public');
    console.log('3. Enable "create" and "find" for job-openings');
  }
  console.log('='.repeat(50));
}

// Run the population
populateJobOpenings().catch(console.error);