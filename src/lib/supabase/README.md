# Supabase Library

This directory contains modules for interacting with Supabase database tables.

## Modules

### `supabaseclient.js`

The base Supabase client configuration used by all other modules.

```javascript
import { supabase } from './supabaseclient';
```

### `auth.js`

Authentication functions for user management.

### `games.js`

CRUD operations for the `games` table.

**Functions:**

- `getGames()` - Get all games ordered by display_order
- `addGame(title, metadata)` - Add a new game
- `updateGame(id, updates)` - Update a game
- `deleteGame(id)` - Delete a game
- `reorderGames(games)` - Update display order for multiple games

### `timeEntries.js`

CRUD operations and utilities for the `time_entries` table.

**Functions:**

#### Query Functions

- `getTimeEntries(filters)` - Get time entries with optional filters
  - Filters: `project`, `client`, `startDate`, `endDate`, `billable`
- `getTimeEntry(id)` - Get a single time entry by ID
- `getTimeEntriesSummary(filters)` - Get summary statistics

#### Mutation Functions

- `addTimeEntry(entry)` - Add a new time entry
- `updateTimeEntry(id, updates)` - Update a time entry
- `deleteTimeEntry(id)` - Delete a time entry
- `batchInsertTimeEntries(entries, batchSize)` - Bulk insert time entries

## Usage Examples

### Games Example

```javascript
import { getGames, addGame } from '@/lib/supabase/games';

// Get all games
const games = await getGames();

// Add a new game
const newGame = await addGame('Elden Ring', {
  platform: 'PS5',
  year: 2022,
});
```

### Time Entries Example

```javascript
import {
  getTimeEntries,
  getTimeEntriesSummary,
} from '@/lib/supabase/timeEntries';

// Get all billable entries for a client
const entries = await getTimeEntries({
  client: 'ACME Corp',
  billable: true,
});

// Get summary statistics
const summary = await getTimeEntriesSummary({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});

console.log(`Total hours: ${summary.totalDurationHours}`);
console.log(`Total billable: $${summary.totalBillableAmount}`);
```

### Batch Import Example

```javascript
import { batchInsertTimeEntries } from '@/lib/supabase/timeEntries';

const entries = [
  {
    project: 'Website Redesign',
    client: 'ACME Corp',
    description: 'Frontend development',
    duration_seconds: 7200,
    billable: true,
    billable_rate: 100,
    billable_amount: 200,
    start_date: '2025-01-15',
    start_time: '09:00:00',
    end_date: '2025-01-15',
    end_time: '11:00:00',
  },
  // ... more entries
];

const result = await batchInsertTimeEntries(entries, 100);
console.log(`Imported ${result.successful} of ${result.total} entries`);
```

## Import Scripts

### Clockify CSV Import

Import time tracking data from Clockify CSV exports.

**Usage:**

```bash
# Import default file (src/data/2025_time.csv)
npm run import:clockify

# Import specific file
npm run import:clockify path/to/export.csv
```

**CSV Format:**
The script expects Clockify's standard export format with columns:

- Project, Client, Description, Task
- User, Group, Email
- Tags, Billable, Billable Rate (USD), Billable Amount (USD)
- Start Date, Start Time, End Date, End Time
- Duration (h), Duration (decimal)

## Environment Variables

Required environment variables (in `.env` or `.env.local`):

```
REACT_APP_PUBLIC_SUPABASE_URL=your_supabase_url
REACT_APP_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Error Handling

All functions throw errors that should be caught:

```javascript
try {
  const games = await getGames();
} catch (error) {
  console.error('Failed to fetch games:', error.message);
}
```

## Development

When adding new tables:

1. Create a new module (e.g., `tablename.js`)
2. Import the supabase client from `supabaseclient.js`
3. Export async functions for CRUD operations
4. Follow the naming convention: `get`, `add`, `update`, `delete` + EntityName
5. Document the module in this README
