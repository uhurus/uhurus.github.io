// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import { execSync } from 'node:child_process';

/**
 * Obtiene la última fecha de modificación de un archivo mediante Git.
 * Requiere que el entorno tenga git instalado y acceso al historial.
 */
function gitLastmod(filePath) {
  try {
    const log = execSync(`git log -1 --format="%cI" -- "${filePath}"`, {
      encoding: 'utf-8',
    }).trim();
    return log ? new Date(log) : null;
  } catch (e) {
    return null;
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://uhurus.com",

  build: {
    assets: "assets",
    format: "file"
  },

  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      entryLimit: 1000,
      serialize(item) {
        // Intentamos obtener el lastmod de git si existe la información de ruta
        // @ts-ignore
        if (item.file) {
          // @ts-ignore
          const lastmod = gitLastmod(item.file);
          if (lastmod) {
            item.lastmod = lastmod.toISOString();
          }
        }
        return item;
      }
    }),
    robotsTxt({
      appendOnNewLine: false,
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      // Discovery para agentes de IA según protocolo NLWeb
      customAttributes: {
        Schemamap: 'https://uhurus.com/schemamap.xml',
      },
    }),
    seoGraph({
      llmsTxt: {
        title: 'uhurus',
        siteUrl: 'https://uhurus.com',
        summary: 'Laboratorio de producto e innovación especializado en diseño centrado en personas y desarrollo ágil.',
      },
      // Validación en tiempo de build activada por defecto
    })
  ]
});