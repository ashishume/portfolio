# Blog Posts

This folder contains all blog posts as markdown files.

## How to Add a New Blog Post

1. Create a new `.md` file in this folder (e.g., `my-new-blog-post.md`)
2. Add frontmatter at the top of the file with the following structure:

```markdown
---
title: "Your Blog Title"
date: "2024-03-15"
excerpt: "A brief description of your blog post."
---

# Your Blog Title

Your markdown content goes here...
```

## Frontmatter Fields

- **title** (required): The title of your blog post
- **date** (required): Publication date in YYYY-MM-DD format
- **excerpt** (required): A short description that appears in the blog list
- **id** (optional): Unique identifier (auto-generated if not provided)
- **slug** (optional): URL-friendly slug (auto-generated from title if not provided)

## Example

```markdown
---
title: "Building a React Portfolio"
date: "2024-03-15"
excerpt: "Learn how to build a modern portfolio website using React and Tailwind CSS."
---

# Building a React Portfolio

This is my first blog post about building a portfolio...

## Getting Started

More content here...
```

The blog post will automatically appear on the blog page once you save the file!

