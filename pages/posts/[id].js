/*
editorcoder
2025-11-10
SRJC CS55.13 Fall 2025
Week 12: Assignment 12: Basic Headless CMS-Powered App 
[id].js
*/

import Head from "next/head"; // Import Next.js Head component
import Image from "next/image"; // Import Next.js Image component for optimized images
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
        <h2 className={styles.postTitle}>{postData.title}</h2>
        <div className={styles.postDate}>
          <Date dateString={postData.date} />
        </div>
        {postData.featured_image_url && (
          <div className={styles.postImage}>
            <Image
              src={postData.featured_image_url}
              alt=""
              width={800}
              height={400}
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
              className={styles.featuredImage}
            />
          </div>
        )}
        <div 
          className={styles.postBody} 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  ); // End return statement
} // End Post component

export async function getStaticPaths() { // Next.js SSG: pre-generate dynamic routes
  const paths = await getAllPostIds(); // Get list of route params like { params: { id } }
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
