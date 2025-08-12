#!/usr/bin/env node

/**
 * Populate only the missing content (blog posts, FAQs) 
 * Services and core values are already populated correctly
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
    throw new Error(`${response.status}: ${error}`);
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
      console.log(`\nError creating ${name}: ${error.message}`);
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
  console.log('🚀 POPULATING MISSING CONTENT (Blog Posts & FAQs)');
  console.log('==================================================');
  
  let totalCreated = 0;
  
  // Blog Posts (6 from website fallback/blog.ts) - FIXED field name to 'published'
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
<p>Professional traffic management begins with proper certification and training. Our team holds all necessary RMS qualifications, including:</p>
<ul>
  <li>General WHS Induction (White Card)</li>
  <li>Implement Traffic Control Plans (Yellow Card)</li>
  <li>Traffic Controller (Blue Card)</li>
  <li>Prepare a Work Zone Traffic Management Plan (Red Card)</li>
</ul>

<h2>Why Standards Matter</h2>
<p>Adhering to the highest standards ensures:</p>
<ul>
  <li>Public safety is never compromised</li>
  <li>Legal compliance with all state and local regulations</li>
  <li>Efficient traffic flow during construction activities</li>
  <li>Reduced liability for construction companies</li>
</ul>

<p>At NSW Traffic Control, we believe that cutting corners on safety standards is never worth the risk. Our commitment to excellence has made us a trusted partner for major construction projects across NSW.</p>`,
      slug: "why-traffic-management-standards-matter",
      published: oneWeekAgo.toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team"
    },
    {
      title: "The Number One Reason Traffic Management Companies Are Indispensable",
      excerpt: "Discover why professional traffic management companies are essential for modern construction projects and how they protect both workers and the public.",
      content: `<p>In today's fast-paced construction environment, one factor stands above all others when it comes to project success: safety. This is the number one reason why traffic management companies are not just helpful, but absolutely indispensable.</p>

<h2>Safety: The Non-Negotiable Priority</h2>
<p>Construction sites are inherently dangerous environments, and when they intersect with public roadways, the risk multiplies exponentially. Professional traffic management companies provide the crucial buffer between active construction and public traffic flow.</p>

<h2>Beyond Basic Safety</h2>
<p>While safety is paramount, professional traffic management companies offer additional benefits:</p>
<ul>
  <li>Legal compliance and permit management</li>
  <li>Efficient traffic flow optimization</li>
  <li>24/7 availability for emergency situations</li>
  <li>Specialized equipment and signage</li>
  <li>Expert planning and risk assessment</li>
</ul>

<h2>The NSW Traffic Control Difference</h2>
<p>With nearly two decades of experience, NSW Traffic Control has established itself as a leader in the industry. Our team's expertise ensures that every project meets the highest safety standards while maintaining operational efficiency.</p>

<p>When you choose professional traffic management, you're not just hiring a service—you're investing in the safety and success of your project.</p>`,
      slug: "traffic-management-companies-indispensable",
      published: twoWeeksAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team"
    },
    {
      title: "What Do Traffic Control Companies Do?",
      excerpt: "A comprehensive guide to understanding the services and responsibilities of professional traffic control companies in NSW.",
      content: `<p>Traffic control companies play a vital role in maintaining safety and efficiency when construction work intersects with public roadways. But what exactly do they do, and how do they ensure projects run smoothly?</p>

<h2>Core Services</h2>
<p>Professional traffic control companies provide a comprehensive range of services:</p>

<h3>1. Traffic Management Planning</h3>
<p>Creating detailed plans that outline how traffic will flow around construction sites, including:</p>
<ul>
  <li>Route planning and alternative pathways</li>
  <li>Timing and phasing of work activities</li>
  <li>Risk assessment and mitigation strategies</li>
</ul>

<h3>2. On-Site Traffic Control</h3>
<p>Providing trained personnel to direct traffic safely around work zones:</p>
<ul>
  <li>Certified traffic controllers with proper qualifications</li>
  <li>Stop/slow operations for single-lane closures</li>
  <li>Pedestrian management and safety</li>
</ul>

<h3>3. Equipment and Signage</h3>
<p>Supplying and maintaining all necessary equipment:</p>
<ul>
  <li>Traffic signs and warning devices</li>
  <li>Barriers and safety equipment</li>
  <li>Electronic message boards</li>
</ul>

<h2>The NSW Traffic Control Approach</h2>
<p>At NSW Traffic Control, we provide comprehensive solutions that include permit management, equipment supply, and 24/7 support. Our goal is to ensure your project proceeds safely and efficiently while minimizing disruption to the public.</p>`,
      slug: "what-traffic-control-companies-do",
      published: oneMonthAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team"
    },
    {
      title: "5 Key Benefits Of Hiring Traffic Control Companies In Sydney",
      excerpt: "Explore the top advantages of partnering with professional traffic control companies for your Sydney construction projects.",
      content: `<p>Sydney's bustling construction industry demands the highest levels of safety and efficiency. Here are five key benefits of hiring professional traffic control companies for your Sydney projects.</p>

<h2>1. Enhanced Safety Standards</h2>
<p>Professional traffic control companies bring extensive safety expertise to your project:</p>
<ul>
  <li>Certified personnel with proper training</li>
  <li>Compliance with all safety regulations</li>
  <li>Risk assessment and mitigation strategies</li>
</ul>

<h2>2. Legal Compliance</h2>
<p>Navigating Sydney's complex regulatory environment requires expertise:</p>
<ul>
  <li>Permit acquisition and management</li>
  <li>Compliance with local council requirements</li>
  <li>Understanding of RMS regulations</li>
</ul>

<h2>3. Operational Efficiency</h2>
<p>Professional traffic management keeps your project on schedule:</p>
<ul>
  <li>Minimized traffic delays</li>
  <li>Optimized work zone layouts</li>
  <li>Quick response to changing conditions</li>
</ul>

<h2>4. Cost-Effective Solutions</h2>
<p>While there's an upfront cost, professional traffic control saves money:</p>
<ul>
  <li>Reduced risk of accidents and liability</li>
  <li>Faster project completion</li>
  <li>Avoided penalties and fines</li>
</ul>

<h2>5. 24/7 Support and Flexibility</h2>
<p>Sydney never sleeps, and neither do we:</p>
<ul>
  <li>Round-the-clock availability</li>
  <li>Emergency response capabilities</li>
  <li>Flexible scheduling to meet project needs</li>
</ul>

<p>Choose NSW Traffic Control for your Sydney projects and experience the difference that professional traffic management makes.</p>`,
      slug: "benefits-traffic-control-companies-sydney",
      published: twoMonthsAgo.toISOString(),
      category: "industry-news",
      author: "NSW Traffic Control Team"
    },
    {
      title: "NSW Traffic Control Regulations: Recent Updates and Changes",
      excerpt: "Stay up to date with the latest changes to NSW traffic control regulations and how they impact your construction projects.",
      content: `<p>The NSW traffic control regulatory landscape continues to evolve, with several important changes taking effect recently. Understanding these updates is crucial for construction companies and traffic management professionals.</p>

<h2>Key Regulatory Updates</h2>
<p>Recent updates focus on enhanced safety measures and improved efficiency:</p>

<h3>Enhanced Certification Requirements</h3>
<ul>
  <li>Updated training modules for traffic controllers</li>
  <li>New assessment criteria for Red Card qualifications</li>
  <li>Mandatory refresher training every two years</li>
</ul>

<h3>Technology Integration</h3>
<ul>
  <li>Digital traffic management plan submissions</li>
  <li>Real-time monitoring requirements for major projects</li>
  <li>Electronic reporting systems for incidents</li>
</ul>

<h2>Impact on Construction Projects</h2>
<p>These changes affect project planning and execution:</p>
<ul>
  <li>Longer lead times for permit applications</li>
  <li>Additional documentation requirements</li>
  <li>Enhanced safety protocols</li>
</ul>

<h2>NSW Traffic Control's Response</h2>
<p>We've already implemented all necessary changes to ensure compliance:</p>
<ul>
  <li>All staff have completed updated training</li>
  <li>Digital systems are in place for plan submissions</li>
  <li>Enhanced safety procedures are operational</li>
</ul>

<p>Partner with NSW Traffic Control to ensure your projects meet all current regulatory requirements while maintaining the highest safety standards.</p>`,
      slug: "traffic-control-regulations-nsw-updates",
      published: threeMonthsAgo.toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team"
    },
    {
      title: "Emergency Traffic Management: Best Practices for Rapid Response",
      excerpt: "Learn how professional traffic control companies handle emergency situations and maintain safety during unexpected events.",
      content: `<h1>Emergency Traffic Management: Best Practices</h1>

<p>Emergency situations require immediate and effective traffic management responses. Whether it's a utility emergency, accident, or unexpected infrastructure failure, professional traffic control companies must be prepared to respond quickly and safely.</p>

<h2>Emergency Response Protocols</h2>

<p>Effective emergency traffic management follows established protocols:</p>

<h3>1. Rapid Assessment</h3>
<ul>
  <li>Immediate site evaluation</li>
  <li>Safety hazard identification</li>
  <li>Traffic impact assessment</li>
</ul>

<h3>2. Quick Deployment</h3>
<ul>
  <li><strong>24/7 availability</strong> for emergency calls</li>
  <li>Pre-positioned equipment and personnel</li>
  <li>Streamlined approval processes</li>
</ul>

<h3>3. Continuous Monitoring</h3>
<ul>
  <li>Real-time traffic flow monitoring</li>
  <li>Regular safety assessments</li>
  <li>Communication with emergency services</li>
</ul>

<h2>The NSW Traffic Control Emergency Team</h2>

<p>Our emergency response capabilities include:</p>

<ul>
  <li>Dedicated emergency response vehicles</li>
  <li>Trained personnel on standby</li>
  <li>Direct communication with emergency services</li>
  <li>Comprehensive equipment inventory</li>
</ul>

<blockquote>
  <p><strong>Important</strong>: When emergencies strike, NSW Traffic Control is ready to respond with the expertise and resources needed to maintain safety and minimize disruption.</p>
</blockquote>

<p>For emergency situations, call us immediately at <strong>0407 410 223</strong>.</p>`,
      slug: "emergency-traffic-management-best-practices",
      published: new Date(threeMonthsAgo.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: "safety",
      author: "NSW Traffic Control Team"
    }
  ];
  totalCreated += await populateContent('Blog Posts', 'blog-posts', blogPosts);
  
  // FAQs (3 from website fallback/content.ts)
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
  
  // Career FAQs (3 from website fallback/careers.ts)
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
  
  console.log('\n===========================================');
  console.log(`✅ TOTAL CREATED: ${totalCreated} items`);
  console.log('\n📊 Missing Content Now Populated:');
  console.log('  • Blog Posts: 6 (with correct "published" field)');
  console.log('  • FAQs: 3 general');
  console.log('  • Career FAQs: 3');
  console.log('\n🎉 ALL MISSING CONTENT SHOULD NOW BE AVAILABLE!');
  console.log('🌐 View at: https://strapi-production-6dd1.up.railway.app/admin');
}

main().catch(console.error);