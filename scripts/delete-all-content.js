#!/usr/bin/env node

/**
 * Delete ALL content from Railway Strapi
 * Gets actual IDs and deletes everything
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

async function deleteAllFromEndpoint(endpoint) {
  console.log(`\n🗑️  Deleting all ${endpoint}...`);
  
  try {
    // Get all items
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[limit]=100`);
    if (!response.ok) {
      console.log(`  ⚠️  Could not fetch ${endpoint}: ${response.status}`);
      return 0;
    }
    
    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      console.log(`  ℹ️  No ${endpoint} found`);
      return 0;
    }
    
    console.log(`  Found ${data.data.length} items to delete`);
    
    let deleted = 0;
    let failed = 0;
    
    // Delete each item
    for (const item of data.data) {
      const deleteResponse = await fetch(`${STRAPI_URL}/api/${endpoint}/${item.id}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        deleted++;
        process.stdout.write('.');
      } else {
        failed++;
        process.stdout.write('x');
      }
    }
    
    console.log('');
    console.log(`  ✅ Deleted ${deleted} items`);
    if (failed > 0) {
      console.log(`  ❌ Failed to delete ${failed} items`);
    }
    
    return deleted;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🧹 DELETING ALL CONTENT FROM RAILWAY STRAPI');
  console.log('=========================================');
  
  const endpoints = [
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
  
  let totalDeleted = 0;
  
  for (const endpoint of endpoints) {
    const deleted = await deleteAllFromEndpoint(endpoint);
    totalDeleted += deleted;
  }
  
  console.log('\n=========================================');
  console.log(`✅ TOTAL DELETED: ${totalDeleted} items`);
  console.log('\nNow run the populate script to add real content!');
}

main().catch(console.error);