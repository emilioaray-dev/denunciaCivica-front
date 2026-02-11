import { FileText, ShieldCheck, Users, Eye } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function StatsBar() {
  const t = await getTranslations('StatsBar');

  const stats = [
    { icon: FileText, label: t('documentedCases'), value: '47' },
    { icon: ShieldCheck, label: t('verifiedCases'), value: '32' },
    { icon: Users, label: t('registeredSupports'), value: '4,218' },
    { icon: Eye, label: t('activeCommunicators'), value: '12' },
  ];

  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
              <div className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
