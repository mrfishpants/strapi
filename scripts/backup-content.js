#!/usr/bin/env node

/**
 * Backup All Content from Strapi CMS
 * Creates a timestamped JSON backup of all collection type entries
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'https://strapi-production-6dd1.up.railway.app';

// Collection types to backup
const COLLECTION_TYPES = [
  'services',
  'testimonials', 
  'team-members',
  'faqs',
  'core-values',
  'our-processes',
  'blog-posts',
  'job-openings',
  'culture-values',
  'case-studies',
  'resources',
  'benefits',
  'application-steps',
  'career-faqs'
];

async function fetchCollectionData(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    
    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch ${endpoint}: ${response.status}`);
      return { data: [], error: `HTTP ${response.status}` };
    }
    
    const result = await response.json();
    console.log(`✅ Backed up ${endpoint}: ${result.data?.length || 0} entries`);
    return result;
    
  } catch (error) {
    console.warn(`⚠️  Error fetching ${endpoint}:`, error.message);
    return { data: [], error: error.message };
  }
}

async function backupAllContent() {
  console.log('🔄 Starting content backup...\n');
  
  const backup = {
    timestamp: new Date().toISOString(),
    source: STRAPI_URL,
    collections: {}
  };
  
  let totalEntries = 0;
  
  for (const collectionType of COLLECTION_TYPES) {
    const data = await fetchCollectionData(collectionType);
    backup.collections[collectionType] = data;
    
    if (data.data) {
      totalEntries += data.data.length;
    }
  }
  
  // Create filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `backup-${timestamp}-${Date.now()}.json`;
  const filepath = path.join(__dirname, filename);
  
  // Write backup file
  fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));
  
  console.log(`\n📦 Backup Complete!`);
  console.log(`📁 File: ${filename}`);
  console.log(`📊 Total Entries: ${totalEntries}`);
  console.log(`📍 Location: ${filepath}`);
  
  // Summary by collection
  console.log('\n📋 Backup Summary:');
  for (const [collection, data] of Object.entries(backup.collections)) {
    const count = data.data?.length || 0;
    const status = data.error ? '❌' : '✅';
    console.log(`   ${status} ${collection}: ${count} entries`);
  }
}

// Run backup
backupAllContent().catch(error => {
  console.error('❌ Backup failed:', error);
  process.exit(1);
});