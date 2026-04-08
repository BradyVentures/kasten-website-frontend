import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import VisualizerTeaser from '@/components/home/VisualizerTeaser';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <VisualizerTeaser />
        <WhyChooseUs />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
