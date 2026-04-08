import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen relative">
        {/* Spacer for transparent header */}
        <div className="h-20" />
        {children}
      </main>
      <Footer />
    </>
  );
}
