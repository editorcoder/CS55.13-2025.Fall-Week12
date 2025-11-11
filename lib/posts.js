/*
editorcoder
2025-09-16
SRJC CS55.13 Fall 2025
Week 4: Assignment 5: Draft Basic Full-Stack App 
posts.js
*/

import fs from "fs"; // import Node.js file system module
import path from "path"; // import Node.js path module 
import matter from "gray-matter"; // import 3rd-party package gray-matter (YAML front matter parser)
import { remark } from "remark"; // import 3rd-party package remark (Markdown processor)
import remarkHtml from "remark-html"; // import 3rd-party package (remark plugin for converting Markdown to HTML)
import remarkGfm from "remark-gfm"; // import 3rd-party package (remark plugin to support GFM extensions to Markdown)

const postsDirectory = path.join(process.cwd(), "posts"); // Store absolute path to posts folder

export function getSortedPostsData() { // Read posts and return metadata sorted by date
  const fileNames = fs.readdirSync(postsDirectory); // List files in posts directory
  const allPostsData = fileNames.map((fileName) => { // Map each file to a data object

    const id = fileName.replace(/\.md$/, ""); // Derive post id by stripping ".md" from filename

    const fullPath = path.join(postsDirectory, fileName); // Store absolute file path

    const fileContents = fs.readFileSync(fullPath, "utf8"); // Read markdown file text
    // console.log('fileContents'); // Debug label for file contents
    // console.log(fileContents); // Log raw file contents

    const matterResult = matter(fileContents); // Parse frontmatter and content   
    // console.log('matterResult'); // Debug label for matter result
    // console.log(matterResult); // Log parsed frontmatter result

    return { // Construct post metadata object
      id, // Post identifier
      ...matterResult.data, // Spread frontmatter fields (title, date) into the object
    };

  });

  return allPostsData.sort((a, b) => { // Sort posts by date descending
    if (a.date < b.date) { // If a is earlier than b
      return 1; // Place a after b
    } else { // Otherwise
      return -1; // Place a before b
    }
  });
}

export function getAllPostIds() { // Build Next.js dynamic route params for posts
  const fileNames = fs.readdirSync(postsDirectory); // Read post filenames
  return fileNames.map((fileName) => { // Map each filename to a params object
    return { // Return object in the shape Next.js expects
      params: { // Route parameters container
        id: fileName.replace(/\.md$/, ""), // Filename without extension
      },
    };
  });
}

// console.log('getAllPostIds()'); // Debug label for getAllPostIds() output
// console.log(getAllPostIds());

export async function getPostData(id) { // Read one post and return HTML plus metadata
  const fullPath = path.join(postsDirectory, `${id}.md`); // Path to the markdown file
  const fileContents = fs.readFileSync(fullPath, "utf8"); // Read file contents as UTF-8

  const matterResult = matter(fileContents); // Extract frontmatter and content

  const processedContent = await remark() // Initialize remark processor
    .use(remarkHtml) // Convert markdown AST to HTML
    .use(remarkGfm) // Enable GitHub Flavored Markdown features
    .process(matterResult.content); // Process the markdown content
  const contentHtml = processedContent.toString(); // Serialized HTML string

  return { // Compose result object for consumers
    id, // Post identifier
    contentHtml, // HTML version of the markdown content
    ...matterResult.data, // Include frontmatter fields (e.g., title, date)
  };
}
