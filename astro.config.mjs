// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark'; // <-- Import unified here
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import remarkCallout from '@r4ai/remark-callout';

// https://astro.build/config
export default defineConfig({
  site: 'https://shayaanzari.github.io',
  markdown: {
    // Wrap your existing configuration inside the processor
    processor: unified({
      remarkPlugins: [remarkMath, remarkCallout],
      rehypePlugins: [ // rehypeKatex? Also would need to link the KaTeX CSS stylesheet in layout.astro
        [
          rehypeMathjax,
          {
            tex: {
              packages: { '[+]': ['physics', 'color', 'boldsymbol', 'mathrsfs', 'ams', 'newcommand', 'configmacros'] },
              macros: {
                R: "\\mathbb{R}",
                C: "\\mathbb{C}",
                N: "\\mathbb{N}",
                Q: "\\mathbb{Q}",
                bbF: "\\mathbb{F}",
                B: "\\mathscr{B}",
                A: "\\mathscr{A}",
                F: "\\mathscr{F}",
                T: "\\mathcal{T}",
                t: "\\tilde",
                div: "\\operatorname{div}"
              },
            },
          },
        ],
      ],
    }),
  },
  vite: {
    server: {
      fs: {
        allow: [
          '/home/izsnr/Sync/Files_SZ/notes/present/7-pages',
          '/home/izsnr/Projects/site/notes'
        ]
      }
    }
  }
});
