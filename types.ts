export interface Paper {
  id: string;
  title: string;
  authors?: string[];
  venue?: string;
  year?: number;
  abstract?: string;
  citations?: number;
  tags?: string[];
  link?: string;     // URL to the paper/code
  pdfLink?: string;  // Direct PDF link
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string; 
  contentUrl?: string; // URL to fetch markdown content from (e.g., /posts/my-post.md)
  tags: string[];
  coverImage?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  institution: string;
  email: string;
  bio: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
  };
  avatarUrl: string;
}

export enum ChatSender {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: number;
  isError?: boolean;
}