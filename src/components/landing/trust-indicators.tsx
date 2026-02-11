import { Lock, Eye, ShieldCheck, UserCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function TrustIndicators() {
  const t = await getTranslations('TrustIndicators');

  const items = [
    { icon: Lock, title: t('encryptedTitle'), desc: t('encryptedDesc') },
    { icon: Eye, title: t('anonymizationTitle'), desc: t('anonymizationDesc') },
    { icon: ShieldCheck, title: t('verificationTitle'), desc: t('verificationDesc') },
    { icon: UserCheck, title: t('noTrackingTitle'), desc: t('noTrackingDesc') },
  ];

  return (
    <section className="container py-16">
      <div className="mb-10 text-center">
        <h2 className="font-display mb-2 text-2xl font-bold text-foreground md:text-3xl">
          {t('title')}
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="card-shadow rounded-lg border border-border bg-card p-6 text-center"
          >
            <item.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
            <h3 className="mb-1 font-semibold text-card-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
