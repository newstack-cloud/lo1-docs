import Ecosystem from '@/components/ecosystem';
import Features from '@/components/features';
import GetStarted from '@/components/get-started';
import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';
import Showcase from '@/components/showcase';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col text-center">
      <Hero />
      <Showcase />
      <Features />
      <HowItWorks />
      <Ecosystem />
      <GetStarted />
    </main>
  );
}
