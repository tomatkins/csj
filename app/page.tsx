import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';
import { getCaseStudies } from '@/lib/case-studies';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
  },
};

export default async function HomePageRoute() {
  const caseStudies = await getCaseStudies();
  return <HomePage caseStudies={caseStudies} />;
}
