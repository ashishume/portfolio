/**
 * Simple frontmatter parser for browser compatibility
 * Parses YAML frontmatter from markdown files
 */
export interface Frontmatter {
  [key: string]: string | undefined;
}

export function parseFrontmatter(content: string): { data: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // No frontmatter found, return entire content
    return { data: {}, content: content.trim() };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  // Parse simple YAML frontmatter (key: "value" format)
  const data: Frontmatter = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return {
    data,
    content: markdownContent.trim(),
  };
}

