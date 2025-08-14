/**
 * Initialize Single Type entries in Strapi
 * Single Types must have at least one entry to be accessible via API
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

async function initializeSingleType(endpoint, data) {
  try {
    // First, try to get the existing entry
    const getResponse = await fetch(`${STRAPI_URL}/api/${endpoint}`, { 
      headers,
      method: 'GET'
    });
    
    const responseData = await getResponse.json();
    
    if (getResponse.ok && responseData.data) {
      console.log(`✅ ${endpoint} already exists`);
      return;
    }
  } catch (error) {
    console.error(`❌ Error checking ${endpoint}:`, error.message);
  }

  // If doesn't exist or error, try to create
  console.log(`📝 Creating ${endpoint}...`);
  
  try {
    // Try to create/update the entry using PUT
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${endpoint} created successfully`);
      return result;
    } else {
      console.error(`❌ Failed to create ${endpoint}:`, result);
    }
  } catch (createError) {
    console.error(`❌ Failed to create ${endpoint}:`, createError.message);
  }
}

async function initializeAllSingleTypes() {
  console.log('🚀 Initializing Single Types...\n');

  // Company Info
  await initializeSingleType('company-info', {
    companyName: 'NSW Traffic Control',
    abn: '71 655 407 379',
    establishedYear: 2020,
    description: 'Professional traffic management services across NSW Central Coast and surrounding regions.',
    mission: 'To provide safe, efficient, and reliable traffic control solutions that protect workers and the public while keeping NSW moving.',
    vision: 'To be the most trusted and innovative traffic management company in NSW, setting the standard for safety and service excellence.',
    coreServices: 'Traffic Control, Traffic Management Plans, Event Traffic Management, Construction Site Management'
  });

  // Contact Info
  await initializeSingleType('contact-info', {
    phone: '1300 972 872',
    email: 'admin@nswtrafficcontrol.com.au',
    address: {
      street: '7/10 Pioneer Avenue',
      suburb: 'Tuggerah',
      state: 'NSW',
      postcode: '2259',
      country: 'Australia'
    },
    businessHours: {
      weekdays: '24/7 Emergency Service',
      saturday: '24/7 Emergency Service',
      sunday: '24/7 Emergency Service'
    },
    emergencyPhone: '1300 972 872',
    socialMedia: {
      facebook: 'https://www.facebook.com/NSWTrafficControl',
      instagram: 'https://www.instagram.com/nswtrafficcontrol',
      linkedin: 'https://www.linkedin.com/company/nsw-traffic-control'
    }
  });

  // Homepage Settings
  await initializeSingleType('homepage-setting', {
    heroSection: {
      title: 'Professional Traffic Management Solutions',
      subtitle: 'Keeping NSW Moving Safely',
      description: 'Expert traffic control services for construction, events, and emergencies across the Central Coast and beyond.'
    },
    servicesSection: {
      title: 'Our Services',
      subtitle: 'Comprehensive Traffic Management Solutions',
      description: 'From planning to implementation, we provide complete traffic control services.'
    },
    aboutSection: {
      title: 'Why Choose NSW Traffic Control',
      subtitle: 'Your Trusted Traffic Management Partner',
      description: 'With years of experience and a commitment to safety, we deliver reliable traffic solutions.'
    },
    testimonialsSection: {
      title: 'What Our Clients Say',
      subtitle: 'Trusted by Leading Construction Companies',
      description: 'See why NSW\'s top contractors choose us for their traffic management needs.'
    }
  });

  // About Page Settings
  await initializeSingleType('about-page-setting', {
    whoWeAre: {
      title: 'About NSW Traffic Control',
      subtitle: 'Leading Traffic Management in NSW',
      description: 'Learn about our journey, values, and commitment to road safety.'
    },
    coreValuesSection: {
      title: 'Our Core Values',
      subtitle: 'What Drives Us',
      description: 'Safety, reliability, and professionalism guide everything we do.'
    },
    ourStory: {
      title: 'Our Story',
      content: 'Founded in 2020, NSW Traffic Control has grown to become a trusted name in traffic management across the Central Coast and surrounding regions.',
      milestones: []
    },
    teamSection: {
      title: 'Meet Our Team',
      subtitle: 'Experienced Traffic Management Professionals',
      description: 'Our certified traffic controllers bring expertise and dedication to every project.'
    }
  });

  // Services Page Settings
  await initializeSingleType('services-page-setting', {
    servicesSection: {
      title: 'Our Services',
      subtitle: 'Complete Traffic Management Solutions',
      description: 'Professional traffic control services tailored to your project needs.'
    },
    howWeWorkSection: {
      title: 'How We Work',
      subtitle: 'Our Process',
      description: 'From initial consultation to project completion, we ensure smooth traffic flow and safety.'
    }
  });

  // Careers Page Settings
  await initializeSingleType('careers-page-setting', {
    heroSection: {
      title: 'Join Our Team',
      subtitle: 'Build Your Career in Traffic Management',
      description: 'Opportunities for growth in a dynamic, safety-focused environment.'
    },
    openingsSection: {
      title: 'Current Openings',
      subtitle: 'Available Positions',
      description: 'Explore career opportunities with NSW Traffic Control.'
    },
    cultureSection: {
      title: 'Our Culture',
      subtitle: 'A Great Place to Work',
      description: 'We foster a supportive, inclusive workplace focused on safety and professional development.'
    },
    benefitsSection: {
      title: 'Benefits & Perks',
      subtitle: 'What We Offer',
      description: 'Competitive packages and opportunities for career advancement.'
    },
    applicationProcessSection: {
      title: 'How to Apply',
      subtitle: 'Join Us in 4 Simple Steps',
      description: 'Our straightforward application process makes it easy to start your career with us.'
    },
    faqSection: {
      title: 'Frequently Asked Questions',
      subtitle: 'Career FAQs',
      description: 'Find answers to common questions about working at NSW Traffic Control.'
    }
  });

  // Contact Page Settings
  await initializeSingleType('contact-page-setting', {
    heroSection: {
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      description: 'Available 24/7 for emergency traffic management services.'
    },
    contactInfoSection: {
      title: 'Contact Information',
      subtitle: 'Reach Out to Us',
      description: 'Multiple ways to connect with our team.'
    },
    serviceAreaSection: {
      title: 'Service Areas',
      subtitle: 'Where We Operate',
      description: 'Serving the Central Coast and surrounding NSW regions.'
    }
  });

  // Website Settings (Global)
  await initializeSingleType('website-settings', {
    maintenanceMode: false,
    seoDefaults: {
      metaTitle: 'NSW Traffic Control - Professional Traffic Management Services',
      metaDescription: 'Expert traffic control and management services across NSW Central Coast. 24/7 emergency response, construction site management, and event traffic solutions.',
      keywords: 'traffic control, traffic management, NSW, Central Coast, construction traffic, event traffic',
      ogImage: null
    },
    announcement: {
      enabled: false,
      text: '',
      link: '',
      backgroundColor: '#f59e0b',
      textColor: '#ffffff'
    }
  });

  console.log('\n✅ Single Types initialization complete!');
}

// Run the initialization
initializeAllSingleTypes().catch(console.error);