// src/lib/supabase/timeEntries.js
import { supabase } from './supabaseclient';

/**
 * Get all time entries
 * @param {Object} filters - Optional filters (project, client, date range, etc.)
 * @returns {Promise<Array>} Array of time entries
 */
export async function getTimeEntries(filters = {}) {
  let query = supabase
    .from('time_entries')
    .select('*')
    .order('start_date', { ascending: false });

  // Apply optional filters
  if (filters.project) {
    query = query.eq('project', filters.project);
  }
  if (filters.client) {
    query = query.eq('client', filters.client);
  }
  if (filters.startDate) {
    query = query.gte('start_date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('end_date', filters.endDate);
  }
  if (filters.billable !== undefined) {
    query = query.eq('billable', filters.billable);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Get a single time entry by ID
 * @param {number} id - The time entry ID
 * @returns {Promise<Object>} The time entry
 */
export async function getTimeEntry(id) {
  const { data, error } = await supabase
    .from('time_entries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Add a new time entry
 * @param {Object} entry - The time entry data
 * @returns {Promise<Object>} The created time entry
 */
export async function addTimeEntry(entry) {
  const { data, error } = await supabase
    .from('time_entries')
    .insert(entry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Batch insert time entries (useful for imports)
 * @param {Array} entries - Array of time entry objects
 * @param {number} batchSize - Number of entries per batch (default: 100)
 * @returns {Promise<Object>} Summary of the import
 */
export async function batchInsertTimeEntries(entries, batchSize = 100) {
  const results = {
    total: entries.length,
    successful: 0,
    failed: 0,
    errors: [],
  };

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('time_entries')
      .insert(batch)
      .select();

    if (error) {
      results.failed += batch.length;
      results.errors.push({
        batch: Math.floor(i / batchSize) + 1,
        error: error.message,
      });
      console.error(
        `Error inserting batch ${Math.floor(i / batchSize) + 1}:`,
        error
      );
    } else {
      results.successful += data.length;
      console.log(
        `Inserted batch ${Math.floor(i / batchSize) + 1} (${data.length} entries)`
      );
    }
  }

  return results;
}

/**
 * Update a time entry
 * @param {number} id - The time entry ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated time entry
 */
export async function updateTimeEntry(id, updates) {
  const { data, error } = await supabase
    .from('time_entries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a time entry
 * @param {number} id - The time entry ID
 * @returns {Promise<void>}
 */
export async function deleteTimeEntry(id) {
  const { error } = await supabase.from('time_entries').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Get summary statistics for time entries
 * @param {Object} filters - Optional filters
 * @returns {Promise<Object>} Summary statistics
 */
export async function getTimeEntriesSummary(filters = {}) {
  const entries = await getTimeEntries(filters);

  const summary = {
    totalEntries: entries.length,
    totalDurationSeconds: 0,
    totalDurationHours: 0,
    totalBillableAmount: 0,
    billableEntries: 0,
    projects: new Set(),
    clients: new Set(),
  };

  entries.forEach((entry) => {
    summary.totalDurationSeconds += entry.duration_seconds || 0;
    summary.totalBillableAmount += entry.billable_amount || 0;
    if (entry.billable) summary.billableEntries++;
    if (entry.project) summary.projects.add(entry.project);
    if (entry.client) summary.clients.add(entry.client);
  });

  summary.totalDurationHours = summary.totalDurationSeconds / 3600;
  summary.projects = Array.from(summary.projects);
  summary.clients = Array.from(summary.clients);

  return summary;
}
