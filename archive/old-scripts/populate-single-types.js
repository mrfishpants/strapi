#!/usr/bin/env node

/**
 * Populate Single Types in Railway Strapi
 * Single Types use PUT requests to create/update
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

async function updateSingleType(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ ${endpoint} created/updated successfully`);
      return result;
    } else {
      console.error(`❌ Failed to update ${endpoint}:`, result.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error updating ${endpoint}:`, error.message);
    return null;
  }
}

async function populateSingleTypes() {
  console.log('🚀 Populating Single Types...\n');

  // Company Info
  await updateSingleType('company-info', {
    companyName: 'NSW Traffic Control',
    phone: '1300 972 872',
    email: 'admin@nswtrafficcontrol.com.au',
    businessHours: '24/7 Emergency Service',
    street: '7/10 Pioneer Avenue',
    suburb: 'Tuggerah',
    state: 'NSW',
    postcode: '2259',
    country: 'Australia',
    description: 'Professional traffic management services across NSW Central Coast and surrounding regions. We provide comprehensive traffic control solutions for construction, events, and emergencies.',
    tagline: 'Keeping NSW Moving Safely',
    abn: '71 655 407 379',
    emergencyPhone: '1300 972 872',
    facebook: 'https://www.facebook.com/NSWTrafficControl',
    linkedin: 'https://www.linkedin.com/company/nsw-traffic-control',
    instagram: 'https://www.instagram.com/nswtrafficcontrol'
  });

  // Contact Info
  await updateSingleType('contact-info', {
    phoneNumber: '1300 972 872',
    phoneNumberFormatted: '1300 972 872',
    email: 'admin@nswtrafficcontrol.com.au',
    street: '7/10 Pioneer Avenue',
    suburb: 'Tuggerah', 
    state: 'NSW',
    postcode: '2259',
    country: 'Australia',
    abn: '71 655 407 379',
    emergencyPhone: '1300 972 872',
    officeHours: 'Monday-Friday: 7:00 AM - 5:00 PM\nSaturday-Sunday: 24/7 Emergency Service',
    facebook: 'https://www.facebook.com/NSWTrafficControl',
    linkedin: 'https://www.linkedin.com/company/nsw-traffic-control',
    instagram: 'https://www.instagram.com/nswtrafficcontrol'
  });

  // Homepage Setting
  await updateSingleType('homepage-setting', {
    heroTitle: 'Professional Traffic Management Solutions',
    heroSubtitle: 'Keeping NSW Moving Safely',
    heroDescription: 'Expert traffic control services for construction, events, and emergencies across the Central Coast and beyond.',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive Traffic Management Solutions',
    aboutTitle: 'Why Choose NSW Traffic Control',
    aboutSubtitle: 'Your Trusted Traffic Management Partner',
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Trusted by Leading Construction Companies'
  });

  // About Page Setting
  await updateSingleType('about-page-setting', {
    pageTitle: 'About NSW Traffic Control',
    pageSubtitle: 'Leading Traffic Management in NSW',
    whoWeAreTitle: 'Who We Are',
    whoWeAreContent: 'NSW Traffic Control has been providing professional traffic management services since 2020, growing to become a trusted name across the Central Coast and surrounding regions.',
    missionTitle: 'Our Mission',
    missionContent: 'To provide safe, efficient, and reliable traffic control solutions that protect workers and the public while keeping NSW moving.',
    visionTitle: 'Our Vision',
    visionContent: 'To be the most trusted and innovative traffic management company in NSW, setting the standard for safety and service excellence.',
    valuesTitle: 'Our Core Values',
    valuesSubtitle: 'What Drives Us',
    teamTitle: 'Meet Our Team',
    teamSubtitle: 'Experienced Traffic Management Professionals'
  });

  // Services Page Setting
  await updateSingleType('services-page-setting', {
    pageTitle: 'Our Services',
    pageSubtitle: 'Complete Traffic Management Solutions',
    servicesTitle: 'Professional Traffic Control Services',
    servicesDescription: 'From planning to implementation, we provide comprehensive traffic management solutions tailored to your project needs.',
    processTitle: 'How We Work',
    processSubtitle: 'Our Process',
    processDescription: 'From initial consultation to project completion, we ensure smooth traffic flow and safety at every step.'
  });

  // Careers Page Setting
  await updateSingleType('careers-page-setting', {
    pageTitle: 'Join Our Team',
    pageSubtitle: 'Build Your Career in Traffic Management',
    heroTitle: 'Join Our Team',
    heroSubtitle: 'Build Your Career in Traffic Management',
    heroDescription: 'Opportunities for growth in a dynamic, safety-focused environment.',
    openingsTitle: 'Current Openings',
    openingsSubtitle: 'Available Positions',
    cultureTitle: 'Our Culture',
    cultureSubtitle: 'A Great Place to Work',
    cultureDescription: 'We foster a supportive, inclusive workplace focused on safety and professional development.',
    benefitsTitle: 'Benefits & Perks',
    benefitsSubtitle: 'What We Offer',
    applicationTitle: 'How to Apply',
    applicationSubtitle: 'Join Us in 4 Simple Steps'
  });

  // Contact Page Setting
  await updateSingleType('contact-page-setting', {
    pageTitle: 'Contact Us',
    pageSubtitle: 'Get in Touch',
    heroTitle: 'Contact Us',
    heroSubtitle: 'Get in Touch',
    heroDescription: 'Available 24/7 for emergency traffic management services.',
    contactTitle: 'Contact Information',
    contactSubtitle: 'Reach Out to Us',
    hoursTitle: 'Business Hours',
    hoursSubtitle: 'When We\'re Available',
    locationTitle: 'Our Location',
    locationSubtitle: 'Visit Our Office'
  });

  // Website Settings
  await updateSingleType('website-settings', {
    siteName: 'NSW Traffic Control',
    siteUrl: 'https://nswtrafficcontrol.com.au',
    siteDescription: 'Professional traffic management services across NSW Central Coast. 24/7 emergency response, construction site management, and event traffic solutions.',
    defaultMetaTitle: 'NSW Traffic Control - Professional Traffic Management Services',
    defaultMetaDescription: 'Expert traffic control and management services across NSW Central Coast. 24/7 emergency response, construction site management, and event traffic solutions.',
    defaultKeywords: 'traffic control, traffic management, NSW, Central Coast, construction traffic, event traffic',
    maintenanceMode: false,
    googleAnalyticsId: '',
    facebookPixelId: ''
  });

  console.log('\n✅ Single Types population complete!');
  
  // Check status
  console.log('\n📊 Checking Single Type endpoints...');
  const endpoints = [
    'company-info',
    'contact-info',
    'homepage-setting',
    'about-page-setting',
    'services-page-setting',
    'careers-page-setting',
    'contact-page-setting',
    'website-settings'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
      if (response.ok) {
        console.log(`  ✅ ${endpoint}: Available`);
      } else {
        console.log(`  ❌ ${endpoint}: ${response.status}`);
      }
    } catch (error) {
      console.log(`  ❌ ${endpoint}: Error`);
    }
  }
}

// Run the population
populateSingleTypes().catch(console.error);