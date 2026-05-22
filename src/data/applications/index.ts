/**
 * Application Loader
 *
 * Auto-discovers all application files in src/data/applications/
 * and provides them as a collection.
 */
import type { Application } from './schema';

// Use Vite's import.meta.glob to auto-discover all application files
const rawModules = import.meta.glob<Application>('./*.ts', {
  eager: false,
});

// Filter out non-application files
const EXCLUDE = ['./schema.ts', './index.ts'];

async function loadApplication(loader: () => Promise<Application>): Promise<Application> {
  return loader();
}

/**
 * Get all applications (sorted by dateFound, newest first)
 */
export async function getAllApplications(): Promise<Application[]> {
  const apps: Application[] = [];

  for (const [path, loader] of Object.entries(rawModules)) {
    if (EXCLUDE.some((e) => path.startsWith(e))) continue;
    try {
      const mod = await (loader as () => Promise<{ default: Application }>)();
      if (mod.default) {
        apps.push(mod.default);
      }
    } catch (err) {
      console.warn(`Failed to load application from ${path}:`, err);
    }
  }

  // Sort newest first
  apps.sort((a, b) =>
    new Date(b.source.dateFound).getTime() - new Date(a.source.dateFound).getTime()
  );

  return apps;
}

/**
 * Get a single application by slug
 */
export async function getApplication(slug: string): Promise<Application | null> {
  const apps = await getAllApplications();
  return apps.find((a) => a.slug === slug) ?? null;
}

/**
 * Get all slugs (for static path generation)
 */
export async function getAllSlugs(): Promise<string[]> {
  const apps = await getAllApplications();
  return apps.map((a) => a.slug);
}
