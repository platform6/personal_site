import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and parse markdown content from public data files
 * @param {string} filePath - Path to the markdown file (relative to /public)
 * @returns {Object} { content: string, loading: boolean, error: Error | null }
 */
const useMarkdownContent = (filePath) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filePath) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${filePath}: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading markdown content:', err);
        setError(err);
        setLoading(false);
      });
  }, [filePath]);

  return { content, loading, error };
};

export default useMarkdownContent;
