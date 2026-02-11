import { Shield, Users, Eye, Scale, Lock, Heart } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default async function SobrePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Sobre');

  const processSteps = [
    { step: '1', title: t('processStep1Title'), desc: t('processStep1Desc') },
    { step: '2', title: t('processStep2Title'), desc: t('processStep2Desc') },
    { step: '3', title: t('processStep3Title'), desc: t('processStep3Desc') },
    { step: '4', title: t('processStep4Title'), desc: t('processStep4Desc') },
  ];

  const securityItems = [
    { icon: Shield, title: t('securityEncryptionTitle'), desc: t('securityEncryptionDesc') },
    { icon: Eye, title: t('securityAnonymizationTitle'), desc: t('securityAnonymizationDesc') },
    { icon: Users, title: t('securityNoTrackingTitle'), desc: t('securityNoTrackingDesc') },
    { icon: Scale, title: t('securityTransparencyTitle'), desc: t('securityTransparencyDesc') },
  ];

  const roles = [
    { role: t('roleReporter'), desc: t('roleReporterDesc') },
    { role: t('roleModerator'), desc: t('roleModeratorDesc') },
    { role: t('roleCommunicator'), desc: t('roleCommunicatorDesc') },
    { role: t('rolePublicUser'), desc: t('rolePublicUserDesc') },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient">
          <div className="container py-16 text-center md:py-24">
            <h1 className="font-display mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-2xl leading-relaxed text-primary-foreground/70">
              {t('subtitle')}
            </p>
          </div>
        </section>

        <section className="container max-w-3xl py-16">
          <div className="space-y-12">
            {/* Mission */}
            <div>
              <h2 className="font-display mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Heart className="h-6 w-6 text-accent" />
                {t('missionTitle')}
              </h2>
              <p className="leading-relaxed text-foreground/80">
                {t('missionText')}
              </p>
            </div>

            {/* Process */}
            <div>
              <h2 className="font-display mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Scale className="h-6 w-6 text-accent" />
                {t('processTitle')}
              </h2>
              <div className="grid gap-4">
                {processSteps.map((item) => (
                  <div
                    key={item.step}
                    className="card-shadow flex gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{item.title}</h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div>
              <h2 className="font-display mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Lock className="h-6 w-6 text-accent" />
                {t('securityTitle')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {securityItems.map((item) => (
                  <div
                    key={item.title}
                    className="card-shadow rounded-lg border border-border bg-card p-4"
                  >
                    <item.icon className="mb-2 h-5 w-5 text-accent" />
                    <h4 className="text-sm font-semibold text-card-foreground">{item.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div>
              <h2 className="font-display mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Users className="h-6 w-6 text-accent" />
                {t('rolesTitle')}
              </h2>
              <div className="space-y-3">
                {roles.map((item) => (
                  <div key={item.role} className="flex gap-3 rounded-lg bg-secondary p-3">
                    <span className="min-w-[120px] text-sm font-semibold text-foreground">
                      {item.role}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
