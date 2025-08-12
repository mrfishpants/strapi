#!/usr/bin/env node

/**
 * Properly delete ALL content from Railway Strapi
 * Handles the actual data structure without attributes wrapper
 */

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

async function deleteAllFromEndpoint(endpoint) {
  console.log(`\n🗑️  Deleting all ${endpoint}...`);
  
  try {
    // Get ALL items (increase limit to 1000)
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[limit]=1000`);
    if (!response.ok) {
      console.log(`  ⚠️  Could not fetch ${endpoint}: ${response.status}`);
      return 0;
    }
    
    const result = await response.json();
    const items = result.data || [];
    
    if (items.length === 0) {
      console.log(`  ✅ No ${endpoint} to delete`);
      return 0;
    }
    
    console.log(`  Found ${items.length} items to delete`);
    
    let deleted = 0;
    let failed = 0;
    
    // Delete each item using its actual ID
    for (const item of items) {
      try {
        const deleteResponse = await fetch(`${STRAPI_URL}/api/${endpoint}/${item.id}`, {
          method: 'DELETE'
        });
        
        if (deleteResponse.ok || deleteResponse.status === 404) {
          deleted++;
          process.stdout.write('.');
        } else {
          failed++;
          process.stdout.write('x');
          // Try with documentId if regular ID fails
          const deleteResponse2 = await fetch(`${STRAPI_URL}/api/${endpoint}/${item.documentId}`, {
            method: 'DELETE'
          });
          if (deleteResponse2.ok) {
            deleted++;
            failed--;
            process.stdout.write('✓');
          }
        }
      } catch (error) {
        failed++;
        process.stdout.write('!');
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
  console.log('🧹 PROPERLY DELETING ALL CONTENT FROM RAILWAY STRAPI');
  console.log('===================================================');
  
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
  
  // Keep deleting until nothing left
  let passes = 0;
  let lastTotal = -1;
  
  while (passes < 5 && lastTotal !== 0) {
    passes++;
    console.log(`\n--- Pass ${passes} ---`);
    lastTotal = 0;
    
    for (const endpoint of endpoints) {
      const deleted = await deleteAllFromEndpoint(endpoint);
      lastTotal += deleted;
      totalDeleted += deleted;
    }
    
    if (lastTotal === 0) {
      console.log('\n✅ All content deleted successfully!');
      break;
    }
  }
  
  console.log('\n===================================================');
  console.log(`✅ TOTAL DELETED: ${totalDeleted} items across ${passes} passes`);
  
  // Verify everything is empty
  console.log('\n🔍 Verifying all endpoints are empty...');
  for (const endpoint of endpoints) {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    const data = await response.json();
    const count = data.data ? data.data.length : 0;
    if (count > 0) {
      console.log(`  ❌ ${endpoint}: Still has ${count} items!`);
    } else {
      console.log(`  ✅ ${endpoint}: Empty`);
    }
  }
}

main().catch(console.error);