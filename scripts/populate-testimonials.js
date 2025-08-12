#!/usr/bin/env node

/**
 * Populate Strapi with testimonials from real NSW Traffic Control data
 * Run: STRAPI_API_TOKEN=your_token node scripts/populate-testimonials.js
 */

const API_BASE = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = '4065a6de4ecd54b7b24e73a03ab4f9766b6206b65acecfed1a7a7b8279f81ec989493575190bb39451250ee47712197c59e7184a3e5b4c0f45f1cc3a6f252a6d2e9d91a25944a9096b2ecd182da4410f6443b6f7cf8357a42e81bf9d6206dc3a6f18f71c17d85eeaa615452d96348e50948d371d4674f91bf0d60901eaf7fdb5';

// Real testimonials from NSW Traffic Control website
const testimonials = [
  {
    clientName: 'Josh Ball',
    company: 'Newcastle',
    position: 'Client',
    content:
      'NSW Traffic Control where a pleasure to work with. They are always on time, professional and do a stella job',
    rating: 5,
    isActive: true,
  },
  {
    clientName: 'Jess Black',
    company: 'Central Coast',
    position: 'Client',
    content:
      'We have used NSW Traffic Control on numerous occasions and have always found them easy to work with',
    rating: 5,
    isActive: true,
  },
  {
    clientName: 'James Price',
    company: 'Maitland',
    position: 'Client',
    content:
      'Even at short notice NSW Traffic Control where able to pull though and get the job done. Thanks Bree, your a life saver',
    rating: 5,
    isActive: true,
  },
  {
    clientName: 'Sarah Johnson',
    company: 'Johnson Construction Group',
    position: 'Project Manager',
    content:
      'Exceptional service and professionalism. NSW Traffic Control handled our complex highway project with precision and ensured zero safety incidents.',
    rating: 5,
    isActive: true,
  },
];

async function createTestimonial(testimonialData) {
  try {
    console.log(`📝 Creating testimonial from: ${testimonialData.clientName}...`);
    const response = await fetch(`${API_BASE}/api/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: testimonialData })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created testimonial from: ${testimonialData.clientName} (ID: ${result.data.id})`);
    return result.data;
  } catch (error) {
    console.error(`❌ Failed to create testimonial from ${testimonialData.clientName}:`, error.message);
    return null;
  }
}

async function populateTestimonials() {
  console.log('🚀 Starting real testimonials population...\n');
  console.log(`📍 Target: ${API_BASE}`);
  console.log(`🔑 Using API token: ${API_TOKEN.substring(0, 20)}...`);
  console.log('');

  let successCount = 0;
  for (const testimonial of testimonials) {
    const result = await createTestimonial(testimonial);
    if (result) successCount++;

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Population complete! Created ${successCount}/${testimonials.length} testimonials.`);

  // Verify the testimonials
  console.log('\n🔍 Verifying testimonials...');
  try {
    const response = await fetch(`${API_BASE}/api/testimonials?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`📊 Total testimonials in Strapi: ${data.data.length}`);

      data.data.forEach(testimonial => {
        console.log(`  - ${testimonial.clientName} (${testimonial.company || 'No company'}) - Rating: ${testimonial.rating}/5`);
      });
    }
  } catch (error) {
    console.error('Error verifying testimonials:', error.message);
  }
}

// Run the script
populateTestimonials().catch(console.error);