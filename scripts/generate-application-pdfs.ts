import { execSync } from 'node:child_process';
import * as http from 'node:http';
import * as path from 'node:path';
import * as puppeteer from 'puppeteer';
import { pdfPage } from 'puppeteer-report';
import * as fs from 'node:fs';
import type { Server } from 'node:http';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

function createStaticServer(rootDir: string): Promise<Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url?.split('?')[0] || '/';
      const filePath = path.join(rootDir, urlPath);

      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(filePath, 'index.html')).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// ---------------------------------------------------------------------------
// Discover all application slugs by scanning the dist directory
// ---------------------------------------------------------------------------

function discoverSlugs(distDir: string): string[] {
  const resumeDir = path.join(distDir, 'resume');
  if (!fs.existsSync(resumeDir)) return [];

  return fs
    .readdirSync(resumeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => name !== 'index'); // exclude /resume (master)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  let browser: puppeteer.Browser | null = null;
  let server: Server | null = null;

  try {
    console.log('Building project...');
    execSync('npx astro build', { stdio: 'inherit' });

    const distDir = path.join(__dirname, '..', 'dist');
    const slugs = discoverSlugs(distDir);

    if (slugs.length === 0) {
      console.log('No application pages found. Skipping PDF generation.');
      process.exit(0);
    }

    console.log(`Found ${slugs.length} application(s): ${slugs.join(', ')}`);

    console.log('Starting local server...');
    server = await createStaticServer(distDir);
    const address = server.address() as { port: number };
    const baseUrl = `http://127.0.0.1:${address.port}`;

    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: 'new' });

    for (const slug of slugs) {
      console.log(`\n--- Generating PDFs for: ${slug} ---`);

      // === Tailored Resume PDF ===
      const resumePage = await browser.newPage();
      await resumePage.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 });

      console.log('  Opening tailored resume...');
      await resumePage.goto(`${baseUrl}/resume/${slug}/`, { waitUntil: 'networkidle0' });

      // Remove screen-only buttons
      await resumePage.evaluate(() => {
        const el = document.querySelector('.print\\:hidden');
        if (el) el.remove();
      });

      const resumePdfPath = path.join(__dirname, '..', 'public', `resume-${slug}.pdf`);
      console.log(`  Generating resume PDF → ${resumePdfPath}`);
      await pdfPage(resumePage, {
        path: resumePdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
      });
      await resumePage.close();

      // === Cover Letter PDF ===
      const clPage = await browser.newPage();
      await clPage.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 });

      console.log('  Opening cover letter...');
      await clPage.goto(`${baseUrl}/cover-letter/${slug}/`, { waitUntil: 'networkidle0' });

      await clPage.evaluate(() => {
        const el = document.querySelector('.print\\:hidden');
        if (el) el.remove();
      });

      const clPdfPath = path.join(__dirname, '..', 'public', `cover-letter-${slug}.pdf`);
      console.log(`  Generating cover letter PDF → ${clPdfPath}`);
      await pdfPage(clPage, {
        path: clPdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
      });
      await clPage.close();
    }

    await browser.close();
    browser = null;
    server.close();
    server = null;

    console.log('\n✅ All application PDFs generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating application PDFs:', error);
    if (browser) await browser.close().catch(() => {});
    if (server) server.close();
    process.exit(1);
  }
}

main();
