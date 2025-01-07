// src/ApiConfig.js

// example baseURL using Vite-style environment variables
const baseURL = `${import.meta.env.API_URL}/${import.meta.env.Version}`;

/**
 * A reusable function to fetch data with useAsyncData (Nuxt 3).
 * @param {string} path - API endpoint path.
 * @param {string} nameData - Unique key for the useAsyncData cache.
 * @param {string} methodType - HTTP method (e.g., 'GET', 'POST').
 * @param {Object} [params={}] - Optional query parameters.
 * @param {Object} [body=null] - Optional body for POST/PUT requests.
 * @returns {Promise} - { data, pending, error } from useAsyncData.
 */
export const apiFetch = (
  path,
  nameData,
  methodType = "GET",
  params = {},
  body = null
) => {
  // Construct URL with query params
  const url = new URL(baseURL + path);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  // Define fetch options
  const options = {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Use useAsyncData for fetching (Nuxt-specific)
  return useAsyncData(nameData, () =>
    fetch(url.toString(), options).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
  );
};
