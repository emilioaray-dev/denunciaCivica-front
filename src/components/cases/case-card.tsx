'use client';

import { MapPin, Calendar, Users, ShieldCheck } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { CasePublic } from '@/types';
import { STATUS_CONFIG, CATEGORY_KEYS } from '@/lib/constants';

interface CaseCardProps {
  caso: CasePublic;
}

export function CaseCard({ caso }: CaseCardProps) {
  const tStatus = useTranslations('Status');
  const tCat = useTranslations('Categories');
  const tCard = useTranslations('CaseCard');
  const locale = useLocale();

  const statusConfig = STATUS_CONFIG[caso.status];
  const categoryLabelKey =
    CATEGORY_KEYS.find((c) => c.value === caso.category)?.labelKey ?? 'other';

  const statusColorClasses: Record<string, string> = {
    success: 'bg-success/10 text-success',
    blue: 'bg-info/10 text-info',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    gray: 'bg-muted text-muted-foreground',
  };

  return (
    <Link
      href={`/caso/${caso.id}`}
      className="card-shadow group block rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--card-shadow-hover)]"
    >
      <div className="mb-3 flex items-start justify-between">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorClasses[statusConfig.color] ?? ''}`}
        >
          {caso.status === 'verified' && <ShieldCheck className="h-3 w-3" />}
          {tStatus(statusConfig.labelKey)}
        </span>
        <span className="text-xs text-muted-foreground">{tCat(categoryLabelKey)}</span>
      </div>

      <h3 className="font-display mb-1 text-lg font-semibold text-card-foreground transition-colors group-hover:text-accent">
        {caso.isAnonymized ? (
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            {caso.detaineeName}
          </span>
        ) : (
          caso.detaineeName
        )}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {caso.summary}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {caso.detentionLocation}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(caso.detentionDate).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {tCard('supports', { count: caso.supportCount })}
        </span>
        <span className="text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          {tCard('viewDetail')} &rarr;
        </span>
      </div>
    </Link>
  );
}
