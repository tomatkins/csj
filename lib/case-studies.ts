import { createClient } from '@/lib/supabase/server';

/**
 * Featured work on the public CSJ homepage.
 *
 * Shape matches hsp-platform `caseStudy` (title, summary, stack, outcome, relatedApp).
 *
 * TODO(CMS): CSJ does not yet ship a content_entries loader like highstrungpro.
 * loadCaseStudies() prefers published CMS rows (site=csj, collection=caseStudy)
 * when the shared Supabase table is present and populated; otherwise this
 * static list. Do not build a new CMS here — replace STATIC_CASE_STUDIES as
 * entries land so breakdowns can update as each project progresses.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  outcome?: string;
  relatedApp?: string;
  href?: string;
  order: number;
};

export const STATIC_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'curator',
    title: 'Curator',
    summary:
      'One of the tools Cloudsurfing Jupiter installs for people. Breakdowns will land here as the project progresses.',
    stack: [],
    outcome: 'In progress',
    relatedApp: 'curator',
    order: 1,
  },
  {
    slug: 'iguitar-journal',
    title: 'iGuitar Journal',
    summary:
      'The practice journal with Eddie, your AI guitar coach — a musician-facing case study, not a catalog listing.',
    stack: [],
    relatedApp: 'iguitar-journal',
    href: 'https://iguitarjournal.com',
    order: 2,
  },
  {
    slug: 'rheander',
    title: 'Rheander',
    summary:
      'Formerly Mind Streaming. Speak your mind. Keep your mind. Voice notes that become searchable transcripts and real to-dos — all on device.',
    stack: [],
    outcome: 'Released',
    relatedApp: 'rheander',
    href: 'https://highstrungpro.com/rheander/',
    order: 3,
  },
];

function mapEntry(slug: string, data: Record<string, unknown>): CaseStudy | null {
  const title = typeof data.title === 'string' ? data.title : null;
  const summary = typeof data.summary === 'string' ? data.summary : null;
  if (!title || !summary) return null;

  const stack = Array.isArray(data.stack) ? data.stack.map(String) : [];
  const outcome = typeof data.outcome === 'string' && data.outcome ? data.outcome : undefined;
  const relatedApp = typeof data.relatedApp === 'string' && data.relatedApp ? data.relatedApp : undefined;
  const href = typeof data.href === 'string' && data.href ? data.href : undefined;
  const order = typeof data.order === 'number' ? data.order : 0;

  return { slug, title, summary, stack, outcome, relatedApp, href, order };
}

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('content_entries')
      .select('slug, data')
      .eq('site', 'csj')
      .eq('collection', 'caseStudy');

    if (error || !data?.length) return STATIC_CASE_STUDIES;

    const mapped = data
      .map((row) => {
        const slug = typeof row.slug === 'string' ? row.slug : '';
        const payload = (row.data ?? {}) as Record<string, unknown>;
        return mapEntry(slug, payload);
      })
      .filter((item): item is CaseStudy => item !== null)
      .sort((a, b) => a.order - b.order);

    return mapped.length ? mapped : STATIC_CASE_STUDIES;
  } catch {
    return STATIC_CASE_STUDIES;
  }
}
