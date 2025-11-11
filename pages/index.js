/*
editorcoder
2025-11-10
SRJC CS55.13 Fall 2025
Week 12: Assignment 12: Basic Headless CMS-Powered App 
index.js
*/

import Head from "next/head"; // Import Next.js Head component
import Link from "next/link"; // Import Next.js Link component
import Date from "../components/date"; // Import custom date formatting component
import Layout, { siteTitle } from "../components/layout"; // Import shared Layout component and site title
import utilStyles from "../styles/utils.module.css"; // Import CSS module with utility styles
import styles from "./index.module.css"; // Import CSS module for index page styles
import { getSortedPostsData } from "../lib/posts"; // Import helper to load and sort posts

export default function Home({ allPostsData }) { // Export the Home page component as default
  return (
    // Begin component render
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${styles.homeIntro}`}>
        <p>
          Hello, I'm EditorCoder, a subject matter expert (SME) for legal AI
          tech and a fledgling accessible web developer. For more information,
          check out my{" "}
          <a href="https://github.com/editorcoder" target="_blank">GitHub profile</a>.
        </p>
      </section>

      <section className={utilStyles.headingMd}>
        <h2 className={`${utilStyles.headingLg} ${styles.home}`}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <div className={styles.postListItem}>
                <div className={styles.postContent}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  ); // End render expression
} // End component

export async function getStaticProps() { // Next.js SSG: fetch data at build time
  const allPostsData = await getSortedPostsData(); // Load and sort posts for listing
  return { // Provide props to page
    props: { // Props container
      allPostsData, // Array of posts with id, date, title
    }, // End props
  }; // End return object
}
