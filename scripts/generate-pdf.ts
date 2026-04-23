import { execSync } from 'node:child_process';
import * as http from 'node:http';
import * as path from 'node:path';
import * as puppeteer from 'puppeteer';
import { pdfPage } from 'puppeteer-report';
import * as fs from 'node:fs';
import type { Server } from 'node:http';

const MIME_TYPES: Record = {
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

const createStaticServer = (rootDir: string): Promise => {
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
};

const main = async () => {
  let browser: puppeteer.Browser | null = null;
  let server: Server | null = null;

  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const pdfPath = path.join(pagesDir, 'pdf.astro');
  const pdfHiddenPath = path.join(pagesDir, '_pdf.astro');

  try {
    if (!fs.existsSync(pdfPath) && fs.existsSync(pdfHiddenPath)) {
      console.log('Restoring pdf.astro from _pdf.astro...');
      fs.renameSync(pdfHiddenPath, pdfPath);
    }

    console.log('Building project...');
    execSync('npx astro build', { stdio: 'inherit' });

    const distDir = path.join(__dirname, '..', 'dist');
    const pdfHtmlPath = path.join(distDir, 'pdf', 'index.html');

    if (!fs.existsSync(pdfHtmlPath)) {
      throw new Error(`PDF HTML file not found at ${pdfHtmlPath}`);
    }

    console.log('Starting local server...');
    server = await createStaticServer(distDir);
    const address = server.address() as { port: number };
    const baseUrl = `http://127.0.0.1:${address.port}`;

    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();

    await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 });

    console.log('Opening PDF page...');
    await page.goto(`${baseUrl}/pdf/`, {
      waitUntil: 'networkidle0',
    });

    console.log('Generating PDF...');
    await pdfPage(page, {
      path: path.join(__dirname, '..', 'public', 'cv.pdf'),
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    console.log('PDF generated successfully!');

    await browser.close();
    browser = null;

    server.close();
    server = null;

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating PDF:', error);

    if (browser) {
      await browser.close().catch(() => {});
    }
    if (server) {
      server.close();
    }

    process.exit(1);
  }
};

main();
