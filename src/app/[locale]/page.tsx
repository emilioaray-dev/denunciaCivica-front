import { ArrowRight, Shield } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StatsBar } from '@/components/landing/stats-bar';
import { TrustIndicators } from '@/components/landing/trust-indicators';
import { CaseCard } from '@/components/cases/case-card';
import { MOCK_CASES } from '@/lib/mock-data';
import { Link } from '@/i18n/navigation';

const featuredCases = MOCK_CASES.filter((c) => c.status === 'verified').slice(0, 3);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="container relative py-24 text-center md:py-36">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <Shield className="h-3.5 w-3.5" />
            {t('heroBadge')}
          </div>
          <h1 className="font-display mx-auto mb-4 max-w-3xl text-4xl font-bold leading-tight text-primary-foreground text-balance md:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/denunciar">
              <Button
                size="lg"
                className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90"
              >
                {t('heroCtaPrimary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/explorar">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 font-medium text-primary-foreground hover:bg-primary-foreground/10"
              >
                {t('heroCtaSecondary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Featured cases */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {t('featuredTitle')}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {t('featuredSubtitle')}
            </p>
          </div>
          <Link
            href="/explorar"
            className="hidden text-sm font-medium text-accent hover:underline md:inline-flex"
          >
            {t('viewAll')} &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((caso) => (
            <CaseCard key={caso.id} caso={caso} />
          ))}
        </div>
        <div className="mt-6 text-center md:hidden">
          <Link href="/explorar" className="text-sm font-medium text-accent hover:underline">
            {t('viewAllCases')} &rarr;
          </Link>
        </div>
      </section>

      <TrustIndicators />

      {/* CTA */}
      <section className="hero-gradient">
        <div className="container py-16 text-center">
          <h2 className="font-display mb-3 text-2xl font-bold text-primary-foreground md:text-3xl">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-primary-foreground/70">
            {t('ctaSubtitle')}
          </p>
          <Link href="/denunciar">
            <Button
              size="lg"
              className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90"
            >
              {t('ctaButton')}
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
