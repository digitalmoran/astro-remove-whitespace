# Astro Remove Whitespace Plugin

A simple Astro Plugin that removes unnecessary whitespace including between HTML tags in your build output.

## Background

Originally created by [Utsubo](https://www.utsubo.com), a creative studio based in Japan, to optimize their web projects. 
We noticed that Astro's build process preserved whitespace between closing tags, which added unnecessary bytes to the final bundle. 
This plugin solves that issue by cleaning up the HTML output post-build.

## Features

- Removes extra whitespace including between HTML tags in build output
- Preserves source code readability
- Runs automatically after build completion
- Minimal configuration required
- Maintains other spacing and formatting
- Processes all HTML files in build directory recursively

## Installation

```bash
npm install astro-remove-whitespace
```

## Usage

Add the plugin to your `astro.config.mjs`:

```javascript
import removeTagWhitespace from 'astro-remove-whitespace';

export default defineConfig({
  integrations: [
    removeTagWhitespace()
  ],
});
```

### Before and After

Before:
```html
</g> </g> </svg> </div> </button>
```

After:
```html
</g></g></svg></div></button>
```

## How It Works

The plugin hooks into Astro's build process using the `astro:build:done` hook. After the build is complete, it:

1. Recursively finds all HTML files in your build directory
2. Removes whitespace between closing tags using regex
3. Preserves other formatting and spacing
4. Writes the optimized content back to the files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Maintainer

[Utsubo](https://www.utsubo.com) - A Technology-First creative studio.
- [`twitter @utsuboco`](https://twitter.com/utsuboco)
