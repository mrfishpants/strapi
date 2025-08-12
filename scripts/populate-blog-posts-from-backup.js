#!/usr/bin/env node

/**
 * Populate Blog Posts from actual backup data
 * Using real content from strapi-backup-latest.json
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// Real blog posts from backup - excluding the test post
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

async function createBlogPost(post) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: post })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Created: ${post.title}`);
      return result.data;
    } else {
      console.error(`❌ Failed to create ${post.title}:`, result.error?.message || response.statusText);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${post.title}:`, error.message);
    return null;
  }
}

async function populateBlogPosts() {
  console.log('🚀 Populating Blog Posts from backup...\n');

  let successCount = 0;
  let failCount = 0;

  for (const post of blogPosts) {
    const result = await createBlogPost(post);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} blog posts`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} blog posts`);
  }
  console.log('='.repeat(50));

  // Check final status
  console.log('\n📊 Checking blog posts status...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts`);
    const data = await response.json();
    const count = data.meta?.pagination?.total || 0;
    console.log(`  Total blog posts in Strapi: ${count}`);
  } catch (error) {
    console.log(`  Error checking status:`, error.message);
  }
}

// Run the population
populateBlogPosts().catch(console.error);