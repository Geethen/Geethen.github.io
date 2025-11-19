
import { BlogPost, Paper, ProfileData } from './types';

export const PROFILE: ProfileData = {
  name: "Dr. Maya Woods",
  title: "Computational Ecologist & ML Researcher",
  institution: "Center for Earth Observation & AI",
  email: "maya.woods@example.edu",
  bio: "I apply machine learning and computer vision to remote sensing data to solve ecological challenges. My work focuses on biodiversity monitoring, deforestation detection, and modeling climate impacts using satellite imagery.",
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    googleScholar: "https://scholar.google.com"
  },
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
};

export const PAPERS: Paper[] = [
  {
    id: "p1",
    title: "Global Forest Watch 2.0: Real-time Deforestation Detection via Sentinel-2",
    authors: ["Maya Woods", "James Chen", "Sarah O'Conner"],
    venue: "Remote Sensing of Environment",
    year: 2024,
    abstract: "We propose a deep learning pipeline leveraging Sentinel-2 multispectral imagery to detect small-scale logging activities in tropical rainforests with 94% accuracy.",
    citations: 12,
    tags: ["Remote Sensing", "Computer Vision", "Deforestation"],
    link: "#",
    pdfLink: "#"
  },
  {
    id: "p2",
    title: "Counting Elephants from Space: A Weakly Supervised Approach",
    authors: ["Maya Woods", "David Smith"],
    venue: "CVPR EarthVision Workshop",
    year: 2023,
    abstract: "A novel approach to identifying large mammals in satellite imagery using point-level supervision, reducing annotation costs by 80%.",
    citations: 45,
    tags: ["Wildlife Conservation", "Weakly Supervised Learning"],
    link: "#",
    pdfLink: "#"
  },
  {
    id: "p3",
    title: "Predicting Wildfire Spread with Graph Neural Networks",
    authors: ["Elena Rodriguez", "Maya Woods"],
    venue: "NeurIPS CCAI",
    year: 2023,
    abstract: "Modeling wildfire propagation by treating landscape features as graph nodes, incorporating wind and vegetation moisture data.",
    citations: 30,
    tags: ["GNN", "Climate AI", "Wildfire"],
    link: "#",
    pdfLink: "#"
  },
  {
    id: "p4",
    title: "Survey of Deep Learning in Ecology (Preprint)",
    link: "https://arxiv.org",
    year: 2024,
    tags: ["Survey", "Ecology"],
  },
  {
    id: "p5",
    title: "Dataset: Amazon Rainforest Canopy Height Model",
    link: "https://zenodo.org",
    tags: ["Dataset", "LiDAR"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "remote-sensing-intro",
    title: "Getting Started with Multispectral Satellite Imagery",
    date: "2024-03-15",
    excerpt: "An introduction to working with Sentinel-2 and Landsat data using Python, Rasterio, and Earth Engine.",
    tags: ["Tutorial", "Python", "Remote Sensing"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    // Use relative path (no leading slash) for GitHub Pages compatibility
    contentUrl: "posts/remote-sensing-intro.md"
  },
  {
    id: "b2",
    slug: "ai-conservation",
    title: "Can AI Save the Pangolin?",
    date: "2024-01-20",
    excerpt: "How camera traps and edge computing are being used to detect poachers and monitor endangered species in real-time.",
    tags: ["Conservation", "Edge AI", "Wildlife"],
    coverImage: "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    // Use relative path (no leading slash) for GitHub Pages compatibility
    contentUrl: "posts/ai-conservation.md"
  }
];
