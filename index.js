import { promises as fs } from 'fs';
import path from 'path';

/**
 * Astro integration to remove whitespace between HTML tags in build output
 * @returns {import('astro').AstroIntegration}
 */
export default function removeTagWhitespace() {
  return {
    name: 'astro-remove-whitespace',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        console.log('🧹 Removing extra whitespace from markup');

        const removeWhitespace = (content) => {
          return content.replace(/\s+/g, ' ').replace(/>\s+</g, '><');
        };

        // Process all HTML files
        const processFile = async (filePath) => {
          try {
            const content = await fs.readFile(filePath, 'utf-8');
            console.log(`Processing ${path.basename(filePath)}`);
            const minified = removeWhitespace(content);
            await fs.writeFile(filePath, minified, 'utf-8');
          } catch (error) {
            console.error(`Error processing ${filePath}:`, error);
          }
        };

        // Walk through the dist directory
        const walkDir = async (dirPath) => {
          try {
            const files = await fs.readdir(dirPath);

            for (const file of files) {
              const filePath = path.join(dirPath, file);
              const stat = await fs.stat(filePath);

              if (stat.isDirectory()) {
                await walkDir(filePath);
              } else if (file.endsWith('.html')) {
                await processFile(filePath);
              }
            }
          } catch (error) {
            console.error(`Error walking directory ${dirPath}:`, error);
          }
        };

        try {
          let pathname = dir.pathname;
          if (process.platform === 'win32') { pathname = pathname.replace('/', ''); }
          await walkDir(pathname);
        } catch (error) {
          console.error('❌ Error in build hook:', error);
        }
      },
    },
  };
}
