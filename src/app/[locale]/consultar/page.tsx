'use client';

import { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  Lock,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { api, ApiError } from '@/lib/api';
import type { TrackingResult, CaseStatus } from '@/types';

const statusIcons: Record<CaseStatus, typeof ShieldCheck> = {
  draft: FileText,
  submitted: Clock,
  under_review: Search,
  info_requested: AlertTriangle,
  verified: CheckCircle2,
  rejected: XCircle,
};

const statusStyles: Record<CaseStatus, string> = {
  draft: 'border-muted bg-muted/30 text-muted-foreground',
  submitted: 'border-info/30 bg-info/5 text-info',
  under_review: 'border-warning/30 bg-warning/5 text-warning',
  info_requested: 'border-warning/30 bg-warning/5 text-warning',
  verified: 'border-success/30 bg-success/5 text-success',
  rejected: 'border-destructive/30 bg-destructive/5 text-destructive',
};

export default function ConsultarPage() {
  const t = useTranslations('Consultar');
  const locale = useLocale();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.get<TrackingResult>(`/cases/track/${trimmed}`);
      setResult(response.data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError(t('notFoundError'));
      } else {
        setError(t('genericError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = result ? statusIcons[result.status] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mx-auto max-w-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Search className="h-7 w-7 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="card-shadow rounded-lg border border-border bg-card p-6">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t('trackingCodeLabel')}
                </label>
                <div className="flex gap-3">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={t('placeholder')}
                    className="font-mono uppercase"
                  />
                  <Button
                    type="submit"
                    disabled={!code.trim() || isLoading}
                    className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isLoading ? t('searching') : t('search')}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t('codeHelp')}
                </p>
              </div>
            </form>

            {/* Error state */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
                <XCircle className="mx-auto mb-3 h-10 w-10 text-destructive/60" />
                <p className="text-sm text-foreground">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className={`rounded-lg border p-6 ${statusStyles[result.status]}`}>
                <div className="text-center">
                  {StatusIcon && <StatusIcon className="mx-auto mb-3 h-12 w-12" />}
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-70">
                    {t('currentStatus')}
                  </p>
                  <h2 className="font-display text-2xl font-bold">{result.statusLabel}</h2>
                  <p className="mt-1 font-mono text-sm opacity-70">{result.trackingCode}</p>
                </div>

                {result.message && (
                  <div className="mt-6 rounded-md bg-background/80 p-4">
                    <p className="text-sm leading-relaxed text-foreground">{result.message}</p>
                  </div>
                )}

                <div className="mt-6 border-t border-current/10 pt-4 text-center">
                  <p className="text-xs opacity-60">
                    {t('lastUpdated', {
                      date: new Date(result.lastUpdated).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Info section */}
            {!result && !error && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t('possibleStatuses')}
                </h3>
                <div className="space-y-2">
                  {([
                    { status: 'submitted' as CaseStatus, label: t('submittedLabel'), desc: t('submittedDesc') },
                    { status: 'under_review' as CaseStatus, label: t('underReviewLabel'), desc: t('underReviewDesc') },
                    { status: 'info_requested' as CaseStatus, label: t('infoRequestedLabel'), desc: t('infoRequestedDesc') },
                    { status: 'verified' as CaseStatus, label: t('verifiedLabel'), desc: t('verifiedDesc') },
                    { status: 'rejected' as CaseStatus, label: t('rejectedLabel'), desc: t('rejectedDesc') },
                  ]).map((item) => {
                    const Icon = statusIcons[item.status];
                    return (
                      <div
                        key={item.status}
                        className="flex items-start gap-3 rounded-md bg-secondary/50 p-3"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  {t('privacyNote')}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
