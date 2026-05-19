import { createViteConfig } from '@open-slide/core/vite';
import { build, mergeConfig } from 'vite';
import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 't-bite-presentation';
const pagesBase = process.env.GITHUB_PAGES_BASE ?? `/${repoName}/`;
const outDir = path.resolve(cwd, 'dist');

const routerBasenameForPages = {
  name: 't-bite:github-pages-router-basename',
  enforce: 'pre',
  transform(code, id) {
    const isOpenSlideApp = id.replaceAll('\\', '/').endsWith('@open-slide/core/src/app/app.tsx');
    if (!isOpenSlideApp || !code.includes('<BrowserRouter>')) return null;

    return code.replace(
      '<BrowserRouter>',
      '<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\\/$/, \'\') || undefined}>',
    );
  },
};

const openSlideConfig = await createViteConfig({
  userCwd: cwd,
  mode: 'build',
});

const pagesConfig = mergeConfig(openSlideConfig, {
  base: pagesBase,
  plugins: [routerBasenameForPages],
  build: {
    outDir,
  },
});

await build(pagesConfig);

const indexHtml = path.join(outDir, 'index.html');

await copyFile(indexHtml, path.join(outDir, '404.html'));
await writeFile(path.join(outDir, '.nojekyll'), '');

const slidesDir = path.join(cwd, 'slides');
const slideEntries = await readdir(slidesDir, { withFileTypes: true });

for (const entry of slideEntries) {
  if (!entry.isDirectory()) continue;

  const slideRoute = path.join(outDir, 's', entry.name);
  const presenterRoute = path.join(slideRoute, 'presenter');

  await mkdir(slideRoute, { recursive: true });
  await mkdir(presenterRoute, { recursive: true });
  await copyFile(indexHtml, path.join(slideRoute, 'index.html'));
  await copyFile(indexHtml, path.join(presenterRoute, 'index.html'));
}

console.log(`Built GitHub Pages artifact with base ${pagesBase}`);
