# Researcher Portfolio Walkthrough

This portfolio is designed for high-aesthetic appeal and ease of content management for researchers.

## How to add a new Research Paper
1. **Create the Markdown file**: Add a new `.md` file in `public/content/research/` (e.g., `new-paper.md`).
2. **Add Content**: Write your abstract or details in the markdown file.
3. **Register in Index**: Open `src/content/data.ts` and add a new entry to the `papers` array:
   ```typescript
   {
     id: "unique-id",
     title: "Paper Title",
     authors: "Authors...",
     date: "2025",
     journal: "Journal Name",
     tags: ["AI", "Ecology"],
     file: "/content/research/new-paper.md",
     link: "https://link-to-pdf.com"
   }
   ```

## How to add a new Blog Post
1. **Create the Markdown file**: Add a new `.md` file in `public/content/blogs/` (e.g., `my-post.md`).
2. **Register in Index**: Open `src/content/data.ts` and add a new entry to the `blogs` array:
   ```typescript
   {
     id: "post-id",
     title: "Post Title",
     date: "December 18, 2025",
     summary: "Short preview text...",
     file: "/content/blogs/my-post.md",
     tags: ["Ecology", "ML"]
   }
   ```

## Design Customization
- **Colors & Fonts**: Modify `src/index.css` under the `:root` selector to change the primary forest green or typography.
- **Layout**: Pages are located in `src/pages/`.

## Deployment
Run `npm run deploy` to build and push the site to your GitHub Pages branch.
