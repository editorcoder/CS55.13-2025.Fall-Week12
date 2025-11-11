/*
editorcoder
2025-09-15
SRJC CS55.13 Fall 2025
Week 3: Assignment 4: Next.js Basics 
date.js
*/

import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, "EEEE, LLLL d, yyyy")}</time>
  );
}
