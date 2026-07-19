// Configuration: Update this with your public GitHub Gist raw URL
// After creating a public gist, click "Raw" and copy the URL
const GIST_RAW_URL =
  "https://gist.githubusercontent.com/ut-01/bffeb97e056f00480efbe56962d9e639/raw/data.json";

// Cache for the fetched data
let cachedData = null;
let isFetching = false;
let fetchPromise = null;

/**
 * Fetches portfolio data from public GitHub Gist
 * @returns {Promise<Object>} Portfolio data with projects and blogs
 */
async function fetchGistData() {
  if (cachedData) {
    return cachedData;
  }

  if (isFetching) {
    return fetchPromise;
  }

  isFetching = true;

  fetchPromise = fetch(GIST_RAW_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch gist data: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      cachedData = data;
      isFetching = false;
      return data;
    })
    .catch(error => {
      isFetching = false;
      console.error('Error fetching portfolio data from Gist:', error);
      // Return fallback empty data
      return { projects: [], blogs: [] };
    });

  return fetchPromise;
}

/**
 * Get all projects from Gist
 * @returns {Promise<Array>} Array of project objects
 */
export async function getAllProjects() {
  const data = await fetchGistData();
  return data.projects || [];
}

/**
 * Get all unique topics from projects
 * @returns {Promise<Array>} Array of unique topic strings
 */
export async function getAllProjectTopics() {
  const projects = await getAllProjects();
  const topics = new Set();
  projects.forEach(project => {
    if (project.topics && Array.isArray(project.topics)) {
      project.topics.forEach(topic => topics.add(topic));
    }
  });
  return [...topics];
}

/**
 * Get all blogs from Gist
 * @returns {Promise<Array>} Array of blog objects
 */
export async function getAllBlogs() {
  const data = await fetchGistData();
  return data.blogs || [];
}

/**
 * Get all unique topics from blogs
 * @returns {Promise<Array>} Array of unique topic strings
 */
export async function getAllBlogTopics() {
  const blogs = await getAllBlogs();
  const topics = new Set();
  blogs.forEach(blog => {
    if (blog.topics && Array.isArray(blog.topics)) {
      blog.topics.forEach(topic => topics.add(topic));
    }
  });
  return [...topics];
}

/**
 * Force refresh the cached data from Gist
 * @returns {Promise<Object>} Fresh portfolio data
 */
export async function refreshData() {
  cachedData = null;
  return fetchGistData();
}

/**
 * Clear the cached data
 */
export function clearCache() {
  cachedData = null;
}

/**
 * Get homepage data (name, title, description)
 * @returns {Promise<Object>} Homepage data object
 */
export async function getHomepageData() {
  const data = await fetchGistData();
  return data.homepage || {
    name: '',
    title: ''
  };
}

/**
 * Get contact/social links data
 * @returns {Promise<Object>} Contact data with social links
 */
export async function getContactData() {
  const data = await fetchGistData();
  return data.contact || {
    github: '',
    twitter: '',
    linkedin: '',
    email: '',
    copyright: ''
  };
}
