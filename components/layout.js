/*
editorcoder
2025-11-10
SRJC CS55.13 Fall 2025
Week 3: Assignment 4: Next.js Basics 
layout.js
*/

import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "EditorCoder";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="https://dev-basic-headless-cms-app.pantheonsite.io/wp-content/uploads/2025/11/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="https://dev-basic-headless-cms-app.pantheonsite.io/wp-content/uploads/2025/11/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt='Home page'
              />
            </Link>
            <h1 className={`${utilStyles.headingXl}`}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">Back to home</Link>
        </div>
      )}
    </div>
  );
}
