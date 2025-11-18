// Temporary script to query tags from Playing Video Games entries
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function queryTags() {
  // Query all entries where project is "Playing Video Games"
  const { data, error } = await supabase
    .from('time_entries')
    .select('id, task, tags, duration_seconds')
    .eq('project', 'Playing Video Games')
    .order('duration_seconds', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Query used:');
  console.log(`
    SELECT id, task, tags, duration_seconds
    FROM time_entries
    WHERE project = 'Playing Video Games'
    ORDER BY duration_seconds DESC
  `);
  console.log('\n='.repeat(80));
  console.log(`Total "Playing Video Games" entries: ${data.length}\n`);

  // Check for entries with no tags
  const noTags = data.filter((entry) => !entry.tags || entry.tags.length === 0);
  console.log(`Entries with no tags: ${noTags.length}`);
  if (noTags.length > 0) {
    console.log('Sample entries with no tags:');
    noTags.slice(0, 5).forEach((entry) => {
      console.log(
        `  - ID: ${entry.id}, Task: ${entry.task}, Tags: ${JSON.stringify(entry.tags)}`
      );
    });
  }

  // Check for entries with multiple tags
  const multipleTags = data.filter(
    (entry) => entry.tags && entry.tags.length > 1
  );
  console.log(`\nEntries with multiple tags: ${multipleTags.length}`);
  if (multipleTags.length > 0) {
    console.log('Sample entries with multiple tags:');
    multipleTags.slice(0, 5).forEach((entry) => {
      console.log(
        `  - ID: ${entry.id}, Task: ${entry.task}, Tags: ${JSON.stringify(entry.tags)}`
      );
    });
  }

  // Count all unique tags
  const tagCounts = {};
  data.forEach((entry) => {
    if (entry.tags && entry.tags.length > 0) {
      entry.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  console.log('\nAll unique tags and their counts:');
  Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([tag, count]) => {
      console.log(`  - "${tag}": ${count} entries`);
    });

  process.exit(0);
}

queryTags();
