/**
 * PRD Data Model (links sub-collection):
 * - title: string
 * - url: string
 * - createdAt: timestamp
 * 
 * Note: Favicons are dynamically fetched via Google API using the URL on the client side.
 */

export interface Link {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt?: Date;
  clickCount?: number;
}

export const DUMMY_LINKS: Link[] = [
  {
    id: "1",
    title: "Instagram",
    url: "https://www.instagram.com",
    createdAt: new Date("2026-04-28T10:00:00Z"),
  },
  {
    id: "2",
    title: "YouTube",
    url: "https://www.youtube.com",
    createdAt: new Date("2026-04-28T10:05:00Z"),
  },
  {
    id: "3",
    title: "Technical Blog",
    url: "https://velog.io",
    createdAt: new Date("2026-04-28T10:10:00Z"),
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    createdAt: new Date("2026-04-28T10:15:00Z"),
  },
  {
    id: "5",
    title: "Portfolio",
    url: "https://my-portfolio.com",
    createdAt: new Date("2026-04-28T10:20:00Z"),
  },
];
