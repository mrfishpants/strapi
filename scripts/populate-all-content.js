#!/usr/bin/env node

/**
 * Populate all remaining content types from backup data
 * No authentication needed as API is publicly writable
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// Blog Posts data from backup
const blogPosts = [
  {
    title: "The Future of Traffic Management in NSW",
    slug: "future-traffic-management-nsw",
    excerpt: "Exploring how technology and innovation are transforming traffic control across New South Wales.",
    content: "<p>The traffic management industry in NSW is undergoing a digital transformation that promises to revolutionize how we control and monitor road safety.</p>\n\n<h2>Smart Traffic Systems</h2>\n<p>Modern traffic management leverages cutting-edge technology including:</p>\n<ul>\n<li>AI-powered traffic flow analysis</li>\n<li>Real-time incident detection systems</li>\n<li>Automated traffic signal optimization</li>\n<li>Connected vehicle integration</li>\n</ul>\n\n<h2>Benefits for NSW Roads</h2>\n<p>These technological advances deliver measurable improvements:</p>\n<ul>\n<li>30% reduction in traffic congestion</li>\n<li>Faster emergency response times</li>\n<li>Enhanced safety for road workers</li>\n<li>More efficient resource allocation</li>\n</ul>\n\n<p>NSW Traffic Control is at the forefront of implementing these innovative solutions across the state.</p>",
    author: "NSW Traffic Control Innovation Team",
    category: "industry-news",
    metaTitle: "Future of Traffic Management NSW | NSW Traffic Control",
    metaDescription: "Discover how technology is transforming traffic management in NSW. Expert insights on smart systems and innovation.",
    keywords: "traffic management NSW, smart traffic systems, AI traffic control"
  },
  {
    title: "Winter Road Safety: Essential Tips for 2025",
    slug: "winter-road-safety-tips-2025",
    excerpt: "Stay safe on NSW roads this winter with essential safety tips for drivers and traffic control workers.",
    content: "<p>Winter in NSW brings unique challenges for road safety. Here's your comprehensive guide to staying safe during the colder months.</p>\n\n<h2>For Drivers</h2>\n<ul>\n<li>Increase following distances on wet roads</li>\n<li>Check tires and wipers before long trips</li>\n<li>Use headlights in fog and rain</li>\n<li>Reduce speed in work zones</li>\n<li>Keep emergency kit in vehicle</li>\n</ul>\n\n<h2>For Traffic Control Workers</h2>\n<ul>\n<li>Wear thermal high-visibility clothing</li>\n<li>Take regular warming breaks</li>\n<li>Use anti-slip safety footwear</li>\n<li>Increase lighting in work zones</li>\n<li>Monitor weather conditions constantly</li>\n</ul>\n\n<h2>Emergency Preparedness</h2>\n<p>NSW Traffic Control maintains 24/7 emergency response capability throughout winter, with specialized equipment and trained personnel ready to handle adverse weather conditions.</p>",
    author: "NSW Traffic Control Safety Team",
    category: "safety",
    metaTitle: "Winter Road Safety NSW 2025 | NSW Traffic Control",
    metaDescription: "Essential winter road safety tips for NSW drivers and traffic control workers. Stay safe with expert advice.",
    keywords: "winter road safety, NSW traffic control, road safety tips"
  },
  {
    title: "Major Infrastructure Projects: Our Role in NSW Development",
    slug: "major-infrastructure-projects-nsw",
    excerpt: "How NSW Traffic Control supports major infrastructure development across the state.",
    content: "<p>NSW Traffic Control plays a crucial role in supporting major infrastructure projects that shape the future of our state.</p>\n\n<h2>Current Projects</h2>\n<p>We're currently involved in several significant infrastructure developments:</p>\n<ul>\n<li>Sydney Metro West extension</li>\n<li>M6 Stage 1 (Arncliffe to Kogarah)</li>\n<li>Great Western Highway upgrade</li>\n<li>Pacific Highway upgrades</li>\n</ul>\n\n<h2>Our Contribution</h2>\n<p>For each project, we provide:</p>\n<ul>\n<li>Comprehensive traffic management planning</li>\n<li>24/7 traffic control during construction</li>\n<li>Emergency response coordination</li>\n<li>Community impact minimization</li>\n</ul>\n\n<p>These projects represent billions of dollars in investment and will benefit NSW residents for decades to come.</p>",
    author: "NSW Traffic Control Project Team",
    category: "company-updates",
    metaTitle: "Infrastructure Projects NSW | NSW Traffic Control",
    metaDescription: "Learn about NSW Traffic Control's role in major infrastructure projects across New South Wales.",
    keywords: "NSW infrastructure, traffic management projects, construction traffic control"
  }
];

// FAQs
const faqs = [
  {
    question: "What areas do you service?",
    answer: "We provide traffic control services across the NSW Central Coast and surrounding regions, including Newcastle, Sydney North Shore, and Hunter Valley. Our teams can mobilize to any location within NSW for major projects.",
    category: "general",
    featured: true,
    sortOrder: 1
  },
  {
    question: "Are your traffic controllers certified?",
    answer: "Yes, all our traffic controllers hold current SafeWork NSW certification and are trained to the highest industry standards. We maintain ongoing training programs to ensure our team stays current with regulations and best practices.",
    category: "general",
    featured: true,
    sortOrder: 2
  },
  {
    question: "Do you provide 24/7 emergency services?",
    answer: "Absolutely. We offer 24/7 emergency traffic control services with rapid response times. Our emergency hotline 1300 972 872 is always staffed to dispatch teams immediately.",
    category: "general",
    featured: true,
    sortOrder: 3
  },
  {
    question: "How quickly can you deploy for emergencies?",
    answer: "For emergency situations, we guarantee deployment within 30 minutes for Central Coast locations and within 60 minutes for greater Sydney and Newcastle areas.",
    category: "general",
    featured: false,
    sortOrder: 4
  },
  {
    question: "Do you handle permit applications?",
    answer: "Yes, we manage all aspects of traffic management permits including applications, council liaison, and compliance documentation. Our team is experienced with local council requirements across NSW.",
    category: "general",
    featured: false,
    sortOrder: 5
  }
];

// Core Values
const coreValues = [
  {
    title: "Safety First",
    description: "Safety is our top priority. We protect workers, motorists, and pedestrians through rigorous safety protocols and continuous training.",
    icon: "Shield",
    sortOrder: 1,
    isActive: true
  },
  {
    title: "Reliability",
    description: "Available 24/7, we deliver consistent, dependable service that our clients can count on for any project or emergency.",
    icon: "Clock",
    sortOrder: 2,
    isActive: true
  },
  {
    title: "Professionalism",
    description: "Our certified controllers maintain the highest standards of conduct, appearance, and expertise in every situation.",
    icon: "Award",
    sortOrder: 3,
    isActive: true
  },
  {
    title: "Innovation",
    description: "We embrace new technologies and methods to improve traffic management efficiency and safety outcomes.",
    icon: "Lightbulb",
    sortOrder: 4,
    isActive: true
  }
];

// Our Process steps
const processSteps = [
  {
    stepNumber: 1,
    title: "Initial Consultation",
    description: "We assess your project requirements, site conditions, and traffic management needs to develop a tailored solution.",
    icon: "MessageSquare",
    details: JSON.stringify({
      duration: "24-48 hours",
      deliverables: ["Site assessment", "Initial recommendations", "Cost estimate"]
    }),
    isActive: true
  },
  {
    stepNumber: 2,
    title: "Traffic Management Plan",
    description: "Our experts create a comprehensive TMP that meets all regulatory requirements and optimizes traffic flow.",
    icon: "Map",
    details: JSON.stringify({
      duration: "2-5 days",
      deliverables: ["Detailed TMP", "Risk assessment", "Permit applications"]
    }),
    isActive: true
  },
  {
    stepNumber: 3,
    title: "Approval & Permits",
    description: "We handle all permit applications and council approvals, ensuring full compliance with local regulations.",
    icon: "FileCheck",
    details: JSON.stringify({
      duration: "5-10 days",
      deliverables: ["Council approvals", "RMS permits", "Compliance certificates"]
    }),
    isActive: true
  },
  {
    stepNumber: 4,
    title: "Implementation",
    description: "Our certified traffic controllers deploy with all necessary equipment to execute the traffic management plan.",
    icon: "Users",
    details: JSON.stringify({
      duration: "As per project",
      deliverables: ["Traffic control services", "Equipment setup", "Safety monitoring"]
    }),
    isActive: true
  }
];

// Helper function to create content
async function createContent(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });

    const result = await response.json();
    
    if (response.ok) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main population function
async function populateAllContent() {
  console.log('🚀 Starting content population...\n');

  // Populate Blog Posts
  console.log('📝 Populating Blog Posts...');
  for (const post of blogPosts) {
    const result = await createContent('blog-posts', post);
    if (result.success) {
      console.log(`  ✅ Created: ${post.title}`);
    } else {
      console.log(`  ❌ Failed: ${post.title}`, result.error?.message || '');
    }
  }

  // Clean up test FAQ first
  console.log('\n🧹 Cleaning test FAQ...');
  // Note: We'll keep existing FAQs and add more

  // Populate FAQs
  console.log('\n📝 Populating FAQs...');
  for (const faq of faqs) {
    const result = await createContent('faqs', faq);
    if (result.success) {
      console.log(`  ✅ Created: ${faq.question}`);
    } else {
      console.log(`  ❌ Failed: ${faq.question}`, result.error?.message || '');
    }
  }

  // Populate Core Values
  console.log('\n📝 Populating Core Values...');
  for (const value of coreValues) {
    const result = await createContent('core-values', value);
    if (result.success) {
      console.log(`  ✅ Created: ${value.title}`);
    } else {
      console.log(`  ❌ Failed: ${value.title}`, result.error?.message || '');
    }
  }

  // Populate Our Process
  console.log('\n📝 Populating Our Process...');
  for (const step of processSteps) {
    const result = await createContent('our-processes', step);
    if (result.success) {
      console.log(`  ✅ Created: Step ${step.stepNumber} - ${step.title}`);
    } else {
      console.log(`  ❌ Failed: Step ${step.stepNumber}`, result.error?.message || '');
    }
  }

  console.log('\n✅ Content population complete!');
  
  // Final status check
  console.log('\n📊 Final Status Check:');
  const endpoints = [
    'services', 'testimonials', 'team-members', 'blog-posts', 
    'faqs', 'core-values', 'our-processes'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
      const data = await response.json();
      const count = data.meta?.pagination?.total || 0;
      console.log(`  ${endpoint}: ${count} entries`);
    } catch (error) {
      console.log(`  ${endpoint}: Error checking`);
    }
  }
}

// Run the population
populateAllContent().catch(console.error);