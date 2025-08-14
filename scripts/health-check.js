#!/usr/bin/env node

/**
 * Health Check for Strapi API Endpoints
 * Verifies all collection type endpoints are responding correctly
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// All collection types to check
const ENDPOINTS = [
  // Collection types with content
  { endpoint: 'services', expectedMin: 10, description: 'Traffic control services' },
  { endpoint: 'testimonials', expectedMin: 5, description: 'Client testimonials' },
  { endpoint: 'team-members', expectedMin: 5, description: 'Team member profiles' },
  { endpoint: 'faqs', expectedMin: 5, description: 'Frequently asked questions' },
  { endpoint: 'core-values', expectedMin: 3, description: 'Company core values' },
  { endpoint: 'our-processes', expectedMin: 3, description: 'Service process steps' },
  { endpoint: 'blog-posts', expectedMin: 2, description: 'Blog articles' },
  { endpoint: 'job-openings', expectedMin: 2, description: 'Career opportunities' },
  
  // Collection types ready for content
  { endpoint: 'culture-values', expectedMin: 0, description: 'Company culture values' },
  { endpoint: 'case-studies', expectedMin: 0, description: 'Project case studies' },
  { endpoint: 'resources', expectedMin: 0, description: 'Downloadable resources' },
  { endpoint: 'benefits', expectedMin: 0, description: 'Employee benefits' },
  { endpoint: 'application-steps', expectedMin: 0, description: 'Job application process' },
  { endpoint: 'career-faqs', expectedMin: 0, description: 'Career-specific FAQs' }
];

async function checkEndpoint({ endpoint, expectedMin, description }) {
  try {
    const startTime = Date.now();
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        endpoint,
        status: '❌ FAILED',
        error: `HTTP ${response.status}`,
        responseTime,
        description
      };
    }
    
    const data = await response.json();
    const count = data.data?.length || 0;
    
    const hasExpectedContent = count >= expectedMin;
    const status = hasExpectedContent ? '✅ HEALTHY' : '⚠️  LOW CONTENT';
    
    return {
      endpoint,
      status,
      count,
      expectedMin,
      responseTime,
      description,
      healthy: response.ok && hasExpectedContent
    };
    
  } catch (error) {
    return {
      endpoint,
      status: '❌ ERROR',
      error: error.message,
      description
    };
  }
}

async function runHealthCheck() {
  console.log('🏥 NSW Traffic Control Strapi Health Check');
  console.log(`🌐 Checking: ${STRAPI_URL}`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}\n`);
  
  const results = [];
  let healthyCount = 0;
  let totalEntries = 0;
  
  // Check all endpoints
  for (const config of ENDPOINTS) {
    const result = await checkEndpoint(config);
    results.push(result);
    
    if (result.healthy) healthyCount++;
    if (result.count) totalEntries += result.count;
    
    // Log result
    const responseTime = result.responseTime ? ` (${result.responseTime}ms)` : '';
    const countInfo = result.count !== undefined ? ` - ${result.count} entries` : '';
    const expectedInfo = result.expectedMin > 0 ? ` (expected ≥${result.expectedMin})` : '';
    
    console.log(`${result.status} /api/${result.endpoint}${responseTime}${countInfo}${expectedInfo}`);
    console.log(`   📝 ${result.description}`);
    
    if (result.error) {
      console.log(`   ⚠️  Error: ${result.error}`);
    }
    console.log();
  }
  
  // Summary
  const overallHealth = healthyCount === results.length ? '🟢 HEALTHY' : 
                       healthyCount > results.length / 2 ? '🟡 PARTIAL' : '🔴 UNHEALTHY';
  
  console.log('📊 HEALTH CHECK SUMMARY');
  console.log(`Overall Status: ${overallHealth}`);
  console.log(`Healthy Endpoints: ${healthyCount}/${results.length}`);
  console.log(`Total Content Entries: ${totalEntries}`);
  console.log(`Check Completed: ${new Date().toLocaleString()}`);
  
  // Exit code for CI/CD
  const exitCode = healthyCount === results.length ? 0 : 1;
  process.exit(exitCode);
}

// Run health check
runHealthCheck().catch(error => {
  console.error('❌ Health check failed:', error);
  process.exit(1);
});