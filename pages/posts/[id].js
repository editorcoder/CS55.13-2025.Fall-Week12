/*
editorcoder
2025-09-16
SRJC CS55.13 Fall 2025
Week 4: Assignment 5: Draft Basic Full-Stack App 
[id].js
*/

import Head from "next/head"; // Import Next.js Head component
import Layout from "../../components/layout"; // Import shared page layout component
import Date from "../../components/date"; // Import custom date formatting component
import { getAllPostIds, getPostData } from "../../lib/posts"; // Import custom data helpers for posts
import styles from "./posts.module.css"; // Import custom CSS module for post styles

export default function Post({ postData }) { // Default export of the Post page component
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={styles.post}>
        <h1 className={styles.postTitle}>{postData.title}</h1>
        <div className={styles.postDate}>
          <Date dateString={postData.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          className={styles.postBody}
        />
      </article>
    </Layout>
  );
} // End Post component

export async function getStaticPaths() { // Next.js SSG: pre-generate dynamic routes
  const paths = getAllPostIds(); // Get list of route params like { params: { id } }
  return { // Return paths and fallback behavior for SSG
    paths, // Array of route objects
    fallback: false, // 404 for non-existent paths at build time
  }; // End return object

} // End getStaticPaths



export async function getStaticProps({ params }) { // Fetch data for a specific post
  const postData = await getPostData(params.id); // Load post content by id
  // console.log(postData);
  return { // Provide props to the page component
    props: { // Props container
      postData, // The post data to render
    }, // End props
  }; // End return object
} // End getStaticProps
