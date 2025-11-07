// src/scripts/importClockify.js
require('dotenv').config(); // Load environment variables from .env file

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Use the same client configuration as the app
const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - REACT_APP_PUBLIC_SUPABASE_URL');
  console.error('   - REACT_APP_PUBLIC_SUPABASE_ANON_KEY');
  console.error(
    'Make sure your .env or .env.local file exists and contains these variables.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Parse a CSV row into a time entry object
 * @param {Object} row - Raw CSV row
 * @returns {Object} Formatted time entry
 */
function parseTimeEntry(row) {
  // Parse duration (format: "HH:MM:SS" or "HH:MM")
  const [hours, minutes, seconds] = row['Duration (h)'].split(':');
  const duration_seconds =
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    (seconds ? parseInt(seconds) : 0);

  // Parse dates
  const start_date = new Date(row['Start Date']).toISOString().split('T')[0];
  const end_date = new Date(row['End Date']).toISOString().split('T')[0];

  return {
    project: row['Project'],
    client: row['Client'],
    description: row['Description'],
    task: row['Task'],
    user_name: row['User'],
    user_group: row['Group'],
    user_email: row['Email'],
    tags: row['Tags'] ? row['Tags'].split(',').map((tag) => tag.trim()) : [],
    billable: row['Billable'].toLowerCase() === 'yes',
    billable_rate: parseFloat(row['Billable Rate (USD)']) || 0,
    billable_amount: parseFloat(row['Billable Amount (USD)']) || 0,
    start_date,
    start_time: row['Start Time'],
    end_date,
    end_time: row['End Time'],
    duration_seconds,
    duration_decimal: parseFloat(row['Duration (decimal)']) || 0,
  };
}

/**
 * Batch insert time entries into Supabase
 * @param {Array} entries - Array of time entry objects
 * @param {number} batchSize - Number of entries per batch
 * @returns {Promise<Object>} Summary of the import
 */
async function batchInsertTimeEntries(entries, batchSize = 100) {
  const results = {
    total: entries.length,
    successful: 0,
    failed: 0,
    errors: [],
  };

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    try {
      const { data, error } = await supabase
        .from('time_entries')
        .insert(batch)
        .select();

      if (error) throw error;

      results.successful += data.length;
      console.log(
        `✓ Batch ${batchNumber}/${Math.ceil(entries.length / batchSize)}: Inserted ${data.length} entries`
      );
    } catch (error) {
      results.failed += batch.length;
      results.errors.push({
        batch: batchNumber,
        error: error.message,
      });
      console.error(`✗ Batch ${batchNumber} failed:`, error.message);
    }
  }

  return results;
}

/**
 * Import Clockify CSV data into Supabase
 * @param {string} csvFilePath - Path to the CSV file
 * @returns {Promise<void>}
 */
async function importClockifyData(csvFilePath) {
  const results = [];

  console.log(`\n📁 Reading CSV file: ${csvFilePath}`);

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const entry = parseTimeEntry(row);
          results.push(entry);
        } catch (error) {
          console.error('Error parsing row:', error.message, row);
        }
      })
      .on('end', async () => {
        console.log(`\n✓ Parsed ${results.length} entries from CSV\n`);

        if (results.length === 0) {
          console.log('⚠ No entries to import');
          resolve();
          return;
        }

        console.log('📤 Starting batch insert to Supabase...\n');

        try {
          const summary = await batchInsertTimeEntries(results);

          console.log('\n' + '='.repeat(50));
          console.log('📊 IMPORT SUMMARY');
          console.log('='.repeat(50));
          console.log(`Total entries:      ${summary.total}`);
          console.log(`✓ Successful:       ${summary.successful}`);
          console.log(`✗ Failed:           ${summary.failed}`);

          if (summary.errors.length > 0) {
            console.log('\n⚠ Errors:');
            summary.errors.forEach((err) => {
              console.log(`  - Batch ${err.batch}: ${err.error}`);
            });
          }

          console.log('='.repeat(50) + '\n');

          resolve(summary);
        } catch (error) {
          console.error('\n❌ Import failed:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
}

// Main execution
async function main() {
  // Default CSV file path
  const csvFilePath =
    process.argv[2] || path.join(__dirname, '../data/2025_time.csv');

  // Check if file exists
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ File not found: ${csvFilePath}`);
    console.log('\nUsage: node importClockify.js [path/to/csv]');
    process.exit(1);
  }

  try {
    await importClockifyData(csvFilePath);
    console.log('✅ Import complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as a module
module.exports = {
  importClockifyData,
  parseTimeEntry,
  batchInsertTimeEntries,
};
