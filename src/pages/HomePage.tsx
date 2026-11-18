import { CareTipsTeaserSection } from '../components/sections/CareTipsTeaserSection';
import { CtaBand } from '../components/sections/CtaBand';
import { DetailingBenefitsSection } from '../components/sections/DetailingBenefitsSection';
import { DullToDazzlingSection } from '../components/sections/DullToDazzlingSection';
import { FaqTeaserSection } from '../components/sections/FaqTeaserSection';
import { GalleryStripSection } from '../components/sections/GalleryStripSection';
import { HeroSection } from '../components/sections/HeroSection';
import { InMotionSection } from '../components/sections/InMotionSection';
import { IntroStatementSection } from '../components/sections/IntroStatementSection';
import { MarqueeStrip } from '../components/sections/MarqueeStrip';
import { ParallaxTypeInterlude } from '../components/sections/ParallaxTypeInterlude';
import { ServicesShowcaseSection } from '../components/sections/ServicesShowcaseSection';
import { ShineStandardSection } from '../components/sections/ShineStandardSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { VehiclesSection } from '../components/sections/VehiclesSection';
import { WhyExquisiteSection } from '../components/sections/WhyExquisiteSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <IntroStatementSection />
      <DullToDazzlingSection />
      <ServicesShowcaseSection />
      <ParallaxTypeInterlude topWord="EXTERIOR" bottomWord="PRECISION" />
      <WhyExquisiteSection />
      <ShineStandardSection />
      <VehiclesSection />
      <DetailingBenefitsSection />
      <ParallaxTypeInterlude topWord="POLISH" bottomWord="PROTECT" />
      <InMotionSection />
      <TestimonialsSection />
      <GalleryStripSection />
      <CareTipsTeaserSection />
      <FaqTeaserSection />
      <CtaBand />
    </>
  );
}
