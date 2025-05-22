import { createClient } from '@sanity/client';

if (
  !process.env.REACT_APP_SANITY_PROJECT_ID ||
  !process.env.REACT_APP_SANITY_DATASET
) {
  throw new Error('Missing required environment variables for Sanity client');
}

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-05-22',
  token: process.env.REACT_APP_SANITY_TOKEN, // Optional: Only needed if you want to update content
});

// Queries
export const POSTS_QUERY = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)`;
export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

// Helper function for error handling during queries
export const fetchSanityData = async (query, params = {}) => {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
};
