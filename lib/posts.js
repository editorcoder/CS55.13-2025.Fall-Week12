/*
editorcoder
2025-11-10
SRJC CS55.13 Fall 2025
Week 12: Assignment 12: Basic Headless CMS-Powered App 
posts.js
*/

import { got } from "got"; // load got module for HTTP requests
// NOTE: Upgraded to v14 due to issue "Got allows a redirect to a UNIX socket" https://github.com/advisories/GHSA-pfrx-2q88-qq97
// Updated fetchPostData() to work with v14
import { remark } from "remark"; // import 3rd-party package remark (Markdown processor)
import remarkHtml from "remark-html"; // import 3rd-party package (remark plugin for converting Markdown to HTML)
import remarkGfm from "remark-gfm"; // import 3rd-party package (remark plugin to support GFM extensions to Markdown) - this is for any tables in the Markdown content


// define REST endpoint URL
const dataURL =
  "https://dev-basic-headless-cms-app.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest-posts/1";


// Helper function to fetch and parse JSON data from WordPress API--
// to eliminate repetition across getAllPostIds(), getSortedPostData(), and getPostData()
async function fetchPostsData() {
  let jsonObj; // Declare variable to store parsed JSON data
  try { // Begin error handling block
    // get JSON data from REST endpoint (got v14 automatically parses JSON)
    jsonObj = await got(dataURL).json();
    console.log(jsonObj); // Log parsed JSON object for debugging
  } catch (error) { // Handle request errors
    jsonObj = []; // Set empty array as fallback
    console.log(error); // Log error for debugging
  } // End error handling block

  return jsonObj; // Return parsed JSON data
}

export async function getAllPostIds() { // Build Next.js dynamic route params for posts

  const jsonObj = await fetchPostsData(); // Fetch posts data from API

  const paths = jsonObj.map(item => { // Map each filename to a params object
    return { // Return object in the shape Next.js expects
      params: { // Route parameters container
        id: item.ID.toString() // Filename without extension
      } // End params object
    } // End return object
  }); // End map function
  return paths; // Return array of path objects
}

export async function getSortedPostsData() { // Read posts and return metadata sorted by date

  const jsonObj = await fetchPostsData(); // Fetch posts data from API

  jsonObj.sort(function (a, b) { // Sort array by post date in descending order
    return b.post_date.localeCompare(a.post_date); // Compare dates using locale-aware string comparison
  }); // End sort function

  return jsonObj.map(item => { // Transform each post object to include only needed fields
    return { // Return simplified post object
      id: item.ID.toString(), // Convert ID to string
      title: item.post_title, // Include post title
      date: item.post_date, // Include post date
    } // End return object
  }) // End map function

}

export async function getPostData(id) { // Read one post and return HTML plus metadata

  const jsonObj = await fetchPostsData(); // Fetch posts data from API

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => { // Filter array to find post with matching ID
    return obj.ID.toString() === id; // Compare post ID with requested id
  }); // End filter function

  // extract object value in filtered array if any
  let objReturned; // Declare variable to store matched post object
  if (objMatch.length > 0) { // Check if matching post was found
    objReturned = objMatch[0]; // Use first matching post
  } else { // Handle case when no post matches
    objReturned = {}; // Set empty object as fallback
  } // End if-else block

  // Convert Markdown content to HTML using remark
  let contentHtml = ''; // Initialize HTML content variable
  if (objReturned.post_content) { // Check if post has content to process
    const processedContent = await remark() // Initialize remark processor
      .use(remarkGfm) // Support GitHub Flavored Markdown
      .use(remarkHtml) // Convert to HTML
      .process(objReturned.post_content); // Process markdown content

    contentHtml = processedContent.toString(); // Convert processed content to string
  } // End if block

  return { // Return post data object
    id: objReturned.ID ? objReturned.ID.toString() : '', // Convert ID to string or use empty string
    title: objReturned.post_title || '', // Use post title or empty string
    contentHtml: contentHtml, // Include processed HTML content
    date: objReturned.post_date || '', // Use post date or empty string
    featured_image_url: objReturned.featured_image_url || '', // Include featured image URL or empty string
  }; // End return object

}


