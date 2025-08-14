#!/usr/bin/env node

/**
 * Populate Strapi with company info from real NSW Traffic Control data
 * Run: STRAPI_API_TOKEN=your_token node scripts/populate-company-info.js
 */

const API_BASE = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = '4065a6de4ecd54b7b24e73a03ab4f9766b6206b65acecfed1a7a7b8279f81ec989493575190bb39451250ee47712197c59e7184a3e5b4c0f45f1cc3a6f252a6d2e9d91a25944a9096b2ecd182da4410f6443b6f7cf8357a42e81bf9d6206dc3a6f18f71c17d85eeaa615452d96348e50948d371d4674f91bf0d60901eaf7fdb5';

// Real company info from NSW Traffic Control website
const companyInfo = {
  companyName: 'NSW Traffic Control',
  phone: '0407 410 223',
  email: 'admin@nswtrafficcontrol.com.au',
  businessHours: 'Mon-Fri: 7:00 AM - 6:00 PM, Sat: 8:00 AM - 4:00 PM, Sun: Emergency Only',
  address: {
    street: 'Central Coast',
    suburb: 'Central Coast',
    state: 'NSW',
    postcode: '2250',
    country: 'Australia',
  },
  socialMedia: {
    facebook: 'https://facebook.com/nswtrafficcontrol',
    linkedin: 'https://linkedin.com/company/nsw-traffic-control',
    instagram: 'https://instagram.com/nswtrafficcontrol',
  },
  description:
    'We are the experts in traffic control management for New South Wales, offering nationally recognised services with nearly two decades of experience.',
  tagline: 'A Traffic Control Company You Can Rely On',
  emergencyPhone: '0407 410 223',
};

async function populateCompanyInfo() {
  console.log('🚀 Starting real company info population...\n');
  console.log(`📍 Target: ${API_BASE}`);
  console.log(`🔑 Using API token: ${API_TOKEN.substring(0, 20)}...`);
  console.log('');

  try {
    console.log('📝 Updating company info...');

    // For single types, we need to check if it exists first
    let response;
    try {
      response = await fetch(`${API_BASE}/api/company-info?populate=*`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      
      // If it exists, update it
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          response = await fetch(`${API_BASE}/api/company-info`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({ data: companyInfo })
          });
          console.log('✅ Updated company info');
        }
      }
    } catch (error) {
      // If it doesn't exist (404), create it
      if (error.response?.status === 404) {
        response = await fetch(`${API_BASE}/api/company-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({ data: companyInfo })
        });
        console.log('✅ Created company info');
      } else {
        throw error;
      }
    }

    // Verify the company info
    console.log('\n🔍 Verifying company info...');
    const verifyResponse = await fetch(`${API_BASE}/api/company-info?populate=*`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (verifyResponse.ok) {
      const data = await verifyResponse.json();
      if (data.data) {
        const info = data.data;
        console.log(`✅ Company: ${info.companyName}`);
        console.log(`✅ Phone: ${info.phone}`);
        console.log(`✅ Email: ${info.email}`);
        console.log(`✅ Tagline: ${info.tagline}`);
        console.log(`✅ Address: ${info.address?.street}, ${info.address?.suburb} ${info.address?.state} ${info.address?.postcode}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to update company info:', error.message);
  }
}

// Run the script
populateCompanyInfo().catch(console.error);