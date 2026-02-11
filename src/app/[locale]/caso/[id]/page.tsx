'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  ArrowLeft,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Link } from '@/i18n/navigation';
import { api, ApiError } from '@/lib/api';
import { STATUS_CONFIG, CATEGORY_KEYS } from '@/lib/constants';
import type { CaseDetail, CaseTimelineEvent } from '@/types';

const timelineIcons: Record<CaseTimelineEvent['type'], typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
};

const timelineDotColors: Record<CaseTimelineEvent['type'], string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
};

const statusColorClasses: Record<string, string> = {
  success: 'bg-success/10 text-success',
  blue: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  gray: 'bg-muted text-muted-foreground',
};

export default function CaseDetailPage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('CaseDetail');
  const tStatus = useTranslations('Status');
  const tCat = useTranslations('Categories');
  const locale = useLocale();
  const [caso, setCaso] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [supported, setSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(0);

  useEffect(() => {
    async function fetchCase() {
      try {
        const response = await api.get<CaseDetail>(`/cases/${params.id}`);
        setCaso(response.data);
        setSupportCount(response.data.supportCount);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [params.id]);

  const handleSupport = async () => {
    if (supported || !caso) return;
    try {
      const response = await api.post<{ supportCount: number }>(`/cases/${caso.id}/support`);
      setSupportCount(response.data.supportCount);
      setSupported(true);
    } catch {
      setSupported(true);
      setSupportCount((c) => c + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (notFound || !caso) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="container flex-1 py-16 text-center">
          <h1 className="font-display mb-2 text-2xl font-bold text-foreground">
            {t('notFoundTitle')}
          </h1>
          <p className="mb-4 text-muted-foreground">
            {t('notFoundDesc')}
          </p>
          <Link href="/explorar">
            <Button variant="outline">{t('backToExplore')}</Button>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[caso.status];
  const categoryLabel =
    CATEGORY_KEYS.find((c) => c.value === caso.category)?.labelKey ?? 'other';

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-3xl py-10">
          {/* Back link */}
          <Link
            href="/explorar"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToCases')}
          </Link>

          {/* Status + category */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorClasses[statusConfig.color] ?? ''}`}
            >
              {caso.status === 'verified' && <ShieldCheck className="h-3 w-3" />}
              {tStatus(statusConfig.labelKey)}
            </span>
            <span className="text-xs text-muted-foreground">{tCat(categoryLabel)}</span>
          </div>

          {/* Name */}
          <h1 className="font-display mb-2 text-3xl font-bold text-foreground md:text-4xl">
            {caso.isAnonymized ? (
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-7 w-7 text-muted-foreground" />
                {caso.detaineeName}
              </span>
            ) : (
              caso.detaineeName
            )}
          </h1>

          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {t('detainedOn', {
                date: new Date(caso.detentionDate + 'T12:00:00').toLocaleDateString(locale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </span>
            {caso.detaineeAge && (
              <span className="text-muted-foreground">{t('yearsOld', { age: caso.detaineeAge })}</span>
            )}
          </div>

          {/* Locations */}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-secondary p-3">
              <p className="mb-0.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {t('residenceCity')}
              </p>
              <p className="text-sm text-foreground">{caso.residenceCity}</p>
            </div>
            <div className="rounded-md bg-secondary p-3">
              <p className="mb-0.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {t('detentionLocation')}
              </p>
              <p className="text-sm text-foreground">{caso.detentionLocation}</p>
            </div>
            {caso.detentionCenter && (
              <div className="rounded-md bg-secondary p-3">
                <p className="mb-0.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {t('detentionCenter')}
                </p>
                <p className="text-sm text-foreground">{caso.detentionCenter}</p>
              </div>
            )}
          </div>

          {/* Circumstances */}
          <div className="mb-10">
            <div className="card-shadow rounded-lg border border-border bg-card p-6">
              <h3 className="font-display mb-3 mt-0 text-lg font-semibold text-card-foreground">
                {t('caseSummary')}
              </h3>
              <p className="mb-0 whitespace-pre-line leading-relaxed text-foreground/80">
                {caso.circumstances}
              </p>
            </div>
          </div>

          {/* Timeline */}
          {caso.timeline && caso.timeline.length > 0 && (
            <div className="mb-10">
              <h3 className="font-display mb-4 text-lg font-semibold text-foreground">
                {t('timeline')}
              </h3>
              <div className="space-y-4 border-l-2 border-border pl-6">
                {caso.timeline.map((event, i) => {
                  const Icon = timelineIcons[event.type];
                  const dotColor = timelineDotColors[event.type];
                  return (
                    <div key={i} className="relative">
                      <div
                        className={`absolute -left-[1.85rem] top-1 h-3 w-3 rounded-full ${dotColor}`}
                      />
                      <div className="flex items-start gap-2">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{event.event}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString(locale, {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Support section */}
          <div className="rounded-lg border border-border bg-secondary/30 p-6 text-center">
            <h3 className="font-display mb-2 text-lg font-semibold text-foreground">
              {t('supportTitle')}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('supportDesc')}
            </p>
            <Button
              onClick={handleSupport}
              disabled={supported}
              className={
                supported
                  ? 'bg-success text-success-foreground'
                  : 'bg-accent text-accent-foreground hover:bg-accent/90'
              }
            >
              <Heart className={`mr-2 h-4 w-4 ${supported ? 'fill-current' : ''}`} />
              {supported ? t('supportRegistered') : t('supportButton')}
            </Button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {t('supportCount', { count: supportCount })}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
