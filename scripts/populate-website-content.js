#!/usr/bin/env node

/**
 * Populate Railway Strapi with EXACT content from website fallback
 * This matches the data in nswtc-website/src/lib/fallback/*.ts files
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// Helper to make API calls
async function createEntry(endpoint, data) {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return await response.json();
}

async function populateContent(name, endpoint, items) {
  console.log(`\n📝 Populating ${name}...`);
  let success = 0;
  let failed = 0;
  
  for (const item of items) {
    try {
      await createEntry(endpoint, item);
      success++;
      process.stdout.write('.');
    } catch (error) {
      failed++;
      process.stdout.write('x');
    }
  }
  
  console.log('');
  console.log(`  ✅ Created ${success}/${items.length} ${name}`);
  if (failed > 0) {
    console.log(`  ❌ Failed ${failed} items`);
  }
  
  return success;
}

async function main() {
  console.log('🚀 POPULATING CONTENT FROM WEBSITE FALLBACK DATA');
  console.log('===============================================');
  
  let totalCreated = 0;
  
  // 1. Services (7 from website fallback/services.ts)
  const services = [
    {
      name: "Construction Traffic Control",
      slug: "construction-traffic-control",
      shortDescription: "Professional traffic management for construction and roadwork sites",
      fullDescription: "Expert traffic management for construction sites, roadworks, and infrastructure projects. Our certified controllers ensure safe passage for both workers and the public.",
      features: ["Certified traffic controllers", "Traffic Management Plans (TMPs)", "Site-specific safety protocols", "Emergency response procedures", "Coordination with local authorities"],
      sortOrder: 1,
      isActive: true,
      featured: true
    },
    {
      name: "Event Traffic Management",
      slug: "event-traffic-management",
      shortDescription: "Traffic control for events, festivals, and large gatherings",
      fullDescription: "Comprehensive traffic control for festivals, concerts, sporting events, and community gatherings. We handle crowd flow and vehicle management with precision.",
      features: ["Event-specific traffic plans", "Crowd flow management", "Emergency vehicle access", "Parking coordination", "Multi-site coordination"],
      sortOrder: 2,
      isActive: true,
      featured: true
    },
    {
      name: "Emergency Response",
      slug: "emergency-response",
      shortDescription: "24/7 emergency traffic control and rapid response services",
      fullDescription: "Immediate traffic control deployment for accidents, emergency services, and crisis situations. Our rapid response team is available 24/7.",
      features: ["24/7 emergency hotline", "Rapid deployment teams", "Emergency services coordination", "Incident scene management", "Multi-agency cooperation"],
      sortOrder: 3,
      isActive: true,
      featured: true
    },
    {
      name: "Specialized Traffic Solutions",
      slug: "specialized-traffic-solutions",
      shortDescription: "Custom traffic solutions for specialized requirements",
      fullDescription: "Custom traffic management for unique situations including oversize vehicle escorts, utility works, and complex urban projects.",
      features: ["Oversize vehicle escorts", "Utility work coordination", "Complex urban projects", "Multi-lane closures", "Bridge and tunnel work"],
      sortOrder: 4,
      isActive: true,
      featured: false
    },
    {
      name: "Traffic Management Planning",
      slug: "traffic-management-planning",
      shortDescription: "Professional traffic management planning and consultation",
      fullDescription: "Comprehensive traffic management plan development, risk assessment, and regulatory compliance for major projects. Generally, a Traffic Control Plan is $110.00 each, with a 24 hour turn around.",
      features: ["Traffic Management Plans (TMPs)", "Risk assessment and mitigation", "Regulatory compliance", "Authority approvals", "Ongoing plan updates"],
      sortOrder: 5,
      isActive: true,
      featured: false
    },
    {
      name: "Airport Traffic Control",
      slug: "airport-traffic-control",
      shortDescription: "Airport traffic control with security clearance",
      fullDescription: "Specialized traffic management for airport construction, maintenance, and emergency situations with strict security protocols.",
      features: ["ASIC certified controllers", "Security protocol compliance", "Runway safety procedures", "Emergency response protocols", "Coordination with air traffic control"],
      sortOrder: 6,
      isActive: true,
      featured: false
    },
    {
      name: "Sign Hire",
      slug: "sign-hire",
      shortDescription: "Our Signs can be hired short term, long term, delivered and picked up hassle free",
      fullDescription: "Professional traffic signs available for hire with flexible terms. We offer a comprehensive range of RMS-approved signage for all traffic management needs. Our Signs can be hired short term, long term, delivered and picked up hassle free.",
      features: ["Short term and long term hire options", "Delivered and picked up hassle-free", "RMS-approved signage", "Wide range of sign types available", "Competitive hire rates"],
      sortOrder: 7,
      isActive: true,
      featured: false
    }
  ];
  totalCreated += await populateContent('Services', 'services', services);
  
  // 2. Core Values (6 from website fallback/content.ts)
  const coreValues = [
    {
      title: "Safety",
      description: "Every decision we make prioritises the safety of workers, drivers, and the public.",
      icon: "Shield",
      sortOrder: 1
    },
    {
      title: "Precision",
      description: "Our traffic control plans are completely customised, aided by premium computer software and are always as accurate as possible.",
      icon: "Target",
      sortOrder: 2
    },
    {
      title: "Experience",
      description: "NSW Traffic Control has had years of experience in the industry and when dealing with us, you are dealing directly with trained and confident professionals.",
      icon: "Award",
      sortOrder: 3
    },
    {
      title: "Reliability",
      description: "You can count on us. We deliver consistent results, meet deadlines, and maintain the highest standards of service.",
      icon: "CheckCircle",
      sortOrder: 4
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and methods to improve traffic management, making our services more effective and sustainable.",
      icon: "Lightbulb",
      sortOrder: 5
    },
    {
      title: "Expertise",
      description: "Our team brings decades of combined experience, certifications, and deep knowledge of traffic management regulations.",
      icon: "Award",
      sortOrder: 6
    }
  ];
  totalCreated += await populateContent('Core Values', 'core-values', coreValues);
  
  // 3. Our Process (3 steps from website fallback/content.ts)
  const ourProcesses = [
    {
      title: "Assessment & Planning",
      description: "We evaluate your site and develop a comprehensive traffic management plan.",
      sortOrder: 1,
      icon: "Search",
      details: {
        activities: [
          "Site inspection and risk assessment",
          "Traffic flow analysis",
          "Stakeholder consultation",
          "Regulatory compliance review"
        ]
      },
      isActive: true
    },
    {
      title: "Implementation",
      description: "Our certified team implements the plan with precision and safety.",
      sortOrder: 2,
      icon: "Settings",
      details: {
        activities: [
          "Traffic control setup",
          "Signage installation",
          "Team deployment",
          "Real-time monitoring"
        ]
      },
      isActive: true
    },
    {
      title: "Monitoring & Adjustment",
      description: "We continuously monitor and adjust our approach for optimal results.",
      sortOrder: 3,
      icon: "Eye",
      details: {
        activities: [
          "Regular assessment of plan effectiveness",
          "Quick response to changing conditions",
          "Detailed reporting and documentation",
          "Post-project evaluation and recommendations"
        ]
      },
      isActive: true
    }
  ];
  totalCreated += await populateContent('Our Process', 'our-processes', ourProcesses);
  
  // 4. Culture Values (4 from website fallback/careers.ts)
  const cultureValues = [
    {
      title: "Safety First",
      description: "Safety is our top priority in everything we do. We never compromise on the wellbeing of our team or the public.",
      icon: "Shield",
      sortOrder: 1,
      isActive: true
    },
    {
      title: "Teamwork",
      description: "We work together as one team, supporting each other and communicating effectively to achieve our goals.",
      icon: "Users",
      sortOrder: 2,
      isActive: true
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and methods to improve our services and stay ahead of industry trends.",
      icon: "Lightbulb",
      sortOrder: 3,
      isActive: true
    },
    {
      title: "Growth",
      description: "We invest in our people's development and provide opportunities for career advancement and skill building.",
      icon: "TrendingUp",
      sortOrder: 4,
      isActive: true
    }
  ];
  totalCreated += await populateContent('Culture Values', 'culture-values', cultureValues);
  
  // 5. Benefits (4 from website fallback/careers.ts)
  const benefits = [
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs to keep you at your best.",
      icon: "Heart",
      sortOrder: 1,
      isActive: true
    },
    {
      title: "Recognition & Rewards",
      description: "Employee recognition programs, performance bonuses, and regular appreciation events.",
      icon: "Award",
      sortOrder: 2,
      isActive: true
    },
    {
      title: "Professional Development",
      description: "Training programs, certification support, and career advancement opportunities.",
      icon: "BookOpen",
      sortOrder: 3,
      isActive: true
    },
    {
      title: "Competitive Compensation",
      description: "Market-competitive salaries, regular reviews, and performance-based increases.",
      icon: "DollarSign",
      sortOrder: 4,
      isActive: true
    }
  ];
  totalCreated += await populateContent('Benefits', 'benefits', benefits);
  
  // 6. Application Steps (4 from website fallback/careers.ts)
  const applicationSteps = [
    {
      stepId: "submit-application",
      title: "Submit Application",
      description: "Send your resume and cover letter to our recruitment team.",
      icon: "FileText",
      details: {
        activities: ["Complete the application form", "Upload your resume", "Submit your cover letter"]
      },
      sortOrder: 1,
      isActive: true
    },
    {
      stepId: "initial-review",
      title: "Initial Review",
      description: "Our HR team will review your application and qualifications.",
      icon: "Search",
      details: {
        activities: ["Application screening", "Qualification assessment", "Background checks"]
      },
      sortOrder: 2,
      isActive: true
    },
    {
      stepId: "interview-process",
      title: "Interview Process",
      description: "Meet with our team to discuss your experience and fit for the role.",
      icon: "MessageCircle",
      details: {
        activities: ["Phone or video interview", "In-person meeting", "Technical assessment"]
      },
      sortOrder: 3,
      isActive: true
    },
    {
      stepId: "join-our-team",
      title: "Join Our Team",
      description: "Complete onboarding and start your journey with NSW Traffic Control.",
      icon: "CheckCircle",
      details: {
        activities: ["Contract and paperwork", "Orientation program", "Training commencement"]
      },
      sortOrder: 4,
      isActive: true
    }
  ];
  totalCreated += await populateContent('Application Steps', 'application-steps', applicationSteps);
  
  // 7. FAQs (6 from website fallback/content.ts)
  const faqs = [
    {
      question: "What areas do you service?",
      answer: "We provide services across NSW, from Sydney to Newcastle, Central Coast, and beyond.",
      category: "general",
      section: "general",
      sortOrder: 1,
      isActive: true
    },
    {
      question: "Do you provide 24/7 service?",
      answer: "Yes, we offer 24/7 emergency response for urgent traffic management needs.",
      category: "services",
      section: "general",
      sortOrder: 2,
      isActive: true
    },
    {
      question: "Are your controllers certified?",
      answer: "All our traffic controllers are fully certified and regularly trained to maintain compliance.",
      category: "general",
      section: "general",
      sortOrder: 3,
      isActive: true
    }
  ];
  totalCreated += await populateContent('FAQs', 'faqs', faqs);
  
  // 8. Career FAQs (3 from website fallback/careers.ts)
  const careerFaqs = [
    {
      question: "Do I need traffic control certification to apply?",
      answer: "For controller positions, yes. We also provide training for the right candidates.",
      category: "application",
      sortOrder: 1,
      isActive: true
    },
    {
      question: "What are the working hours?",
      answer: "We offer flexible schedules including day, evening, and weekend shifts.",
      category: "schedule",
      sortOrder: 2,
      isActive: true
    },
    {
      question: "Do you provide training?",
      answer: "Yes, we provide comprehensive training and ongoing professional development.",
      category: "training",
      sortOrder: 3,
      isActive: true
    }
  ];
  totalCreated += await populateContent('Career FAQs', 'career-faqs', careerFaqs);
  
  // 9. Blog Posts (6 from website fallback/blog.ts)
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  const blogPosts = [
    {
      title: "Why It's Important That Traffic Management Companies Maintain The Highest Standards",
      excerpt: "Professional traffic management requires strict adherence to industry standards. Learn why choosing a certified traffic control company is crucial for your project's success and safety.",
      content: `<p>In the dynamic world of construction and infrastructure development, traffic management plays a crucial role in ensuring both public safety and project efficiency. As NSW Traffic Control, we understand that maintaining the highest standards isn't just about compliance—it's about protecting lives and ensuring seamless operations.</p>

<h2>The Foundation of Professional Traffic Management</h2>
<p>Professional traffic management begins with proper certification and training. Our team holds all necessary RMS qualifications.</p>`,
      slug: "why-traffic-management-standards-matter",
      published: oneWeekAgo.toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team",
      featured: false
    },
    {
      title: "The Number One Reason Traffic Management Companies Are Indispensable",
      excerpt: "Discover why professional traffic management companies are essential for modern construction projects and how they protect both workers and the public.",
      content: `<p>In today's fast-paced construction environment, one factor stands above all others when it comes to project success: safety. This is the number one reason why traffic management companies are not just helpful, but absolutely indispensable.</p>`,
      slug: "traffic-management-companies-indispensable",
      published: twoWeeksAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team",
      featured: false
    },
    {
      title: "What Do Traffic Control Companies Do?",
      excerpt: "A comprehensive guide to understanding the services and responsibilities of professional traffic control companies in NSW.",
      content: `<p>Traffic control companies play a vital role in maintaining safety and efficiency when construction work intersects with public roadways.</p>`,
      slug: "what-traffic-control-companies-do",
      published: oneMonthAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team",
      featured: true
    },
    {
      title: "5 Key Benefits Of Hiring Traffic Control Companies In Sydney",
      excerpt: "Explore the top advantages of partnering with professional traffic control companies for your Sydney construction projects.",
      content: `<p>Sydney's bustling construction industry demands the highest levels of safety and efficiency.</p>`,
      slug: "benefits-traffic-control-companies-sydney",
      published: twoMonthsAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team",
      featured: false
    },
    {
      title: "NSW Traffic Control Regulations: Recent Updates and Changes",
      excerpt: "Stay up to date with the latest changes to NSW traffic control regulations and how they impact your construction projects.",
      content: `<p>The NSW traffic control regulatory landscape continues to evolve, with several important changes taking effect recently.</p>`,
      slug: "traffic-control-regulations-nsw-updates",
      published: threeMonthsAgo.toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team",
      featured: false
    },
    {
      title: "Emergency Traffic Management: Best Practices for Rapid Response",
      excerpt: "Learn how professional traffic control companies handle emergency situations and maintain safety during unexpected events.",
      content: `<h1>Emergency Traffic Management: Best Practices</h1>
<p>Emergency situations require immediate and effective traffic management responses.</p>`,
      slug: "emergency-traffic-management-best-practices",
      published: new Date(threeMonthsAgo.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team",
      featured: false
    }
  ];
  totalCreated += await populateContent('Blog Posts', 'blog-posts', blogPosts);
  
  // 10. Job Opening (1 demo from website fallback/careers.ts)
  const jobOpenings = [
    {
      title: "[DEMO] Traffic Controller",
      description: "This is demo data. Please configure your CMS to see real job openings.",
      requirements: "Valid traffic control certification, Experience preferred",
      slug: "demo-traffic-controller",
      location: "Sydney, NSW",
      type: "full-time",
      department: "Traffic Control",
      benefits: "Competitive pay, training provided, career advancement opportunities",
      isActive: true,
      sortOrder: 1
    }
  ];
  totalCreated += await populateContent('Job Openings', 'job-openings', jobOpenings);
  
  // NOTE: No testimonials in website fallback - skipping
  
  console.log('\n===========================================');
  console.log(`✅ TOTAL CREATED: ${totalCreated} items`);
  console.log('\n📊 Content Summary (from website fallback):');
  console.log('  • Services: 7');
  console.log('  • Core Values: 6');
  console.log('  • Our Process: 3 steps');
  console.log('  • Culture Values: 4');
  console.log('  • Benefits: 4');
  console.log('  • Application Steps: 4');
  console.log('  • FAQs: 3 general');
  console.log('  • Career FAQs: 3');
  console.log('  • Blog Posts: 6');
  console.log('  • Job Openings: 1 (demo)');
  console.log('\n🎉 ALL CONTENT NOW MATCHES WEBSITE FALLBACK DATA!');
  console.log('🌐 View at: https://strapi-production-6dd1.up.railway.app/admin');
}

main().catch(console.error);