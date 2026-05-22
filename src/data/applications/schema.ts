/**
 * Job Application Data Schema
 *
 * Each file in src/data/applications/ exports a single Application object.
 * The filename becomes the URL slug.
 *
 * Usage: src/data/applications/{slug}.ts
 * URLs:  /resume/{slug}  and  /cover-letter/{slug}
 */

export type ApplicationStatus = 'draft' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobRequirement {
  skill: string;
  importance: 'required' | 'preferred' | 'bonus';
}

export interface Application {
  /** Unique slug — must match filename (kebab-case) */
  slug: string;

  /** Company details */
  company: {
    name: string;
    website?: string;
    logo?: string;
    location: string;
    industry: string;
  };

  /** Position details */
  position: {
    title: string;
    department?: string;
    type: 'full-time' | 'part-time' | 'contract' | 'freelance';
    remote: boolean;
    salaryRange?: string;
  };

  /** Source of the job posting */
  source: {
    url?: string;
    platform?: string;
    dateFound: string;
  };

  /** Application tracking */
  application: {
    status: ApplicationStatus;
    dateApplied?: string;
    notes?: string;
  };

  /** Job description highlights */
  jobDescription: {
    summary: string;
    responsibilities: string[];
    requirements: JobRequirement[];
    niceToHave: string[];
  };

  /** Resume tailoring instructions */
  tailoring: {
    /** Which skills to emphasize (ordered by priority) */
    emphasizeSkills: string[];
    /** Which projects to highlight */
    highlightProjects: string[];
    /** Custom professional summary targeting this role */
    customSummary: string;
    /** Key achievements to call out */
    keyAchievements: string[];
    /** Cover letter hook — why this company/role excites you */
    coverLetterHook: string;
  };

  /** Contact person (if known) */
  contact?: {
    name?: string;
    title?: string;
    email?: string;
    linkedIn?: string;
  };
}
