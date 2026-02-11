'use client';

import { Shield, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function SiteFooter() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-display text-lg font-semibold">{t('brandName')}</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              {t('navigation')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/explorar"
                  className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {t('exploreCases')}
                </Link>
              </li>
              <li>
                <Link
                  href="/denunciar"
                  className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {t('registerReport')}
                </Link>
              </li>
              <li>
                <Link
                  href="/consultar"
                  className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {t('trackStatus')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {t('aboutUs')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              {t('protection')}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>{t('encryptedData')}</li>
              <li>{t('anonymizationAvailable')}</li>
              <li>{t('noThirdPartyTracking')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/40 sm:flex-row">
          <span>{t('copyright')}</span>
          <span className="flex items-center gap-1">
            {t('madeWith')} <Heart className="h-3 w-3 text-accent" /> {t('forFreedom')}
          </span>
        </div>
      </div>
    </footer>
  );
}
