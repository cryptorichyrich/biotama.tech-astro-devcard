import { spawn } from 'node:child_process';
import * as path from 'node:path';
import * as puppeteer from 'puppeteer';
import { pdfPage } from 'puppeteer-report';

const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const goTo = async (page: puppeteer.Page, url: string) => {
  await page.goto(url, { waitUntil: 'networkidle0' });
};

type GoToReturn = ReturnType<typeof goTo>;

interface RetryOptions {
  promise: () => GoToReturn;
  retries: number;
  retryTime: number;
}

const retry = async ({ promise, retries, retryTime }: RetryOptions): GoToReturn => {
  try {
    return await promise();
  } catch (error) {
    if (retries <= 0) throw error;

    await waitFor(retryTime);

    return await retry({ promise, retries: retries - 1, retryTime });
  }
};

const killProcessTree = (pid: number) => {
  try {
    // On Unix-like systems, kill the entire process group
    process.kill(-pid, 'SIGTERM');
    
    // Wait a bit and force kill if needed
    setTimeout(() => {
      try {
        process.kill(-pid, 'SIGKILL');
      } catch {
        // Process already terminated
      }
    }, 1000);
  } catch (error) {
    console.error('Error killing process:', error);
  }
};

const main = async () => {
  let childProcess: ReturnType<typeof spawn> | null = null;
  let browser: puppeteer.Browser | null = null;

  try {
    // Spawn dev server in detached mode with its own process group
    childProcess = spawn('npm', ['run', 'dev'], {
      detached: true,
      stdio: 'ignore',
      shell: true
    });

    // Unref to allow parent to exit independently
    childProcess.unref();

    console.log('Starting dev server...');
    await waitFor(3000); // Give dev server time to start

    browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();

    await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 });

    console.log('Navigating to PDF page...');
    await retry({
      promise: () => goTo(page, 'http://localhost:3000/pdf'),
      retries: 5,
      retryTime: 1000,
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

    // Kill the dev server process tree
    if (childProcess.pid) {
      console.log('Stopping dev server...');
      killProcessTree(childProcess.pid);
    }

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Cleanup on error
    if (browser) {
      await browser.close().catch(() => {});
    }
    
    if (childProcess?.pid) {
      killProcessTree(childProcess.pid);
    }
    
    process.exit(1);
  }
};

main();
