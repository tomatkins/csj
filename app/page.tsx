import { HomePage } from '@/components/home-page';
import { getCaseStudies } from '@/lib/case-studies';

export default async function HomePageRoute() {
  const caseStudies = await getCaseStudies();
  return <HomePage caseStudies={caseStudies} />;
}
