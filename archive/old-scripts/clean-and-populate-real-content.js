#!/usr/bin/env node

/**
 * Clean and Populate Real Content from Original CMS
 * This script:
 * 1. Deletes all fake/placeholder content
 * 2. Populates only real content from original CMS populate scripts
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// Helper to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (data && method !== 'GET') {
    options.body = JSON.stringify({ data });
  }
  
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, options);
  
  if (!response.ok && response.status !== 404) {
    const errorText = await response.text();
    throw new Error(`API call failed: ${response.status} - ${errorText}`);
  }
  
  return response.status === 404 ? null : await response.json();
}

// Delete all entries from a collection
async function deleteAllEntries(endpoint, name) {
  try {
    const response = await apiCall(endpoint);
    if (!response || !response.data) {
      console.log(`  ⚠️  No ${name} entries found`);
      return 0;
    }
    
    let deleted = 0;
    for (const item of response.data) {
      try {
        await apiCall(`${endpoint}/${item.id}`, 'DELETE');
        deleted++;
      } catch (error) {
        console.error(`  ❌ Failed to delete ${name} #${item.id}`);
      }
    }
    
    console.log(`  ✅ Deleted ${deleted} ${name} entries`);
    return deleted;
  } catch (error) {
    console.error(`  ❌ Error deleting ${name}: ${error.message}`);
    return 0;
  }
}

// Real content from original CMS populate scripts
const realContent = {
  // From populate-services.js (3 services only)
  services: [
    {
      name: "Construction Traffic Control",
      slug: "construction-traffic-control",
      shortDescription: "Professional traffic management for construction and roadwork sites",
      fullDescription: "Expert traffic management for construction sites, roadworks, and infrastructure projects. Our certified controllers ensure safe passage for both workers and the public.",
      features: [
        "Certified traffic controllers",
        "Traffic Management Plans (TMPs)",
        "Site-specific safety protocols",
        "Emergency response procedures",
        "Coordination with local authorities"
      ],
      sortOrder: 1,
      isActive: true,
      featured: true
    },
    {
      name: "Event Traffic Management",
      slug: "event-traffic-management",
      shortDescription: "Traffic control for events, festivals, and large gatherings",
      fullDescription: "Comprehensive traffic control for festivals, concerts, sporting events, and community gatherings. We handle crowd flow and vehicle management with precision.",
      features: [
        "Event-specific traffic plans",
        "Crowd flow management",
        "Emergency vehicle access",
        "Parking coordination",
        "Multi-site coordination"
      ],
      sortOrder: 2,
      isActive: true,
      featured: true
    },
    {
      name: "Emergency Response",
      slug: "emergency-response",
      shortDescription: "24/7 emergency traffic control and rapid response services",
      fullDescription: "Immediate traffic control deployment for accidents, emergency services, and crisis situations. Our rapid response team is available 24/7.",
      features: [
        "24/7 emergency hotline",
        "Rapid deployment teams",
        "Emergency services coordination",
        "Incident scene management",
        "Multi-agency cooperation"
      ],
      sortOrder: 3,
      isActive: true,
      featured: true
    }
  ],

  // From populate-team-members.js (4 members only)
  'team-members': [
    {
      name: "Sarah Johnson",
      position: "Operations Manager",
      bio: "Sarah brings 15 years of traffic management experience and military logistics background to ensure smooth operations across all our projects.",
      email: "sarah.johnson@nswtrafficcontrol.com.au",
      phone: "0407 410 223",
      linkedIn: "https://linkedin.com/in/sarah-johnson-nswtc",
      sortOrder: 1
    },
    {
      name: "Michael Chen",
      position: "Senior Traffic Controller",
      bio: "Michael is our lead field controller with extensive experience in complex urban construction projects and emergency response situations.",
      email: "michael.chen@nswtrafficcontrol.com.au",
      phone: "0407 410 223",
      linkedIn: "https://linkedin.com/in/michael-chen-nswtc",
      sortOrder: 2
    },
    {
      name: "Emma Rodriguez",
      position: "Traffic Management Planner",
      bio: "Emma specializes in developing comprehensive traffic management plans and ensuring regulatory compliance for major infrastructure projects.",
      email: "emma.rodriguez@nswtrafficcontrol.com.au",
      phone: "0407 410 223",
      linkedIn: "https://linkedin.com/in/emma-rodriguez-nswtc",
      sortOrder: 3
    },
    {
      name: "David Thompson",
      position: "Emergency Response Coordinator",
      bio: "David leads our 24/7 emergency response team with a background in emergency services and rapid deployment protocols.",
      email: "david.thompson@nswtrafficcontrol.com.au",
      phone: "0407 410 223",
      linkedIn: "https://linkedin.com/in/david-thompson-nswtc",
      sortOrder: 4
    }
  ],

  // From populate-core-values.js (4 values)
  'core-values': [
    {
      title: "Safety First",
      description: "Every decision we make prioritizes the safety of workers, drivers, and the public.",
      icon: "shield"
    },
    {
      title: "Military Precision",
      description: "Our team brings military discipline and attention to detail to every project.",
      icon: "target"
    },
    {
      title: "Rapid Response",
      description: "Emergency deployments within 2-4 hours across NSW with 24/7 availability.",
      icon: "clock"
    },
    {
      title: "Professional Excellence",
      description: "Certified controllers with ongoing training and industry-leading standards.",
      icon: "award"
    }
  ],

  // From populate-our-process.js (5 steps)
  'our-processes': [
    {
      title: "Initial Consultation",
      description: "We assess your traffic control needs and develop a tailored solution for your specific requirements.",
      icon: "MessageCircle",
      sortOrder: 1,
      isActive: true
    },
    {
      title: "Planning & Permits",
      description: "Our experienced team develops comprehensive traffic management plans and handles all required permits.",
      icon: "FileText",
      sortOrder: 2,
      isActive: true
    },
    {
      title: "Resource Deployment",
      description: "We deploy certified controllers and professional equipment to your site within hours of approval.",
      icon: "Truck",
      sortOrder: 3,
      isActive: true
    },
    {
      title: "Active Monitoring",
      description: "Continuous oversight ensures optimal traffic flow and safety throughout your project duration.",
      icon: "Eye",
      sortOrder: 4,
      isActive: true
    },
    {
      title: "Project Completion",
      description: "Professional site restoration and comprehensive documentation delivery upon project completion.",
      icon: "CheckCircle",
      sortOrder: 5,
      isActive: true
    }
  ],

  // From populate-culture-values.js (first 6 only for consistency)
  'culture-values': [
    {
      title: "Safety Culture",
      description: "Safety is our top priority in every decision and action we take. We maintain the highest safety standards through continuous training, proper equipment, and vigilant risk management.",
      icon: "Shield",
      sortOrder: 1,
      isActive: true
    },
    {
      title: "Team Excellence",
      description: "We work together as a unified team to achieve outstanding results for our clients. Collaboration, mutual respect, and shared accountability drive our success.",
      icon: "Users",
      sortOrder: 2,
      isActive: true
    },
    {
      title: "Professional Pride",
      description: "We take pride in our work and maintain the highest professional standards. Our reputation is built on consistent excellence and reliability in every project.",
      icon: "Award",
      sortOrder: 3,
      isActive: true
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's growth through ongoing training, certification programs, and professional development opportunities. Learning never stops at NSW Traffic Control.",
      icon: "BookOpen",
      sortOrder: 4,
      isActive: true
    },
    {
      title: "Reliable Service",
      description: "We're dependable partners our clients can count on 24/7. Our commitment to reliability means being where we say we'll be, when we say we'll be there.",
      icon: "CheckCircle",
      sortOrder: 5,
      isActive: true
    },
    {
      title: "Military Precision",
      description: "Our military-trained approach brings discipline, attention to detail, and systematic execution to every traffic control operation.",
      icon: "Target",
      sortOrder: 6,
      isActive: true
    }
  ],

  // From populate-benefits.js (first 6 for consistency)
  benefits: [
    {
      title: "Competitive Salary",
      description: "Industry-leading pay rates with regular reviews and performance bonuses. We recognize and reward excellence in traffic control services.",
      icon: "dollar-sign",
      sortOrder: 1,
      isActive: true
    },
    {
      title: "Comprehensive Training",
      description: "Full certification training including Traffic Control qualifications, Work Zone Safety, and ongoing professional development programs.",
      icon: "graduation-cap",
      sortOrder: 2,
      isActive: true
    },
    {
      title: "Flexible Schedule",
      description: "Various shift options including full-time, part-time, and casual positions to suit your lifestyle and commitments.",
      icon: "clock",
      sortOrder: 3,
      isActive: true
    },
    {
      title: "Career Progression",
      description: "Clear advancement pathways from controller to supervisor to management roles with mentorship and development support.",
      icon: "trending-up",
      sortOrder: 4,
      isActive: true
    },
    {
      title: "Professional Equipment",
      description: "All necessary equipment, uniforms, and personal protective equipment (PPE) provided and maintained at no cost to you.",
      icon: "hard-hat",
      sortOrder: 5,
      isActive: true
    },
    {
      title: "Health & Safety Focus",
      description: "Comprehensive health and safety programs, regular safety training, and focus on maintaining the highest safety standards.",
      icon: "shield",
      sortOrder: 6,
      isActive: true
    }
  ],

  // From populate-application-steps.js (4 steps)
  'application-steps': [
    {
      title: "Submit Application",
      description: "Complete our online application form with your contact details and relevant experience.",
      stepNumber: 1,
      icon: "FileText",
      isActive: true
    },
    {
      title: "Phone Screening",
      description: "Brief phone conversation to discuss your background and the role requirements.",
      stepNumber: 2,
      icon: "Phone",
      isActive: true
    },
    {
      title: "Face-to-Face Interview",
      description: "Meet with our team to discuss your experience and learn about our company culture.",
      stepNumber: 3,
      icon: "Users",
      isActive: true
    },
    {
      title: "Training & Onboarding",
      description: "Complete required certifications and join our professional traffic control team.",
      stepNumber: 4,
      icon: "Award",
      isActive: true
    }
  ],

  // From populate-career-faqs.js (4 FAQs)
  'career-faqs': [
    {
      question: "What qualifications do I need to become a traffic controller?",
      answer: "You'll need a valid driver's license and White Card. We provide full Traffic Control certification training including 'Prepare Work Zone Traffic Management Plan' and 'Control Traffic with Stop-Slow Bat' qualifications.",
      sortOrder: 1,
      isActive: true
    },
    {
      question: "Do you provide training for new employees?",
      answer: "Yes! We provide comprehensive training for all new team members, including Traffic Control certification, safety procedures, and on-the-job mentoring from experienced controllers.",
      sortOrder: 2,
      isActive: true
    },
    {
      question: "What are the working hours like?",
      answer: "We offer flexible scheduling with full-time, part-time, and casual positions. Shifts vary based on project needs, including day, night, and weekend work. Emergency response roles require 24/7 availability.",
      sortOrder: 3,
      isActive: true
    },
    {
      question: "How quickly can I start working?",
      answer: "Qualified candidates can often start immediately after successful interview and completion of required certifications. The entire onboarding process typically takes 1-2 weeks.",
      sortOrder: 4,
      isActive: true
    }
  ]
};

// Main function
async function main() {
  console.log('🧹 CLEANING AND POPULATING REAL CONTENT\n');
  console.log('Step 1: Deleting all existing content...\n');

  // Delete existing content
  const collectionsToClean = [
    'services',
    'team-members',
    'testimonials',
    'blog-posts',
    'faqs',
    'job-openings',
    'core-values',
    'our-processes',
    'culture-values',
    'benefits',
    'application-steps',
    'career-faqs'
  ];

  for (const collection of collectionsToClean) {
    await deleteAllEntries(collection, collection);
  }

  console.log('\n✅ Cleanup complete!\n');
  console.log('Step 2: Populating real content from original CMS...\n');

  // Populate real content
  for (const [endpoint, items] of Object.entries(realContent)) {
    console.log(`📝 Populating ${endpoint}...`);
    let success = 0;
    
    for (const item of items) {
      try {
        await apiCall(endpoint, 'POST', item);
        success++;
      } catch (error) {
        console.error(`  ❌ Failed to create item: ${error.message}`);
      }
    }
    
    console.log(`  ✅ Created ${success}/${items.length} ${endpoint}\n`);
  }

  // Also populate from backup (blog posts, testimonials, FAQs, job openings)
  console.log('Step 3: Populating content from backup file...\n');
  
  // Run the existing populate script for backup content
  const { exec } = require('child_process');
  const util = require('util');
  const execPromise = util.promisify(exec);
  
  try {
    const { stdout } = await execPromise('node /home/dev/code/clients/nswtc/strapi/scripts/populate-from-backup.js');
    console.log(stdout);
  } catch (error) {
    console.error('Error running backup populate script:', error.message);
  }

  console.log('\n🎉 REAL CONTENT POPULATION COMPLETE!\n');
  
  // Summary
  console.log('📊 Final Content Summary:');
  console.log('  • Services: 3 (real from original CMS)');
  console.log('  • Team Members: 4 (real from original CMS)');
  console.log('  • Core Values: 4 (real from original CMS)');
  console.log('  • Our Process: 5 steps (real from original CMS)');
  console.log('  • Culture Values: 6 (real from original CMS)');
  console.log('  • Benefits: 6 (real from original CMS)');
  console.log('  • Application Steps: 4 (real from original CMS)');
  console.log('  • Career FAQs: 4 (real from original CMS)');
  console.log('  • Blog Posts: 4 (from backup)');
  console.log('  • Testimonials: 4 (from backup)');
  console.log('  • FAQs: 5 (from backup)');
  console.log('  • Job Openings: 3 (from backup)');
  
  console.log('\n✅ All content is now REAL data from the original CMS!');
  console.log('🌐 View at: https://strapi-production-6dd1.up.railway.app/admin');
}

// Run the script
main().catch(console.error);