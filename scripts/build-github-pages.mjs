import { createViteConfig } from '@open-slide/core/vite';
import { build, mergeConfig } from 'vite';
import { copyFile, writeFile } from 'node:fs/promises';
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

await copyFile(path.join(outDir, 'index.html'), path.join(outDir, '404.html'));
await writeFile(path.join(outDir, '.nojekyll'), '');

console.log(`Built GitHub Pages artifact with base ${pagesBase}`);
