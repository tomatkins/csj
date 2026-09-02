import { createClient } from '@/lib/supabase/server';

/**
 * Case studies as proof of the consulting work — not an app store / featured-apps catalog.
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

export const HSP_SITE = 'https://highstrungpro.com';

export function studyHref(study: CaseStudy): string | undefined {
  if (study.href) return study.href;
  return undefined;
}

export const STATIC_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'curator',
    title: 'Curator',
    summary:
      'Catalogs and working files pile up faster than folders can keep them. Curator is how we put AI in the archive so music ops can find the work — evidence of catalog consulting, not a store listing.',
    stack: ['Catalog ops', 'AI file management'],
    outcome: 'In progress',
    relatedApp: 'curator',
    order: 1,
  },
  {
    slug: 'iguitar-journal',
    title: 'iGuitar Journal',
    summary:
      'A private practice record for guitarists, with Eddie as AI coach. Proof of musician-facing consulting: intelligence that sits in the journal, not another social feed.',
    stack: ['Musician AI', 'Practice coaching'],
    outcome: 'Practice journal with the player',
    relatedApp: 'iguitar-journal',
    href: 'https://iguitarjournal.com',
    order: 2,
  },
  {
    slug: 'rheander',
    title: 'Rheander',
    summary:
      'Formerly Mind Streaming. Speak your mind. Keep your mind. On-device voice notes become searchable transcripts and real to-dos — proof we treat artist data with care.',
    stack: ['On-device AI', 'Voice workflow'],
    outcome: 'Released',
    relatedApp: 'rheander',
    href: 'https://highstrungpro.com/rheander/',
    order: 3,
  },
];

type ContentRow = {
  slug: string;
  data: {
    title?: unknown;
    summary?: unknown;
    stack?: unknown;
    outcome?: unknown;
    relatedApp?: unknown;
    href?: unknown;
    order?: unknown;
    draft?: unknown;
  } | null;
};

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function fromCmsRow(row: ContentRow, index: number): CaseStudy | null {
  const data = row.data ?? {};
  if (data.draft === true) return null;
  const title = asString(data.title);
  const summary = asString(data.summary);
  if (!title || !summary) return null;
  return {
    slug: row.slug || title.toLowerCase().replace(/\s+/g, '-'),
    title,
    summary,
    stack: asStringList(data.stack),
    outcome: asString(data.outcome) || undefined,
    relatedApp: asString(data.relatedApp) || undefined,
    href: asString(data.href) || undefined,
    order: asNumber(data.order, index),
  };
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

    const mapped = (data as ContentRow[])
      .map((row, index) => fromCmsRow(row, index))
      .filter((entry): entry is CaseStudy => Boolean(entry))
      .sort((a, b) => a.order - b.order);

    return mapped.length ? mapped : STATIC_CASE_STUDIES;
  } catch {
    return STATIC_CASE_STUDIES;
  }
}
