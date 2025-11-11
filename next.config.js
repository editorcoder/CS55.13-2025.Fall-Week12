/*
editorcoder
2025-11-10
SRJC CS55.13 Fall 2025
Week 12: Assignment 12: Basic Headless CMS-Powered App 
next.config.js
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-basic-headless-cms-app.pantheonsite.io',
      },
    ],
  },
};

module.exports = nextConfig;

