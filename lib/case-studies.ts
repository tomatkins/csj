import { createClient } from '@/lib/supabase/server';

/**
 * Case studies as proof of the consulting work — not an app store.
 * Field shape matches hsp-platform `caseStudy` (title, summary, stack, outcome, relatedApp).
 * Prefer CMS `content_entries` (site=csj, collection=caseStudy) when present;
 * otherwise the featured list below. No new CMS.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  outcome?: string;
  relatedApp?: string;
  order: number;
};

export const HSP_SITE = 'https://highstrungpro.com';

export function relatedAppHref(relatedApp: string) {
  return `${HSP_SITE}/apps/${relatedApp}`;
}

export const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'curator',
    title: 'Curator',
    summary:
      'Catalogs and working files pile up faster than folders can keep them. Curator drops the folder-first habit and lets AI manage the archive so the work stays findable.',
    stack: ['Python', 'AI file management'],
    outcome: 'A working model for AI-managed archives instead of nested folders.',
    relatedApp: 'curator',
    order: 1,
  },
  {
    slug: 'iguitar-journal',
    title: 'iGuitar Journal',
    summary:
      'Players need a private practice record, not another social feed. iGuitar Journal is a musician-first log of what was played, learned, and what comes next.',
    stack: ['TypeScript', 'Swift', 'Apple platforms'],
    outcome: 'A practice journal that lives with the player, on web and Apple devices.',
    relatedApp: 'iguitar-journal',
    order: 2,
  },
  {
    slug: 'rheander',
    title: 'Rheander',
    summary:
      'Formerly Mind Streaming. Voice-first capture and reflection for ideas that should not leave the device — built for Apple platforms with on-device AI.',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'on-device LLM'],
    outcome: 'Privacy-minded idea capture without a cloud-first compromise.',
    relatedApp: 'rheander',
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
    order: asNumber(data.order, index),
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('content_entries')
      .select('slug, data')
      .eq('site', 'csj')
      .eq('collection', 'caseStudy');

    if (error || !data?.length) return FEATURED_CASE_STUDIES;

    const mapped = (data as ContentRow[])
      .map((row, index) => fromCmsRow(row, index))
      .filter((entry): entry is CaseStudy => Boolean(entry))
      .sort((a, b) => a.order - b.order);

    return mapped.length ? mapped : FEATURED_CASE_STUDIES;
  } catch {
    return FEATURED_CASE_STUDIES;
  }
}
